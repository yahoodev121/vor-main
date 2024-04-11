import { useDispatch, useSelector } from 'react-redux';
import authActions from 'src/modules/auth/authActions';
import authSelectors from 'src/modules/auth/authSelectors';
import ReactDom from 'react-dom';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import MDButton from 'src/mui/components/MDButton';
import { useEffect, useState } from 'react';
import { IIdleTimer, useIdleTimer } from 'react-idle-timer';
import { AuthToken } from 'src/modules/auth/authToken';

function SessionTimeout() {
  const dispatch = useDispatch();

  const loggedIn = useSelector(
    authSelectors.selectCurrentUser,
  );

  const timeout = 60 * 20; // 20 minutes;
  const promptBeforeIdle = 60 * 2; // 2 minutes;
  const [remaining, setRemaining] =
    useState<number>(timeout);

  const onIdle = () => {
    dispatch(authActions.doSignout());
  };

  const onActive = () => {
    dispatch(authActions.doPromptKeepAlive(false));
    dispatch(authActions.doKeepAlive());
  };

  const onAction = (evt, idleTimer: IIdleTimer) => {
    if (!idleTimer.isPrompted()) {
      dispatch(authActions.doPromptKeepAlive(false));
      dispatch(authActions.doKeepAlive());
    }
  };

  const onPrompt = () => {
    dispatch(authActions.doPromptKeepAlive(true));
  };

  const { getRemainingTime, reset } = useIdleTimer({
    disabled: !loggedIn,
    events: [],
    onAction,
    onActive,
    onIdle,
    onPrompt,
    promptBeforeIdle: promptBeforeIdle * 1_000,
    timeout: timeout * 1_000,
  });

  AuthToken.setResetIdleTimer(reset);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(Math.ceil(getRemainingTime() / 1000));
    }, 500);

    return () => {
      clearInterval(interval);
    };
  });

  const promptKeepAlive = useSelector(
    authSelectors.selectPromptKeepAlive,
  );

  const { sidenavColor } = selectMuiSettings();

  const doKeepAlive = () => {
    onActive();
  };

  const doLogout = () => {
    onIdle();
  };

  return (
    promptKeepAlive &&
    ReactDom.createPortal(
      <Dialog
        fullWidth={true}
        // onClose={doClose}
        open={true}
      >
        <MDBox topBorder>
          <DialogTitle>
            <MDTypography>
              {i18n('auth.promptKeepAliveTitle', remaining)}
            </MDTypography>
          </DialogTitle>
          <DialogContent>
            {i18n('auth.promptKeepAlive')}
          </DialogContent>
          <DialogActions>
            <MDButton
              variant="outlined"
              onClick={doLogout}
              color={sidenavColor}
              size="small"
            >
              {i18n('auth.signout')}
            </MDButton>
            <MDButton
              variant="gradient"
              onClick={doKeepAlive}
              color={sidenavColor}
              size="small"
              autoFocus
            >
              {i18n('auth.continueWorking')}
            </MDButton>
          </DialogActions>
        </MDBox>
      </Dialog>,
      (document as any).getElementById('modal-root'),
    )
  );
}

export default SessionTimeout;

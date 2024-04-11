import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useDispatch, useSelector } from 'react-redux';
import authActions from 'src/modules/auth/authActions';
import authSelectors from 'src/modules/auth/authSelectors';
import MDSnackbar from 'src/mui/components/MDSnackbar';

const ImpersonateNotification = () => {
  const dispatch = useDispatch();

  const { sidenavColor } = selectMuiSettings();

  const impersonatedUsers = useSelector(
    authSelectors.selectImpersonatedUsers,
  );

  const doRevert = () => {
    dispatch(authActions.doCancelImpersonate());
  };

  return (
    <MDSnackbar
      color={sidenavColor}
      icon="notifications"
      title={i18n('user.impersonate.title')}
      content={i18n('user.impersonate.notification')}
      dateTime=""
      open={
        !!impersonatedUsers && !!impersonatedUsers.length
      }
      close={doRevert}
    />
  );
};

export default ImpersonateNotification;

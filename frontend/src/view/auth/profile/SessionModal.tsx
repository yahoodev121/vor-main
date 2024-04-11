import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Icon,
  IconButton,
  List,
  ListItem,
} from '@mui/material';
import { DEFAULT_MOMENT_FORMAT } from 'src/config/common';
import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import authSelectors from 'src/modules/auth/authSelectors';
import CloseIcon from '@mui/icons-material/Close';
import ColorBadge from 'src/view/shared/components/ColorBadge';
import MDBox from 'src/mui/components/MDBox';
import MDButton from 'src/mui/components/MDButton';
import MDTypography from 'src/mui/components/MDTypography';
import moment from 'moment';
import ReactDOM from 'react-dom';
import sessionDeviceEnumerators from 'src/modules/sessionDevice/sessionDeviceEnumerators';
import sessionDeviceViewActions from 'src/modules/sessionDevice/view/sessionDeviceViewActions';
import sessionDeviceViewSelectors from 'src/modules/sessionDevice/view/sessionDeviceViewSelectors';
import Spinner from 'src/view/shared/Spinner';
import UserListItem from 'src/view/user/list/UserListItem';

const DetailItem = ({ label, value }) => (
  <MDBox display="flex" alignItems="center" lineHeight={1}>
    <MDTypography
      variant="body2"
      fontWeight="regular"
      color="text"
    >
      {label}:
    </MDTypography>
    <MDBox fontWeight="bold" color="text" px={0.8}>
      {value}
    </MDBox>
  </MDBox>
);

const DeviceInfo = ({ record }) => (
  <MDBox>
    <MDTypography
      variant="body2"
      fontWeight="bold"
      pb={1.6}
    >
      Device Info
    </MDTypography>
    <DetailItem
      label="User"
      value={<UserListItem value={record.user} />}
    />
    <Divider />
    <DetailItem
      label="Status"
      value={
        record.id === record.active ? (
          <ColorBadge color="success" label="active" />
        ) : (
          ''
        )
      }
    />
    <Divider />
    <DetailItem
      label="Device"
      value={
        <Icon>
          {sessionDeviceEnumerators.deviceTypes[
            record.device.type
          ] ?? 'devices_other'}
        </Icon>
      }
    />
    <Divider />
    <DetailItem label="Client IP" value={record.ip} />
    <Divider />
    <DetailItem
      label="Browser"
      value={[
        record.client.name,
        record.client.version,
      ].join(' ')}
    />
    <Divider />
    <DetailItem
      label="OS"
      value={[
        record.os.name,
        record.os.version,
        record.os.platform,
      ].join(' ')}
    />
  </MDBox>
);

const SessionList = ({ record }) => {
  const currentUser = useSelector(
    authSelectors.selectCurrentUser,
  );
  const currentDateTime = moment(record.currentDateTime);
  record.sessions?.sort((a, b) =>
    a === b ? 0 : a < b ? 1 : -1,
  );
  return (
    <MDBox>
      <MDTypography
        variant="body2"
        fontWeight="bold"
        pb={1.6}
      >
        {i18n('profile.titles.sessions')}
      </MDTypography>
      <List component="div" role="list" dense>
        {record.sessions.map((session, index) => (
          <ListItem
            key={`session-date-${index}`}
            role="listitem"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              px: 1.6,
              py: 0.8,
              borderRadius: 1.6,
            }}
            button
          >
            <MDTypography
              variant="body2"
              fontWeight="regular"
              color="text"
              pr={0.8}
            >
              {moment
                .duration(
                  moment(session).diff(currentDateTime),
                )
                .humanize(true)}
            </MDTypography>
            {currentUser.lastLoginAt === session && (
              <ColorBadge color="success" label="active" />
            )}
          </ListItem>
        ))}
      </List>
    </MDBox>
  );
};

const SessionModal = (props) => {
  const { id, onClose } = props;

  const { sidenavColor } = selectMuiSettings();

  const dispatch = useDispatch();

  const loading = useSelector(
    sessionDeviceViewSelectors.selectLoading,
  );
  const record = useSelector(
    sessionDeviceViewSelectors.selectRecord,
  );

  useEffect(() => {
    dispatch(sessionDeviceViewActions.doFind(id));
  }, [dispatch, id]);

  return ReactDOM.createPortal(
    <Dialog
      open={true}
      onClose={onClose}
      maxWidth="sm"
      fullWidth={true}
    >
      <DialogTitle>
        <MDBox
          display="flex"
          justifyContent="space-between"
        >
          <MDTypography>
            {i18n('profile.titles.sessionInDetail')}
          </MDTypography>
          <IconButton
            color="secondary"
            onClick={onClose}
            size="small"
          >
            <CloseIcon />
          </IconButton>
        </MDBox>
      </DialogTitle>
      <DialogContent sx={{ padding: 0 }}>
        {loading && <Spinner />}
        {record && (
          <MDBox px={4}>
            <Grid container spacing={4}>
              <Grid lg={6} xs={12} item>
                <DeviceInfo record={record} />
              </Grid>
              <Grid lg={6} xs={12} item>
                <SessionList record={record} />
              </Grid>
            </Grid>
          </MDBox>
        )}
      </DialogContent>
      <DialogActions>
        <MDButton
          variant="outlined"
          onClick={onClose}
          color={sidenavColor}
          size="small"
        >
          {i18n('common.close')}
        </MDButton>
      </DialogActions>
    </Dialog>,
    (document as any).getElementById('modal-root'),
  );
};

export default SessionModal;

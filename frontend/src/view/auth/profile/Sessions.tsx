import { i18n } from 'src/i18n';
import { IconButton, Tooltip } from '@mui/material';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import actions from 'src/modules/sessionDevice/list/sessionDeviceListActions';
import Card from '@mui/material/Card';
import ColorBadge from 'src/view/shared/components/ColorBadge';
import Divider from '@mui/material/Divider';
import Icon from '@mui/material/Icon';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import RefreshIcon from '@mui/icons-material/Refresh';
import selectors from 'src/modules/sessionDevice/list/sessionDeviceListSelectors';
import sessionDeviceEnumerators from 'src/modules/sessionDevice/sessionDeviceEnumerators';
import SessionModal from 'src/view/auth/profile/SessionModal';
import Spinner from 'src/view/shared/Spinner';

const actionButtonStyles = {
  display: 'flex',
  alignItems: 'center',
  lineHeight: 1,
  cursor: 'pointer',

  '& .material-icons-round': {
    marginLeft: '0.4rem',
    transform: `translateX(0)`,
    transition: 'all 200ms cubic-bezier(0.34,1.61,0.7,1.3)',
  },

  '&:hover .material-icons-round, &:focus .material-icons-round':
    {
      transform: `translateX(4px)`,
    },
};

const Sessions = (props): JSX.Element => {
  const { id, user } = props;
  const { sidenavColor } = selectMuiSettings();

  const dispatch = useDispatch();

  const active = useSelector(selectors.selectActive);
  const loading = useSelector(selectors.selectLoading);
  const hasRows = useSelector(selectors.selectHasRows);
  const rows = useSelector(selectors.selectRows);

  const [detailModal, setDetailModal] = useState(null);

  const doFetch = () => dispatch(actions.doFetch(user?.id));

  useEffect(() => {
    doFetch();
  }, [dispatch]);

  return (
    <Card id={id}>
      <MDBox p={2.4} lineHeight={1} topBorder>
        <MDBox
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={0.8}
        >
          <MDTypography variant="h5">
            {i18n('profile.titles.sessions')}
          </MDTypography>
          <Tooltip
            title={i18n('common.reload')}
            disableInteractive
          >
            <span>
              <IconButton
                color={sidenavColor}
                disabled={loading}
                onClick={doFetch}
                size="small"
              >
                <RefreshIcon />
              </IconButton>
            </span>
          </Tooltip>
        </MDBox>
        <MDTypography
          variant="body2"
          color="text"
          fontWeight="regular"
        >
          {i18n('profile.hints.sessions')}
        </MDTypography>
      </MDBox>
      <MDBox pb={2.4} px={2.4} sx={{ overflow: 'auto' }}>
        {!hasRows && (
          <MDTypography align="center">
            {i18n('table.noData')}
          </MDTypography>
        )}
        {hasRows &&
          (rows ?? []).map((row, index) => (
            <MDBox key={`session-device-${index}`}>
              {!!index && <Divider />}
              <MDBox
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                width={{ xs: 'max-content', sm: '100%' }}
              >
                <MDBox
                  display="flex"
                  alignItems="center"
                  mr={1.6}
                >
                  <MDBox
                    textAlign="center"
                    color="text"
                    px={{ xs: 0, md: 1.2 }}
                    opacity={0.6}
                    lineHeight={0}
                  >
                    <Icon>
                      {sessionDeviceEnumerators.deviceTypes[
                        row.device.type
                      ] ?? 'devices_other'}
                    </Icon>
                  </MDBox>
                  <MDBox
                    height="100%"
                    ml={1.6}
                    lineHeight={1}
                    mr={1.6}
                  >
                    <MDTypography
                      display="block"
                      variant="body2"
                      fontWeight="bold"
                      color="text"
                    >
                      {[row.geoIP?.city, row.ip]
                        .filter(Boolean)
                        .join(' ')}
                    </MDTypography>
                    <MDTypography
                      variant="button"
                      fontWeight="regular"
                      color="text"
                    >
                      {active === row.id
                        ? i18n(
                            'sessionDevice.labels.current',
                          )
                        : i18n(
                            'sessionDevice.labels.browser',
                            row.client.name,
                            row.os.name,
                          )}
                    </MDTypography>
                  </MDBox>
                </MDBox>
                <MDBox display="flex" alignItems="center">
                  {active === row.id && (
                    <ColorBadge
                      color="success"
                      label="active"
                    />
                  )}
                  <MDBox mx={1.6} lineHeight={1}>
                    <MDTypography
                      variant="body2"
                      color="secondary"
                      fontWeight="regular"
                    >
                      {row.geoIP?.country}
                    </MDTypography>
                  </MDBox>
                  <MDTypography
                    color={sidenavColor}
                    fontWeight="regular"
                    onClick={() => setDetailModal(row.id)}
                    sx={actionButtonStyles}
                    variant="body2"
                  >
                    {i18n('common.seeMore')}
                    <Icon sx={{ fontWeight: 'bold' }}>
                      arrow_forward
                    </Icon>
                  </MDTypography>
                </MDBox>
              </MDBox>
            </MDBox>
          ))}
      </MDBox>
      {loading && <Spinner overlap />}
      {!!detailModal && (
        <SessionModal
          id={detailModal}
          onClose={() => setDetailModal(null)}
        />
      )}
    </Card>
  );
};

export default Sessions;

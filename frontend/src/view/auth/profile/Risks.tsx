import {
  Card,
  Grid,
  IconButton,
  Tooltip,
} from '@mui/material';
import { getUserNameOrEmailPrefix } from 'src/modules/utils';
import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import actions from 'src/modules/risk/countByUser/riskCountByUserActions';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import QueryString from 'qs';
import RefreshIcon from '@mui/icons-material/Refresh';
import selectors from 'src/modules/risk/countByUser/riskCountByUserSelectors';
import Spinner from 'src/view/shared/Spinner';
import SummaryItem from 'src/view/auth/profile/SummaryItem';

const Risks = (props) => {
  const { id, user } = props;

  const { sidenavColor } = selectMuiSettings();

  const dispatch = useDispatch();

  const loading = useSelector(selectors.selectLoading);

  const record = useSelector(selectors.selectRecord);

  const doReload = () => dispatch(actions.doFetch(user.id));

  const userParam = {
    id: user.id,
    label: getUserNameOrEmailPrefix(user),
    avatars: user.avatars,
  };

  useEffect(() => {
    doReload();
  }, []);

  return (
    <Card id={id} sx={{ overflow: 'visible' }}>
      <MDBox
        display="flex"
        justifyContent="space-between"
        p={2.4}
        pb={0}
        topBorder
      >
        <MDTypography variant="h5">
          {i18n('profile.titles.risks')}
        </MDTypography>
        <Tooltip
          title={i18n('common.reload')}
          disableInteractive
        >
          <span>
            <IconButton
              color={sidenavColor}
              disabled={loading}
              onClick={doReload}
              size="small"
            >
              <RefreshIcon />
            </IconButton>
          </span>
        </Tooltip>
      </MDBox>
      <MDBox p={2.4} pt={1.6}>
        <Grid container spacing={1.6}>
          <SummaryItem
            title="Open"
            icon="flag"
            color="success"
            count={record?.open}
            to={`/risk?${QueryString.stringify(
              {
                summary: 'open',
                owner: userParam,
              },
              { allowDots: true },
            )}`}
          />
        </Grid>
      </MDBox>
      {loading && <Spinner overlap={true} />}
    </Card>
  );
};

export default Risks;

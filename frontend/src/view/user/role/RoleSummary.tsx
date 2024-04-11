import { Card } from '@mui/material';
import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { TimelineProvider } from 'src/mui/shared/Timeline/context';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import Roles from 'src/security/roles';
import RoleSummaryItem from 'src/view/user/role/RoleSummaryItem';

const RoleSummary = (props) => {
  const { summary, doSelect } = props;
  const { darkMode, sidenavColor } = selectMuiSettings();

  return (
    <Card>
      <MDBox p={2.4} topBorder>
        <MDTypography variant="body1" fontWeight="bold">
          {i18n('role.labels.roles')}
        </MDTypography>
        <TimelineProvider value={darkMode}>
          {Object.keys(Roles.values).map(
            (role, index, { length }) => (
              <RoleSummaryItem
                key={`role-summary-item-${index}`}
                color={sidenavColor}
                count={summary[role]}
                darkMode={darkMode}
                doSelect={doSelect}
                firstItem={index === 0}
                icon={Roles.icons[role]}
                lastItem={index + 1 === length}
                role={role}
              />
            ),
          )}
        </TimelineProvider>
      </MDBox>
    </Card>
  );
};

export default RoleSummary;

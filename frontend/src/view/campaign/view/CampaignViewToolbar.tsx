import { i18n } from 'src/i18n';
import { Link } from 'react-router-dom';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useSelector } from 'react-redux';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import auditLogSelectors from 'src/modules/auditLog/auditLogSelectors';
import HistoryIcon from '@mui/icons-material/History';
import MDButton from 'src/mui/components/MDButton';
import ToolbarWrapper from 'src/view/shared/styles/ToolbarWrapper';

function CampaignViewToolbar(props) {
  const { sidenavColor } = selectMuiSettings();

  const id = props.match.params.id;

  const hasPermissionToAuditLogs = useSelector(
    auditLogSelectors.selectPermissionToRead,
  );

  return (
    <ToolbarWrapper>
      {hasPermissionToAuditLogs && (
        <MDButton
          variant="outlined"
          color={sidenavColor}
          component={Link}
          to={`/audit-logs?entityId=${encodeURIComponent(
            id,
          )}`}
          startIcon={<HistoryIcon />}
          size="small"
        >
          {i18n('auditLog.menu')}
        </MDButton>
      )}

      <MDButton
        variant="outlined"
        color={sidenavColor}
        component={Link}
        to={'/campaign'}
        startIcon={<ArrowBackIcon />}
        size="small"
      >
        {i18n('common.back')}
      </MDButton>
    </ToolbarWrapper>
  );
}

export default CampaignViewToolbar;

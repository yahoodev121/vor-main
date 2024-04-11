import { i18n } from 'src/i18n';
import { Link } from 'react-router-dom';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { Tooltip } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import actions from 'src/modules/user/list/userListActions';
import auditLogSelectors from 'src/modules/auditLog/auditLogSelectors';
import BlockIcon from '@mui/icons-material/Block';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ConfirmModal from 'src/view/shared/modals/ConfirmModal';
import DeleteIcon from '@mui/icons-material/Delete';
import DescriptionIcon from '@mui/icons-material/Description';
import EmailIcon from '@mui/icons-material/Email';
import HistoryIcon from '@mui/icons-material/History';
import MDButton from 'src/mui/components/MDButton';
import selectors from 'src/modules/user/list/userListSelectors';
import ToolbarWrapper from 'src/view/shared/styles/ToolbarWrapper';
import userSelectors from 'src/modules/user/userSelectors';
import VerifiedIcon from '@mui/icons-material/Verified';

function UserToolbar(props) {
  const dispatch = useDispatch();
  const { sidenavColor } = selectMuiSettings();
  const [
    activateAllConfirmVisible,
    setActivateAllConfirmVisible,
  ] = useState(false);
  const [
    deactivateAllConfirmVisible,
    setDeactivateAllConfirmVisible,
  ] = useState(false);
  const [
    destroyAllConfirmVisible,
    setDestroyAllConfirmVisible,
  ] = useState(false);

  const hasPermissionToAuditLogs = useSelector(
    auditLogSelectors.selectPermissionToRead,
  );
  const hasPermissionToCreate = useSelector(
    userSelectors.selectPermissionToCreate,
  );
  const hasPermissionToImport = useSelector(
    userSelectors.selectPermissionToImport,
  );
  const hasPermissionToDestroy = useSelector(
    userSelectors.selectPermissionToDestroy,
  );

  const hasRows = useSelector(selectors.selectHasRows);
  const exportLoading = useSelector(
    selectors.selectExportLoading,
  );
  const loading = useSelector(selectors.selectLoading);
  const selectedKeys = useSelector(
    selectors.selectSelectedKeys,
  );

  const doOpenActivateAllConfirmModal = () =>
    setActivateAllConfirmVisible(true);

  const doCloseActivateAllConfirmModal = () =>
    setActivateAllConfirmVisible(false);

  const doOpenDeactivateAllConfirmModal = () =>
    setDeactivateAllConfirmVisible(true);

  const doCloseDeactivateAllConfirmModal = () =>
    setDeactivateAllConfirmVisible(false);

  const doOpenDestroyAllConfirmModal = () =>
    setDestroyAllConfirmVisible(true);

  const doCloseDestroyAllConfirmModal = () =>
    setDestroyAllConfirmVisible(false);

  const doExport = () => dispatch(actions.doExport());

  const doActivateAllSelected = () => {
    doCloseActivateAllConfirmModal();

    dispatch(actions.doActivateAllSelected());
  };

  const doDeactivateAllSelected = () => {
    doCloseDeactivateAllConfirmModal();

    dispatch(actions.doDeactivateAllSelected());
  };

  const doDestroyAllSelected = () => {
    doCloseDestroyAllConfirmModal();

    dispatch(actions.doDestroyAllSelected());
  };

  const renderExportButton = () => {
    const disabledWithTooltip = !hasRows || loading;

    const button = (
      <MDButton
        variant="outlined"
        color={sidenavColor}
        type="button"
        disabled={disabledWithTooltip || exportLoading}
        onClick={doExport}
        startIcon={<DescriptionIcon />}
        size="small"
      >
        {i18n('common.export')}
      </MDButton>
    );

    if (!disabledWithTooltip) {
      return button;
    }

    return (
      <Tooltip
        disableInteractive
        title={i18n('common.noDataToExport')}
      >
        <span>{button}</span>
      </Tooltip>
    );
  };

  const renderActivateButton = () => {
    if (!hasPermissionToDestroy) {
      return null;
    }

    const disabled = !selectedKeys.length || loading;

    const button = (
      <MDButton
        variant="contained"
        color={sidenavColor}
        type="button"
        disabled={disabled}
        onClick={doOpenActivateAllConfirmModal}
        startIcon={<VerifiedIcon />}
        size="small"
      >
        {i18n('common.activate')}
      </MDButton>
    );

    if (disabled) {
      return (
        <Tooltip
          disableInteractive
          title={i18n('common.mustSelectARow')}
        >
          <span>{button}</span>
        </Tooltip>
      );
    }

    return button;
  };

  const renderDeactivateButton = () => {
    if (!hasPermissionToDestroy) {
      return null;
    }

    const disabled = !selectedKeys.length || loading;

    const button = (
      <MDButton
        variant="contained"
        color={sidenavColor}
        type="button"
        disabled={disabled}
        onClick={doOpenDeactivateAllConfirmModal}
        startIcon={<BlockIcon />}
        size="small"
      >
        {i18n('common.deactivate')}
      </MDButton>
    );

    if (disabled) {
      return (
        <Tooltip
          disableInteractive
          title={i18n('common.mustSelectARow')}
        >
          <span>{button}</span>
        </Tooltip>
      );
    }

    return button;
  };

  const renderDestroyButton = () => {
    if (!hasPermissionToDestroy) {
      return null;
    }

    const disabled = !selectedKeys.length || loading;

    const button = (
      <MDButton
        variant="contained"
        color={sidenavColor}
        type="button"
        disabled={disabled}
        onClick={doOpenDestroyAllConfirmModal}
        startIcon={<DeleteIcon />}
        size="small"
      >
        {i18n('common.destroy')}
      </MDButton>
    );

    if (disabled) {
      return (
        <Tooltip
          disableInteractive
          title={i18n('common.mustSelectARow')}
        >
          <span>{button}</span>
        </Tooltip>
      );
    }

    return button;
  };

  return (
    <ToolbarWrapper>
      {hasPermissionToCreate && (
        <MDButton
          variant="contained"
          color={sidenavColor}
          component={Link}
          to="/user/new"
          startIcon={<EmailIcon />}
          size="small"
        >
          {i18n('user.invite')}
        </MDButton>
      )}

      {hasPermissionToImport && (
        <MDButton
          variant="contained"
          color={sidenavColor}
          component={Link}
          to="/user/importer"
          startIcon={<CloudUploadIcon />}
          size="small"
        >
          {i18n('common.import')}
        </MDButton>
      )}

      {/* {renderActivateButton()} */}
      {renderDeactivateButton()}
      {renderDestroyButton()}

      {hasPermissionToAuditLogs && (
        <MDButton
          variant="outlined"
          color={sidenavColor}
          component={Link}
          to="/audit-logs?entityNames=user"
          startIcon={<HistoryIcon />}
          size="small"
        >
          {i18n('auditLog.menu')}
        </MDButton>
      )}

      {renderExportButton()}

      {activateAllConfirmVisible && (
        <ConfirmModal
          onConfirm={() => doActivateAllSelected()}
          onClose={() => doCloseActivateAllConfirmModal()}
        />
      )}

      {deactivateAllConfirmVisible && (
        <ConfirmModal
          onConfirm={() => doDeactivateAllSelected()}
          onClose={() => doCloseDeactivateAllConfirmModal()}
        />
      )}

      {destroyAllConfirmVisible && (
        <ConfirmModal
          onConfirm={() => doDestroyAllSelected()}
          onClose={() => doCloseDestroyAllConfirmModal()}
        />
      )}
    </ToolbarWrapper>
  );
}

export default UserToolbar;

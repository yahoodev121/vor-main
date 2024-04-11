import { i18n } from 'src/i18n';
import { Link } from 'react-router-dom';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import auditLogSelectors from 'src/modules/auditLog/auditLogSelectors';
import ConfirmModal from 'src/view/shared/modals/ConfirmModal';
import DeleteIcon from '@mui/icons-material/Delete';
import destroyActions from 'src/modules/vendorCategory/destroy/vendorCategoryDestroyActions';
import destroySelectors from 'src/modules/vendorCategory/destroy/vendorCategoryDestroySelectors';
import EditIcon from '@mui/icons-material/Edit';
import HistoryIcon from '@mui/icons-material/History';
import MDButton from 'src/mui/components/MDButton';
import ToolbarWrapper from 'src/view/shared/styles/ToolbarWrapper';
import vendorCategorySelectors from 'src/modules/vendorCategory/vendorCategorySelectors';

function VendorCategoryViewToolbar(props) {
  const { sidenavColor } = selectMuiSettings();
  const [destroyConfirmVisible, setDestroyConfirmVisible] =
    useState(false);

  const dispatch = useDispatch();

  const id = props.match.params.id;

  const hasPermissionToAuditLogs = useSelector(
    auditLogSelectors.selectPermissionToRead,
  );
  const hasPermissionToEdit = useSelector(
    vendorCategorySelectors.selectPermissionToEdit,
  );
  const hasPermissionToDestroy = useSelector(
    vendorCategorySelectors.selectPermissionToDestroy,
  );
  const destroyLoading = useSelector(
    destroySelectors.selectLoading,
  );

  const doOpenDestroyConfirmModal = () => {
    setDestroyConfirmVisible(true);
  };

  const doCloseDestroyConfirmModal = () => {
    setDestroyConfirmVisible(false);
  };

  const doDestroy = () => {
    doCloseDestroyConfirmModal();
    dispatch(destroyActions.doDestroy(id));
  };

  return (
    <ToolbarWrapper>
      {hasPermissionToEdit && (
        <MDButton
          component={Link}
          to={`/vendor-category/${id}/edit`}
          variant="gradient"
          color={sidenavColor}
          type="button"
          startIcon={<EditIcon />}
          size="small"
        >
          {i18n('common.edit')}
        </MDButton>
      )}

      {hasPermissionToDestroy && (
        <MDButton
          variant="gradient"
          color={sidenavColor}
          type="button"
          startIcon={<DeleteIcon />}
          disabled={destroyLoading}
          onClick={doOpenDestroyConfirmModal}
          size="small"
        >
          {i18n('common.destroy')}
        </MDButton>
      )}

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
        to={'/vendor-category'}
        startIcon={<ArrowBackIcon />}
        size="small"
      >
        {i18n('common.back')}
      </MDButton>

      {destroyConfirmVisible && (
        <ConfirmModal
          title={i18n('common.areYouSure')}
          onConfirm={() => doDestroy()}
          onClose={() => doCloseDestroyConfirmModal()}
          okText={i18n('common.yes')}
          cancelText={i18n('common.no')}
        />
      )}
    </ToolbarWrapper>
  );
}

export default VendorCategoryViewToolbar;

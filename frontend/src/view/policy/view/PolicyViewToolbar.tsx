import { i18n } from 'src/i18n';
import { Link } from 'react-router-dom';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import actions from 'src/modules/policy/versions/policyVersionsActions';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import auditLogSelectors from 'src/modules/auditLog/auditLogSelectors';
import ConfirmModal from 'src/view/shared/modals/ConfirmModal';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import destroyActions from 'src/modules/policy/destroy/policyDestroyActions';
import destroySelectors from 'src/modules/policy/destroy/policyDestroySelectors';
import EditIcon from '@mui/icons-material/Edit';
import HistoryIcon from '@mui/icons-material/History';
import MDButton from 'src/mui/components/MDButton';
import policySelectors from 'src/modules/policy/policySelectors';
import selectors from 'src/modules/policy/view/policyViewSelectors';
import ToolbarWrapper from 'src/view/shared/styles/ToolbarWrapper';
import VisibilityIcon from '@mui/icons-material/Visibility';

function PolicyViewToolbar(props) {
  const { sidenavColor } = selectMuiSettings();
  const [destroyConfirmVisible, setDestroyConfirmVisible] =
    useState(false);
  const [cloneConfirmVisible, setCloneConfirmVisible] =
    useState(false);
  const [publishConfirmVisible, setPublishConfirmVisible] =
    useState(false);

  const dispatch = useDispatch();

  const record = useSelector(selectors.selectRecord);

  const id = props.match.params.id;
  const version =
    record?.version || props.match.params.version;

  const hasPermissionToAuditLogs = useSelector(
    auditLogSelectors.selectPermissionToRead,
  );
  const hasPermissionToEdit = useSelector(
    policySelectors.selectPermissionToEdit,
  );
  const hasPermissionToDestroy = useSelector(
    policySelectors.selectPermissionToDestroy,
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

  const doOpenCloneConfirmModal = () => {
    setCloneConfirmVisible(true);
  };

  const doCloseCloneConfirmModal = () => {
    setCloneConfirmVisible(false);
  };

  const doOpenPublishConfirmModal = () => {
    setPublishConfirmVisible(true);
  };

  const doClosePublishConfirmModal = () => {
    setPublishConfirmVisible(false);
  };

  const doDestroy = () => {
    doCloseDestroyConfirmModal();
    dispatch(destroyActions.doDestroy(id));
  };

  const doPublish = () => {
    doClosePublishConfirmModal();
    dispatch(actions.doPublish(id, version));
  };

  const doClone = () => {
    doCloseCloneConfirmModal();
    dispatch(actions.doClone(id, version));
  };

  return (
    <ToolbarWrapper>
      {hasPermissionToEdit && record && (
        <>
          {Boolean(record?.lastPublishedDate) ? (
            <MDButton
              variant="gradient"
              color={sidenavColor}
              type="button"
              startIcon={<ContentCopyIcon />}
              size="small"
              onClick={() => doOpenCloneConfirmModal()}
            >
              {i18n('common.clone')}
            </MDButton>
          ) : (
            <>
              <MDButton
                variant="gradient"
                color={sidenavColor}
                type="button"
                startIcon={<VisibilityIcon />}
                size="small"
                onClick={() => doOpenPublishConfirmModal()}
              >
                {i18n('common.publish')}
              </MDButton>
              <MDButton
                component={Link}
                to={`/policy/${id}${
                  version ? `/${version}` : ''
                }/edit`}
                variant="gradient"
                color={sidenavColor}
                type="button"
                startIcon={<EditIcon />}
                size="small"
              >
                {i18n('common.edit')}
              </MDButton>
            </>
          )}
          {hasPermissionToDestroy &&
            !record.lastPublishedDate && (
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
        </>
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
        to={'/policy'}
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

      {cloneConfirmVisible && (
        <ConfirmModal
          title={i18n('common.areYouSure')}
          onConfirm={() => doClone()}
          onClose={() => doCloseCloneConfirmModal()}
          okText={i18n('common.yes')}
          cancelText={i18n('common.no')}
        />
      )}

      {publishConfirmVisible && (
        <ConfirmModal
          title={i18n('common.areYouSure')}
          onConfirm={() => doPublish()}
          onClose={() => doClosePublishConfirmModal()}
          okText={i18n('common.yes')}
          cancelText={i18n('common.no')}
        />
      )}
    </ToolbarWrapper>
  );
}

export default PolicyViewToolbar;

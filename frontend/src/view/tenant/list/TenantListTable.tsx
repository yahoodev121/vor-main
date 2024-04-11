import { i18n } from 'src/i18n';
import { Link } from 'react-router-dom';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { TableContainer } from '@mui/material';
import { tenantSubdomain } from 'src/modules/tenant/tenantSubdomain';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import actions from 'src/modules/tenant/list/tenantListActions';
import authActions from 'src/modules/auth/authActions';
import authSelectors from 'src/modules/auth/authSelectors';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ColorBadge from 'src/view/shared/components/ColorBadge';
import ColoredChip from 'src/view/shared/ColoredChip';
import config from 'src/config';
import ConfirmModal from 'src/view/shared/modals/ConfirmModal';
import DataTableBodyCell from 'src/mui/shared/Tables/DataTable/DataTableBodyCell';
import DataTableHeadCell from 'src/mui/shared/Tables/DataTable/DataTableHeadCell';
import DeleteIcon from '@mui/icons-material/Delete';
import destroyActions from 'src/modules/tenant/destroy/tenantDestroyActions';
import destroySelectors from 'src/modules/tenant/destroy/tenantDestroySelectors';
import EditIcon from '@mui/icons-material/Edit';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import IconButton from '@mui/material/IconButton';
import invitationActions from 'src/modules/tenant/invitation/tenantInvitationActions';
import invitationSelectors from 'src/modules/tenant/invitation/tenantInvitationSelectors';
import MDBox from 'src/mui/components/MDBox';
import MDButton from 'src/mui/components/MDButton';
import MDTypography from 'src/mui/components/MDTypography';
import Pagination from 'src/view/shared/table/Pagination';
import Plans from 'src/security/plans';
import selectors from 'src/modules/tenant/list/tenantListSelectors';
import Spinner from 'src/view/shared/Spinner';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import tenantSelectors from 'src/modules/tenant/tenantSelectors';
import Tooltip from '@mui/material/Tooltip';

function TenantListTable() {
  const dispatch = useDispatch();
  const { sidenavColor } = selectMuiSettings();

  const [recordIdToDestroy, setRecordIdToDestroy] =
    useState(null);

  const [
    invitationTokenToDeclineInvitation,
    setInvitationTokenToDeclineInvitation,
  ] = useState(null);

  const listLoading = useSelector(selectors.selectLoading);
  const destroyLoading = useSelector(
    destroySelectors.selectLoading,
  );
  const invitationLoading = useSelector(
    invitationSelectors.selectLoading,
  );

  const loading =
    listLoading || destroyLoading || invitationLoading;

  const rows = useSelector(selectors.selectRows);
  const pagination = useSelector(
    selectors.selectPagination,
  );
  const hasRows = useSelector(selectors.selectHasRows);
  const sorter = useSelector(selectors.selectSorter);
  const hasPermissionToEdit = useSelector(
    tenantSelectors.selectPermissionToEdit,
  );
  const hasPermissionToDestroy = useSelector(
    tenantSelectors.selectPermissionToDestroy,
  );
  const invitationToken = useSelector(
    tenantSelectors.selectInvitationToken,
  );

  const currentTenant = useSelector(
    authSelectors.selectCurrentTenant,
  );

  const doChangeSort = (field) => {
    const order =
      sorter.field === field && sorter.order === 'asc'
        ? 'desc'
        : 'asc';

    dispatch(
      actions.doChangeSort({
        field,
        order,
      }),
    );
  };

  const doSelectTenant = (tenant) => {
    dispatch(authActions.doSelectTenant(tenant));
  };

  const doChangePagination = (pagination) => {
    dispatch(actions.doChangePagination(pagination));
  };

  const doDestroy = (id) => {
    setRecordIdToDestroy(null);
    dispatch(destroyActions.doDestroy(id));
  };

  const doDeclineInvitation = (token) => {
    setInvitationTokenToDeclineInvitation(null);
    dispatch(invitationActions.doDecline(token));
  };

  const doAcceptInvitation = (token) => {
    dispatch(invitationActions.doAccept(token));
  };

  return (
    <>
      <TableContainer sx={{ boxShadow: 'none' }}>
        <Table>
          <MDBox component="thead">
            <TableRow>
              <DataTableHeadCell sorted={false} width="0">
                {' '}
              </DataTableHeadCell>
              <DataTableHeadCell
                onClick={() => doChangeSort('name')}
                sorted={
                  sorter.field === 'name'
                    ? sorter.order
                    : 'none'
                }
              >
                {i18n('tenant.fields.name')}
              </DataTableHeadCell>
              {tenantSubdomain.isEnabled && (
                <DataTableHeadCell sorted={false}>
                  {i18n('tenant.fields.url')}
                </DataTableHeadCell>
              )}
              {config.isPlanEnabled && (
                <DataTableHeadCell sorted={false}>
                  {i18n('tenant.fields.plan')}
                </DataTableHeadCell>
              )}
            </TableRow>
          </MDBox>
          <TableBody>
            {loading && (
              <TableRow>
                <DataTableBodyCell
                  align="center"
                  colSpan={100}
                >
                  <Spinner />
                </DataTableBodyCell>
              </TableRow>
            )}
            {!loading && !hasRows && (
              <TableRow>
                <DataTableBodyCell
                  align="center"
                  colSpan={100}
                >
                  <MDTypography>
                    {i18n('table.noData')}
                  </MDTypography>
                </DataTableBodyCell>
              </TableRow>
            )}
            {!loading &&
              rows.map((row) => (
                <TableRow key={row.id}>
                  <DataTableBodyCell align="right">
                    {Boolean(invitationToken(row)) ? (
                      <MDBox
                        display="flex"
                        justifyContent="flex-end"
                      >
                        <Tooltip
                          disableInteractive
                          title={i18n(
                            'tenant.invitation.accept',
                          )}
                        >
                          <IconButton
                            size="small"
                            color={sidenavColor}
                            onClick={() =>
                              doAcceptInvitation(
                                invitationToken(row),
                              )
                            }
                          >
                            <CheckCircleIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip
                          disableInteractive
                          title={i18n(
                            'tenant.invitation.decline',
                          )}
                        >
                          <IconButton
                            size="small"
                            color={sidenavColor}
                            onClick={() =>
                              setInvitationTokenToDeclineInvitation(
                                invitationToken(row),
                              )
                            }
                          >
                            <CancelIcon />
                          </IconButton>
                        </Tooltip>
                      </MDBox>
                    ) : (
                      <MDBox
                        display="flex"
                        justifyContent="flex-end"
                      >
                        {currentTenant.id !== row.id && (
                          <Tooltip
                            disableInteractive
                            title={i18n('tenant.select')}
                          >
                            <MDButton
                              mr={0.8}
                              color={sidenavColor}
                              variant="gradient"
                              onClick={() =>
                                doSelectTenant(row)
                              }
                              size="small"
                            >
                              <ExitToAppIcon />
                            </MDButton>
                          </Tooltip>
                        )}
                        {hasPermissionToEdit(row) && (
                          <Tooltip
                            disableInteractive
                            title={i18n('common.edit')}
                          >
                            <IconButton
                              size="small"
                              color={sidenavColor}
                              component={Link}
                              to={`/tenant/${row.id}/edit`}
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                        )}
                        {hasPermissionToDestroy(row) && (
                          <Tooltip
                            disableInteractive
                            title={i18n('common.destroy')}
                          >
                            <IconButton
                              size="small"
                              color={sidenavColor}
                              onClick={() =>
                                setRecordIdToDestroy(row.id)
                              }
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        )}
                      </MDBox>
                    )}
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    {row.name}
                    {Boolean(invitationToken(row)) && (
                      <ColoredChip
                        label={i18n(
                          'tenant.invitation.invited',
                        )}
                        color="yellow"
                        style={{ marginLeft: '6.4px' }}
                      />
                    )}
                  </DataTableBodyCell>
                  {tenantSubdomain.isEnabled && (
                    <DataTableBodyCell>{`${row.url}.${config.frontendUrl.host}`}</DataTableBodyCell>
                  )}
                  {config.isPlanEnabled && (
                    <DataTableBodyCell>
                      <ColorBadge
                        color={
                          row.plan === Plans.values.free
                            ? 'success'
                            : 'warning'
                        }
                        label={i18n(
                          `plan.${row.plan}.label`,
                        )}
                      />
                    </DataTableBodyCell>
                  )}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        onChange={doChangePagination}
        disabled={loading}
        pagination={pagination}
        entriesPerPage
        showTotalEntries
      />

      {invitationTokenToDeclineInvitation && (
        <ConfirmModal
          title={i18n('common.areYouSure')}
          onConfirm={() =>
            doDeclineInvitation(
              invitationTokenToDeclineInvitation,
            )
          }
          onClose={() =>
            setInvitationTokenToDeclineInvitation(null)
          }
          okText={i18n('common.yes')}
          cancelText={i18n('common.no')}
        />
      )}

      {recordIdToDestroy && (
        <ConfirmModal
          title={i18n('common.areYouSure')}
          onConfirm={() => doDestroy(recordIdToDestroy)}
          onClose={() => setRecordIdToDestroy(null)}
          okText={i18n('common.yes')}
          cancelText={i18n('common.no')}
        />
      )}
    </>
  );
}

export default TenantListTable;

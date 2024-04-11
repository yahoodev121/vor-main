import { DEFAULT_MOMENT_FORMAT_DATE_ONLY } from 'src/config/common';
import { i18n } from 'src/i18n';
import { Link } from 'react-router-dom';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { TableContainer } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import actions from 'src/modules/campaign/list/campaignListActions';
import campaignSelectors from 'src/modules/campaign/campaignSelectors';
import CampaignStatusViewItem from 'src/view/campaign/view/CampaignStatusViewItem';
import Checkbox from '@mui/material/Checkbox';
import ConfirmModal from 'src/view/shared/modals/ConfirmModal';
import DataTableBodyCell from 'src/mui/shared/Tables/DataTable/DataTableBodyCell';
import DataTableHeadCell from 'src/mui/shared/Tables/DataTable/DataTableHeadCell';
import DeleteIcon from '@mui/icons-material/Delete';
import destroyActions from 'src/modules/campaign/destroy/campaignDestroyActions';
import destroySelectors from 'src/modules/campaign/destroy/campaignDestroySelectors';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import moment from 'moment';
import Pagination from 'src/view/shared/table/Pagination';
import ProgressStatus from 'src/view/shared/components/ProgressStatus';
import SearchIcon from '@mui/icons-material/Search';
import selectors from 'src/modules/campaign/list/campaignListSelectors';
import Spinner from 'src/view/shared/Spinner';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';

function CampaignListTable(props) {
  const { sidenavColor } = selectMuiSettings();
  const [recordIdToDestroy, setRecordIdToDestroy] =
    useState(null);
  const dispatch = useDispatch();

  const findLoading = useSelector(selectors.selectLoading);

  const destroyLoading = useSelector(
    destroySelectors.selectLoading,
  );

  const loading = findLoading || destroyLoading;

  const rows = useSelector(selectors.selectRows);
  const pagination = useSelector(
    selectors.selectPagination,
  );
  const selectedKeys = useSelector(
    selectors.selectSelectedKeys,
  );
  const hasRows = useSelector(selectors.selectHasRows);
  const sorter = useSelector(selectors.selectSorter);
  const isAllSelected = useSelector(
    selectors.selectIsAllSelected,
  );
  const hasPermissionToEdit = useSelector(
    campaignSelectors.selectPermissionToEdit,
  );
  const hasPermissionToDestroy = useSelector(
    campaignSelectors.selectPermissionToDestroy,
  );

  const doOpenDestroyConfirmModal = (id) => {
    setRecordIdToDestroy(id);
  };

  const doCloseDestroyConfirmModal = () => {
    setRecordIdToDestroy(null);
  };

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

  const doChangePagination = (pagination) => {
    dispatch(actions.doChangePagination(pagination));
  };

  const doDestroy = (id) => {
    doCloseDestroyConfirmModal();

    dispatch(destroyActions.doDestroy(id));
  };

  const doToggleAllSelected = () => {
    dispatch(actions.doToggleAllSelected());
  };

  const doToggleOneSelected = (id) => {
    dispatch(actions.doToggleOneSelected(id));
  };

  return (
    <>
      <TableContainer sx={{ boxShadow: 'none' }}>
        <Table>
          <MDBox component="thead">
            <TableRow>
              <DataTableHeadCell
                padding="checkbox"
                width="0"
                sorted={false}
              >
                {hasRows && (
                  <Checkbox
                    color={sidenavColor}
                    checked={Boolean(isAllSelected)}
                    onChange={() => doToggleAllSelected()}
                    size="small"
                  />
                )}
              </DataTableHeadCell>
              <DataTableHeadCell sorted={false} width="0">
                {' '}
              </DataTableHeadCell>
              <DataTableHeadCell
                onClick={() => doChangeSort('reference')}
                sorted={
                  sorter.field === 'reference'
                    ? sorter.order
                    : 'none'
                }
                width="0"
                noWrap
              >
                {i18n('entities.campaign.fields.reference')}
              </DataTableHeadCell>
              <DataTableHeadCell
                onClick={() => doChangeSort('name')}
                sorted={
                  sorter.field === 'name'
                    ? sorter.order
                    : 'none'
                }
              >
                {i18n('entities.campaign.fields.name')}
              </DataTableHeadCell>
              <DataTableHeadCell
                onClick={() => doChangeSort('audience')}
                sorted={
                  sorter.field === 'audience'
                    ? sorter.order
                    : 'none'
                }
              >
                {i18n('entities.campaign.fields.type')}
              </DataTableHeadCell>
              <DataTableHeadCell
                onClick={() => doChangeSort('status')}
                sorted={
                  sorter.field === 'status'
                    ? sorter.order
                    : 'none'
                }
              >
                {i18n('entities.campaign.fields.status')}
              </DataTableHeadCell>
              <DataTableHeadCell
                onClick={() => doChangeSort('progress')}
                sorted={
                  sorter.field === 'progress'
                    ? sorter.order
                    : 'none'
                }
              >
                {i18n('entities.campaign.fields.progress')}
              </DataTableHeadCell>
              <DataTableHeadCell
                onClick={() => doChangeSort('dueDate')}
                sorted={
                  sorter.field === 'dueDate'
                    ? sorter.order
                    : 'none'
                }
              >
                {i18n('entities.campaign.fields.dueDate')}
              </DataTableHeadCell>
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
                  <MDTypography align="center">
                    {i18n('table.noData')}
                  </MDTypography>
                </DataTableBodyCell>
              </TableRow>
            )}
            {!loading &&
              rows.map((row) => (
                <TableRow key={row.id}>
                  <DataTableBodyCell padding="checkbox">
                    <Checkbox
                      color={sidenavColor}
                      checked={selectedKeys.includes(
                        row.id,
                      )}
                      onChange={() =>
                        doToggleOneSelected(row.id)
                      }
                      size="small"
                    />
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    <MDBox
                      display="flex"
                      justifyContent="flex-end"
                    >
                      <Tooltip
                        disableInteractive
                        title={i18n('common.view')}
                      >
                        <span>
                          <IconButton
                            size="small"
                            component={Link}
                            color={sidenavColor}
                            to={`/campaign/${row.id}`}
                            disabled={
                              row.status ===
                                'Not Started' ||
                              row.type === 'Email'
                            }
                          >
                            <SearchIcon />
                          </IconButton>
                        </span>
                      </Tooltip>
                      {hasPermissionToEdit && (
                        <Tooltip
                          disableInteractive
                          title={i18n('common.edit')}
                        >
                          <span>
                            <IconButton
                              size="small"
                              color={sidenavColor}
                              component={Link}
                              to={`/campaign/${row.id}/edit`}
                              disabled={
                                row.status !== 'Not Started'
                              }
                            >
                              <EditIcon />
                            </IconButton>
                          </span>
                        </Tooltip>
                      )}
                      {hasPermissionToDestroy && (
                        <Tooltip
                          disableInteractive
                          title={i18n('common.destroy')}
                        >
                          <span>
                            <IconButton
                              size="small"
                              color={sidenavColor}
                              onClick={() =>
                                doOpenDestroyConfirmModal(
                                  row.id,
                                )
                              }
                              disabled={
                                row.status !== 'Not Started'
                              }
                            >
                              <DeleteIcon />
                            </IconButton>
                          </span>
                        </Tooltip>
                      )}
                    </MDBox>
                  </DataTableBodyCell>
                  <DataTableBodyCell align="right">
                    {row.reference}
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    {row.name}
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    {row.audience
                      ? i18n(
                          `entities.campaign.enumerators.audience.${row.audience}`,
                        )
                      : null}{' '}
                    {row.type
                      ? i18n(
                          `entities.campaign.enumerators.type.${row.type}`,
                        )
                      : null}
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    <CampaignStatusViewItem
                      value={row.status}
                    />
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    <ProgressStatus
                      completed={row.progress}
                      title={row.status}
                    />
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    {row.dueDate
                      ? moment(row.dueDate).format(
                          DEFAULT_MOMENT_FORMAT_DATE_ONLY,
                        )
                      : null}
                  </DataTableBodyCell>
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

      {recordIdToDestroy && (
        <ConfirmModal
          title={i18n('common.areYouSure')}
          onConfirm={() => doDestroy(recordIdToDestroy)}
          onClose={() => doCloseDestroyConfirmModal()}
          okText={i18n('common.yes')}
          cancelText={i18n('common.no')}
        />
      )}
    </>
  );
}

export default CampaignListTable;

import { i18n } from 'src/i18n';
import { Link } from 'react-router-dom';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { TableContainer } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import actions from 'src/modules/client/list/clientListActions';
import Checkbox from '@mui/material/Checkbox';
import ClientCategoryListItem from 'src/view/clientCategory/list/ClientCategoryListItem';
import ClientRatingViewItem from 'src/view/client/view/ClientRatingViewItem';
import clientSelectors from 'src/modules/client/clientSelectors';
import ClientStatusViewItem from 'src/view/client/view/ClientStatusViewItem';
import ConfirmModal from 'src/view/shared/modals/ConfirmModal';
import DataTableBodyCell from 'src/mui/shared/Tables/DataTable/DataTableBodyCell';
import DataTableHeadCell from 'src/mui/shared/Tables/DataTable/DataTableHeadCell';
import DeleteIcon from '@mui/icons-material/Delete';
import destroyActions from 'src/modules/client/destroy/clientDestroyActions';
import destroySelectors from 'src/modules/client/destroy/clientDestroySelectors';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import MDBadgeDot from 'src/mui/components/MDBadgeDot';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import Pagination from 'src/view/shared/table/Pagination';
import SearchIcon from '@mui/icons-material/Search';
import selectors from 'src/modules/client/list/clientListSelectors';
import Spinner from 'src/view/shared/Spinner';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TagListItem from 'src/view/tag/list/TagListItem';
import Tooltip from '@mui/material/Tooltip';

function ClientListTable(props) {
  const { checkedIds, onClickCheckBox } = props;
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
    clientSelectors.selectPermissionToEdit,
  );
  const hasPermissionToDestroy = useSelector(
    clientSelectors.selectPermissionToDestroy,
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
    if (!checkedIds) {
      dispatch(actions.doToggleAllSelected());
    } else if (hasRows) {
      const doAll = isAllChecked();
      onClickCheckBox(
        rows
          .filter(
            ({ id }) => doAll || !checkedIds.includes(id),
          )
          .map(({ id }) => id),
      );
    }
  };

  const doToggleOneSelected = (id) => {
    if (!checkedIds) {
      dispatch(actions.doToggleOneSelected(id));
    } else {
      onClickCheckBox(id);
    }
  };

  const isAllChecked = () => {
    if (!checkedIds || !hasRows) {
      return false;
    }
    for (const row of rows) {
      if (!checkedIds.includes(row.id)) {
        return false;
      }
    }
    return true;
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
                    checked={
                      checkedIds
                        ? isAllChecked()
                        : Boolean(isAllSelected)
                    }
                    onChange={() => doToggleAllSelected()}
                    size="small"
                  />
                )}
              </DataTableHeadCell>
              {!checkedIds && (
                <DataTableHeadCell sorted={false} width="0">
                  {' '}
                </DataTableHeadCell>
              )}
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
                {i18n('entities.client.fields.reference')}
              </DataTableHeadCell>
              <DataTableHeadCell
                onClick={() => doChangeSort('name')}
                sorted={
                  sorter.field === 'name'
                    ? sorter.order
                    : 'none'
                }
              >
                {i18n('entities.client.fields.name')}
              </DataTableHeadCell>
              <DataTableHeadCell
                onClick={() => doChangeSort('status')}
                sorted={
                  sorter.field === 'status'
                    ? sorter.order
                    : 'none'
                }
              >
                {i18n('entities.client.fields.status')}
              </DataTableHeadCell>
              <DataTableHeadCell
                onClick={() => doChangeSort('rating')}
                sorted={
                  sorter.field === 'rating'
                    ? sorter.order
                    : 'none'
                }
              >
                {i18n('entities.client.fields.rating')}
              </DataTableHeadCell>
              <DataTableHeadCell sorted={false}>
                {i18n('entities.client.fields.category')}
              </DataTableHeadCell>
              <DataTableHeadCell sorted={false}>
                {i18n(
                  'entities.client.fields.dataProcessed',
                )}
              </DataTableHeadCell>
              <DataTableHeadCell sorted={false}>
                {i18n('entities.client.fields.tags')}
              </DataTableHeadCell>
              <DataTableHeadCell
                onClick={() => doChangeSort('industry')}
                sorted={
                  sorter.field === 'industry'
                    ? sorter.order
                    : 'none'
                }
              >
                {i18n('entities.client.fields.industry')}
              </DataTableHeadCell>
              <DataTableHeadCell
                onClick={() =>
                  doChangeSort('dateOnboarded')
                }
                sorted={
                  sorter.field === 'dateOnboarded'
                    ? sorter.order
                    : 'none'
                }
              >
                {i18n(
                  'entities.client.fields.dateOnboarded',
                )}
              </DataTableHeadCell>
              <DataTableHeadCell
                onClick={() =>
                  doChangeSort('dateOffboarded')
                }
                sorted={
                  sorter.field === 'dateOffboarded'
                    ? sorter.order
                    : 'none'
                }
              >
                {i18n(
                  'entities.client.fields.dateOffboarded',
                )}
              </DataTableHeadCell>
              <DataTableHeadCell
                onClick={() => doChangeSort('gdprRopa')}
                sorted={
                  sorter.field === 'gdprRopa'
                    ? sorter.order
                    : 'none'
                }
              >
                {i18n('entities.client.fields.gdprRopa')}
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
                      checked={
                        checkedIds
                          ? checkedIds.includes(row.id)
                          : selectedKeys.includes(row.id)
                      }
                      onChange={() =>
                        doToggleOneSelected(row.id)
                      }
                      size="small"
                    />
                  </DataTableBodyCell>
                  {!checkedIds && (
                    <DataTableBodyCell>
                      <MDBox
                        display="flex"
                        justifyContent="flex-end"
                      >
                        <Tooltip
                          disableInteractive
                          title={i18n('common.view')}
                        >
                          <IconButton
                            size="small"
                            component={Link}
                            color={sidenavColor}
                            to={`/client/${row.id}`}
                          >
                            <SearchIcon />
                          </IconButton>
                        </Tooltip>
                        {hasPermissionToEdit && (
                          <Tooltip
                            disableInteractive
                            title={i18n('common.edit')}
                          >
                            <IconButton
                              size="small"
                              color={sidenavColor}
                              component={Link}
                              to={`/client/${row.id}/edit`}
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                        )}
                        {hasPermissionToDestroy && (
                          <Tooltip
                            disableInteractive
                            title={i18n('common.destroy')}
                          >
                            <IconButton
                              size="small"
                              color={sidenavColor}
                              onClick={() =>
                                doOpenDestroyConfirmModal(
                                  row.id,
                                )
                              }
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        )}
                      </MDBox>
                    </DataTableBodyCell>
                  )}
                  <DataTableBodyCell align="right">
                    {row.reference}
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    {row.name}
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    <ClientStatusViewItem
                      value={row.status}
                    />
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    <ClientRatingViewItem
                      value={row.rating}
                    />
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    <ClientCategoryListItem
                      value={row.category}
                    />
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    {(row.dataProcessed || []).map(
                      (value) => (
                        <MDBadgeDot
                          key={value}
                          width="max-content"
                          badgeContent={
                            value
                              ? i18n(
                                  `entities.client.enumerators.dataProcessed.${value}`,
                                )
                              : null
                          }
                          color={sidenavColor}
                          variant="contained"
                        />
                      ),
                    )}
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    <TagListItem value={row.tags} />
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    {row.industry
                      ? i18n(
                          `entities.client.enumerators.industry.${row.industry}`,
                        )
                      : null}
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    {row.dateOnboarded}
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    {row.dateOffboarded}
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    {row.gdprRopa
                      ? i18n(
                          `entities.client.enumerators.gdprRopa.${row.gdprRopa}`,
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

export default ClientListTable;

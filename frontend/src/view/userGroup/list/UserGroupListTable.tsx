import { i18n } from 'src/i18n';
import { Link } from 'react-router-dom';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { TableContainer } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import actions from 'src/modules/userGroup/list/userGroupListActions';
import Checkbox from '@mui/material/Checkbox';
import ConfirmModal from 'src/view/shared/modals/ConfirmModal';
import DataTableBodyCell from 'src/mui/shared/Tables/DataTable/DataTableBodyCell';
import DataTableHeadCell from 'src/mui/shared/Tables/DataTable/DataTableHeadCell';
import DeleteIcon from '@mui/icons-material/Delete';
import destroyActions from 'src/modules/userGroup/destroy/userGroupDestroyActions';
import destroySelectors from 'src/modules/userGroup/destroy/userGroupDestroySelectors';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import Pagination from 'src/view/shared/table/Pagination';
import SearchIcon from '@mui/icons-material/Search';
import selectors from 'src/modules/userGroup/list/userGroupListSelectors';
import Spinner from 'src/view/shared/Spinner';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import userGroupSelectors from 'src/modules/userGroup/userGroupSelectors';
import UserListItem from 'src/view/user/list/UserListItem';
import UserGroupTypeViewItem from 'src/view/userGroup/view/UserGroupTypeViewItem';
import userViewActions from 'src/modules/user/view/userViewActions';

function UserGroupListTable(props) {
  const { userId } = props;

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
  const isAllSelected =
    useSelector(selectors.selectIsAllSelected) ||
    (userId && rows?.every(({ assigned }) => assigned));
  const hasPermissionToEdit = useSelector(
    userGroupSelectors.selectPermissionToEdit,
  );
  const hasPermissionToDestroy = useSelector(
    userGroupSelectors.selectPermissionToDestroy,
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
    if (!!userId) {
      dispatch(
        userViewActions.doToggleGroups(
          userId,
          rows.map(({ id }) => id),
          !isAllSelected,
        ),
      );
    } else {
      dispatch(actions.doToggleAllSelected());
    }
  };

  const doToggleOneSelected = (id) => {
    if (!!userId) {
      dispatch(userViewActions.doToggleGroup(userId, id));
    } else {
      dispatch(actions.doToggleOneSelected(id));
    }
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
                onClick={() => doChangeSort('name')}
                sorted={
                  sorter.field === 'name'
                    ? sorter.order
                    : 'none'
                }
              >
                {i18n('entities.userGroup.fields.name')}
              </DataTableHeadCell>
              <DataTableHeadCell
                onClick={() => doChangeSort('type')}
                sorted={
                  sorter.field === 'type'
                    ? sorter.order
                    : 'none'
                }
              >
                {i18n('entities.userGroup.fields.type')}
              </DataTableHeadCell>
              {!userId && (
                <>
                  <DataTableHeadCell sorted={false}>
                    {i18n(
                      'entities.userGroup.fields.totalUsers',
                    )}
                  </DataTableHeadCell>
                  <DataTableHeadCell sorted={false}>
                    {i18n(
                      'entities.userGroup.fields.users',
                    )}
                  </DataTableHeadCell>
                </>
              )}
            </TableRow>
          </MDBox>
          <TableBody>
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
            {rows?.map((row) => (
              <TableRow key={row.id}>
                <DataTableBodyCell padding="checkbox">
                  <Checkbox
                    color={sidenavColor}
                    disabled={loading}
                    checked={
                      selectedKeys.includes(row.id) ||
                      (!!userId && row?.assigned)
                    }
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
                      <IconButton
                        size="small"
                        component={Link}
                        color={sidenavColor}
                        to={`/user-group/${row.id}`}
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
                          to={`/user-group/${row.id}/edit`}
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
                <DataTableBodyCell>
                  {row.name}
                </DataTableBodyCell>
                <DataTableBodyCell>
                  {row.type ? (
                    <UserGroupTypeViewItem
                      value={row.type}
                    />
                  ) : null}
                </DataTableBodyCell>
                {!userId && (
                  <>
                    <DataTableBodyCell>
                      {row.totalUsers}
                    </DataTableBodyCell>
                    <DataTableBodyCell>
                      <UserListItem
                        value={row.users}
                        flexDirection="row"
                      />
                    </DataTableBodyCell>
                  </>
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

      {loading && (
        <MDBox
          display="flex"
          justifyContent="center"
          alignItems="center"
          position="absolute"
          width="100%"
          height="100%"
          top="0"
        >
          <Spinner />
        </MDBox>
      )}

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

export default UserGroupListTable;

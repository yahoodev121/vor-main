import { DEFAULT_MOMENT_FORMAT } from 'src/config/common';
import {
  getAbsoluteDateTimeByHour,
  toSafeLimitedValue,
} from 'src/modules/utils';
import { i18n } from 'src/i18n';
import { Link } from 'react-router-dom';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { TableContainer } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import config from 'src/config';
import ConfirmModal from 'src/view/shared/modals/ConfirmModal';
import DataTableBodyCell from 'src/mui/shared/Tables/DataTable/DataTableBodyCell';
import DataTableHeadCell from 'src/mui/shared/Tables/DataTable/DataTableHeadCell';
import DeleteIcon from '@mui/icons-material/Delete';
import destroyActions from 'src/modules/task/destroy/taskDestroyActions';
import destroySelectors from 'src/modules/task/destroy/taskDestroySelectors';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import MDBox from 'src/mui/components/MDBox';
import MDButton from 'src/mui/components/MDButton';
import MDTypography from 'src/mui/components/MDTypography';
import moment from 'moment';
import SearchIcon from '@mui/icons-material/Search';
import Spinner from 'src/view/shared/Spinner';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import taskSelectors from 'src/modules/task/taskSelectors';
import TaskStatusViewItem from 'src/view/task/view/TaskStatusViewItem';
import Tooltip from '@mui/material/Tooltip';
import UserListItem from 'src/view/user/list/UserListItem';

const TaskSubListTable = (props) => {
  const { sidenavColor } = selectMuiSettings();
  const dispatch = useDispatch();
  const { rows } = props;
  const destroyLoading = useSelector(
    destroySelectors.selectLoading,
  );
  const loading = destroyLoading;
  const hasRows = rows && !!rows.length;
  const hasPermissionToEdit = useSelector(
    taskSelectors.selectPermissionToEdit,
  );
  const hasPermissionToDestroy = useSelector(
    taskSelectors.selectPermissionToDestroy,
  );
  const countStep = config.limitNestedList;
  const [limit, setLimit] = useState(
    hasRows
      ? toSafeLimitedValue(rows.length, countStep)
      : 0,
  );
  const doLoadMore = () =>
    hasRows &&
    setLimit(
      toSafeLimitedValue(rows.length, limit + countStep),
    );
  const [recordIdToDestroy, setRecordIdToDestroy] =
    useState(null);
  const doOpenDestroyConfirmModal = (id) => {
    setRecordIdToDestroy(id);
  };
  const doCloseDestroyConfirmModal = () => {
    setRecordIdToDestroy(null);
  };
  const doDestroy = (id) => {
    doCloseDestroyConfirmModal();
    dispatch(destroyActions.doDestroy(id, false));
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
                sorted={false}
                width="0"
                noWrap
              >
                {i18n('entities.task.fields.reference')}
              </DataTableHeadCell>
              <DataTableHeadCell sorted={false} noWrap>
                {i18n('entities.task.fields.title')}
              </DataTableHeadCell>
              <DataTableHeadCell sorted={false} noWrap>
                {i18n('entities.task.fields.status')}
              </DataTableHeadCell>
              <DataTableHeadCell sorted={false} noWrap>
                {i18n('entities.task.fields.dueDate')}
              </DataTableHeadCell>
              <DataTableHeadCell sorted={false} noWrap>
                {i18n('entities.task.fields.owner')}
              </DataTableHeadCell>
              <DataTableHeadCell sorted={false} noWrap>
                {i18n('entities.task.fields.approver')}
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
              rows.slice(0, limit).map((row) => (
                <TableRow key={row.id}>
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
                          to={`/task/${row.id}`}
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
                            to={`/task/${row.id}/edit`}
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
                  <DataTableBodyCell align="right">
                    {row.reference}
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    {row.title}
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    <TaskStatusViewItem
                      value={row.status}
                    />
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    {row.dueDate
                      ? moment(
                          getAbsoluteDateTimeByHour(
                            row.dueDate,
                          ),
                        ).format(DEFAULT_MOMENT_FORMAT)
                      : null}
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    <UserListItem value={row.owner} />
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    <UserListItem value={row.approver} />
                  </DataTableBodyCell>
                </TableRow>
              ))}
            {hasRows && limit < rows.length && (
              <TableRow>
                <DataTableBodyCell
                  align="center"
                  colSpan={100}
                >
                  <MDButton
                    color={sidenavColor}
                    onClick={doLoadMore}
                    type="button"
                    variant="outlined"
                  >
                    {i18n('common.more')}
                  </MDButton>
                </DataTableBodyCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

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
};

export default TaskSubListTable;

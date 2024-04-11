import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { TableContainer } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import actions from 'src/modules/program/list/programListActions';
import Checkbox from '@mui/material/Checkbox';
import ConfirmModal from 'src/view/shared/modals/ConfirmModal';
import DataTableBodyCell from 'src/mui/shared/Tables/DataTable/DataTableBodyCell';
import DataTableHeadCell from 'src/mui/shared/Tables/DataTable/DataTableHeadCell';
import destroyActions from 'src/modules/program/destroy/programDestroyActions';
import destroySelectors from 'src/modules/program/destroy/programDestroySelectors';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import Pagination from 'src/view/shared/table/Pagination';
import ProgramListRow from 'src/view/program/list/ProgramListRow';
import programSelectors from 'src/modules/program/programSelectors';
import riskSelectors from 'src/modules/risk/riskSelectors';
import selectors from 'src/modules/program/list/programListSelectors';
import Spinner from 'src/view/shared/Spinner';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';

function ProgramListTable(props) {
  const { handleOpenCreateRisk } = props;

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
    programSelectors.selectPermissionToEdit,
  );
  const hasPermissionToDestroy = useSelector(
    programSelectors.selectPermissionToDestroy,
  );
  const hasPermissionToCreateRisk = useSelector(
    riskSelectors.selectPermissionToCreate,
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
                {i18n('entities.program.fields.reference')}
              </DataTableHeadCell>
              <DataTableHeadCell
                onClick={() => doChangeSort('name')}
                sorted={
                  sorter.field === 'name'
                    ? sorter.order
                    : 'none'
                }
                width="0"
              >
                {i18n('entities.program.fields.name')}
              </DataTableHeadCell>
              <DataTableHeadCell sorted={false} width="0">
                {i18n(
                  'entities.program.fields.totalControlHealth',
                )}
              </DataTableHeadCell>
              <DataTableHeadCell
                sorted={false}
                width="0"
                noWrap
              >
                {i18n(
                  'entities.program.fields.totalRequirements',
                )}
              </DataTableHeadCell>
              <DataTableHeadCell
                sorted={false}
                width="0"
                noWrap
              >
                {i18n(
                  'entities.program.fields.totalControls',
                )}
              </DataTableHeadCell>
              <DataTableHeadCell sorted={false}>
                {' '}
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
                <ProgramListRow
                  key={`program-list-row-${row.id}`}
                  doOpenDestroyConfirmModal={
                    doOpenDestroyConfirmModal
                  }
                  doToggleOneSelected={doToggleOneSelected}
                  handleOpenCreateRisk={
                    handleOpenCreateRisk
                  }
                  hasPermissionToCreateRisk={
                    hasPermissionToCreateRisk
                  }
                  hasPermissionToDestroy={
                    hasPermissionToDestroy
                  }
                  hasPermissionToEdit={hasPermissionToEdit}
                  row={row}
                  selectedKeys={selectedKeys}
                  sidenavColor={sidenavColor}
                />
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

export default ProgramListTable;

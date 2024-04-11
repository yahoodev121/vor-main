import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { TableContainer } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import actions from 'src/modules/programControl/listView/programControlListViewActions';
import ConfirmModal from 'src/view/shared/modals/ConfirmModal';
import DataTableBodyCell from 'src/mui/shared/Tables/DataTable/DataTableBodyCell';
import DataTableHeadCell from 'src/mui/shared/Tables/DataTable/DataTableHeadCell';
import destroyActions from 'src/modules/programControl/destroy/programControlDestroyActions';
import destroySelectors from 'src/modules/programControl/destroy/programControlDestroySelectors';
import MDBox from 'src/mui/components/MDBox';
import MDButton from 'src/mui/components/MDButton';
import MDTypography from 'src/mui/components/MDTypography';
import Pagination from 'src/view/shared/table/Pagination';
import AddIcon from '@mui/icons-material/Add';
import ProgramControlListFilter from 'src/view/programControl/view/ProgramControlListFilter';
import ProgramControlListRow from 'src/view/programControl/list/ProgramControlListRow';
import programControlSelectors from 'src/modules/programControl/programControlSelectors';
import riskSelectors from 'src/modules/risk/riskSelectors';
import selectors from 'src/modules/programControl/listView/programControlListViewSelectors';
import Spinner from 'src/view/shared/Spinner';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import ProgramControlFormModal from 'src/view/programControl/form/ProgramControlFormModal';

function ProgramControlViewTable(props) {
  const [controlModalVisible, setControlModalVisible] =
    useState(false);

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
  const hasRows = useSelector(selectors.selectHasRows);
  const sorter = useSelector(selectors.selectSorter);
  const hasPermissionToEdit = useSelector(
    programControlSelectors.selectPermissionToEdit,
  );
  const hasPermissionToCreate = useSelector(
    programControlSelectors.selectPermissionToCreate,
  );
  const hasPermissionToDestroy = useSelector(
    programControlSelectors.selectPermissionToDestroy,
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

  const doCloseModal = () => {
    setControlModalVisible(false);
  };

  const doOpenModal = () => {
    setControlModalVisible(true);
  };

  const doCreateSuccess = (record) => {
    doCloseModal();
    props.reloading();
  };

  const doChangePagination = (pagination) => {
    dispatch(actions.doChangePagination(pagination));
  };

  const doDestroy = (id) => {
    doCloseDestroyConfirmModal();

    dispatch(destroyActions.doDestroy(id));
  };

  return (
    <MDBox topBorder>
      <MDBox display="flex" gap={4} pt={2.4} px={2.4}>
        <MDTypography variant="h5">
          {i18n('entities.programControl.label')}
        </MDTypography>
        <MDBox flexGrow={1}>
          <ProgramControlListFilter
            additionalFilters={{
              ids: props.value?.map((v) => v.id ?? v),
              contains: Boolean(props.value),
              requirements: props.requirements?.map(
                (v) => v.id ?? v,
              ),
              byRequirements: Boolean(props.requirements),
            }}
          />
        </MDBox>

        {props.hasAddButton && hasPermissionToCreate && (
          <MDBox minWidth={130}>
            <MDButton
              variant="gradient"
              color={sidenavColor}
              onClick={doOpenModal}
              startIcon={<AddIcon />}
            >
              {i18n('entities.programControl.add.title')}
            </MDButton>
          </MDBox>
        )}
      </MDBox>
      <TableContainer sx={{ boxShadow: 'none' }}>
        <Table>
          <MDBox component="thead">
            <TableRow>
              <DataTableHeadCell sorted={false} width="0">
                {' '}
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
                {i18n(
                  'entities.programControl.fields.name',
                )}
              </DataTableHeadCell>
              <DataTableHeadCell sorted={false}>
                {i18n(
                  'entities.programControl.fields.totalTaskHealth',
                )}
              </DataTableHeadCell>
              <DataTableHeadCell sorted={false}>
                {i18n(
                  'entities.programControl.fields.requirements',
                )}
              </DataTableHeadCell>
              <DataTableHeadCell
                sorted={false}
                width="0"
                noWrap
              >
                {i18n(
                  'entities.programControl.fields.totalRecurringTasks',
                )}
              </DataTableHeadCell>
              <DataTableHeadCell
                sorted={false}
                width="0"
                noWrap
              >
                {i18n(
                  'entities.programControl.fields.totalOneTimeTasks',
                )}
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
                <ProgramControlListRow
                  key={`program-control-row-${row.id}`}
                  doOpenDestroyConfirmModal={
                    doOpenDestroyConfirmModal
                  }
                  doToggleOneSelected={null}
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
                  selectedKeys={null}
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

      {controlModalVisible && (
        <ProgramControlFormModal
          onClose={doCloseModal}
          requirements={
            props.programId ? null : props.requirements
          }
          programId={props.programId}
          onSuccess={doCreateSuccess}
          hiddenImpossibleFields={true}
        />
      )}
    </MDBox>
  );
}

export default ProgramControlViewTable;

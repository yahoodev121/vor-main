import { i18n } from 'src/i18n';
import { Link } from 'react-router-dom';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import actions from 'src/modules/risk/list/riskListActions';
import AddIcon from '@mui/icons-material/Add';
import ConfirmModal from 'src/view/shared/modals/ConfirmModal';
import DataTableBodyCell from 'src/mui/shared/Tables/DataTable/DataTableBodyCell';
import DataTableHeadCell from 'src/mui/shared/Tables/DataTable/DataTableHeadCell';
import destroySelectors from 'src/modules/risk/destroy/riskDestroySelectors';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import MDBox from 'src/mui/components/MDBox';
import MDButton from 'src/mui/components/MDButton';
import MDTypography from 'src/mui/components/MDTypography';
import Pagination from 'src/view/shared/table/Pagination';
import RiskFormModal from 'src/view/risk/form/RiskFormModal';
import RiskListFilter from 'src/view/risk/list/RiskListFilter';
import RiskListTableBodyCells from 'src/view/risk/list/RiskListTableBodyCells';
import RiskListTableHeaderCells from 'src/view/risk/list/RiskListTableHeaderCells';
import riskSelectors from 'src/modules/risk/riskSelectors';
import SearchIcon from '@mui/icons-material/Search';
import selectors from 'src/modules/risk/list/riskListSelectors';
import Spinner from 'src/view/shared/Spinner';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';

function RiskViewTable(props) {
  const [riskModalVisible, setRiskModalVisible] =
    useState(false);
  const [confirmModalVisible, setConfirmModalVisible] =
    useState(false);
  const [riskId, setRiskId] = useState(null);
  const { sidenavColor } = selectMuiSettings();
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
    riskSelectors.selectPermissionToEdit,
  );

  const hasPermissionToCreate = useSelector(
    riskSelectors.selectPermissionToCreate,
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

  const doCloseModal = () => {
    setRiskModalVisible(false);
  };

  const doOpenModal = () => {
    setRiskModalVisible(true);
  };

  const doCreateSuccess = (record) => {
    setRiskId(record.id);
    setConfirmModalVisible(true);

    doCloseModal();
  };

  const doAddToTarget = () => {
    props.doAddRisks(riskId);
    setConfirmModalVisible(false);
  };

  const doCloseAdd = () => {
    setConfirmModalVisible(false);
  };

  const doChangePagination = (pagination) => {
    dispatch(actions.doChangePagination(pagination));
  };

  return (
    <>
      <MDBox
        display="flex"
        gap={4}
        pt={2.4}
        px={2.4}
        topBorder
      >
        <MDTypography variant="h5">
          {i18n('entities.risk.label')}
        </MDTypography>
        <RiskListFilter
          additionalFilters={{
            ids: props.value?.map((v) => v.id ?? v),
            contains: true,
          }}
        />
        {props.doAddRisks && hasPermissionToCreate && (
          <MDBox flexShrink={0}>
            <MDButton
              variant="gradient"
              color={sidenavColor}
              onClick={doOpenModal}
              startIcon={<AddIcon />}
            >
              {i18n('entities.risk.add.title')}
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
              <RiskListTableHeaderCells
                sorter={sorter}
                doChangeSort={doChangeSort}
              />
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
                          to={`/risk/${row.id}`}
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
                            to={`/risk/${row.id}/edit`}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                    </MDBox>
                  </DataTableBodyCell>
                  <RiskListTableBodyCells row={row} />
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

      {riskModalVisible && (
        <RiskFormModal
          onClose={doCloseModal}
          onSuccess={doCreateSuccess}
          hiddenImpossibleFields={true}
        />
      )}

      {confirmModalVisible && (
        <ConfirmModal
          title={
            props.confirmTextToAdd ??
            i18n('entities.risk.addToControl')
          }
          onConfirm={() => doAddToTarget()}
          onClose={() => doCloseAdd()}
          okText={i18n('common.yes')}
          cancelText={i18n('common.no')}
        />
      )}
    </>
  );
}

export default RiskViewTable;

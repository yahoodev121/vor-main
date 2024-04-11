import { i18n } from 'src/i18n';
import { Link } from 'react-router-dom';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { TableContainer } from '@mui/material';
import { toSafeLimitedValue } from '../../../modules/utils';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import config from 'src/config';
import ConfirmModal from 'src/view/shared/modals/ConfirmModal';
import DataTableBodyCell from 'src/mui/shared/Tables/DataTable/DataTableBodyCell';
import DataTableHeadCell from 'src/mui/shared/Tables/DataTable/DataTableHeadCell';
import DeleteIcon from '@mui/icons-material/Delete';
import destroyActions from 'src/modules/programControl/destroy/programControlDestroyActions';
import destroySelectors from 'src/modules/programControl/destroy/programControlDestroySelectors';
import EditIcon from '@mui/icons-material/Edit';
import GppMaybeIcon from '@mui/icons-material/GppMaybe';
import IconButton from '@mui/material/IconButton';
import MDBox from 'src/mui/components/MDBox';
import MDButton from 'src/mui/components/MDButton';
import MDTypography from 'src/mui/components/MDTypography';
import programControlSelectors from 'src/modules/programControl/programControlSelectors';
import riskSelectors from 'src/modules/risk/riskSelectors';
import SearchIcon from '@mui/icons-material/Search';
import Spinner from 'src/view/shared/Spinner';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import TotalTaskHealth from 'src/view/shared/components/TotalTaskHealth';

const ProgramControlSubListTable = (props) => {
  const { sidenavColor } = selectMuiSettings();
  const dispatch = useDispatch();
  const { handleOpenCreateRisk, rows } = props;
  const destroyLoading = useSelector(
    destroySelectors.selectLoading,
  );
  const loading = destroyLoading;
  const hasRows = rows && !!rows.length;
  const hasPermissionToEdit = useSelector(
    programControlSelectors.selectPermissionToEdit,
  );
  const hasPermissionToDestroy = useSelector(
    programControlSelectors.selectPermissionToDestroy,
  );
  const hasPermissionToCreateRisk = useSelector(
    riskSelectors.selectPermissionToCreate,
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
                {i18n(
                  'entities.programControl.fields.name',
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
              <DataTableHeadCell sorted={false}>
                {i18n(
                  'entities.programControl.fields.totalTaskHealth',
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
                  <MDTypography
                    align="center"
                    color="inherit"
                    fontWeight="regular"
                    variant="body2"
                  >
                    {i18n('table.noControls')}
                  </MDTypography>
                </DataTableBodyCell>
              </TableRow>
            )}
            {!loading &&
              hasRows &&
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
                          to={`/program-control/${row.id}`}
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
                            to={`/program-control/${row.id}/edit`}
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
                      {hasPermissionToCreateRisk &&
                        Boolean(handleOpenCreateRisk) && (
                          <Tooltip
                            disableInteractive
                            title={i18n(
                              'entities.programControl.tooltips.createRisk',
                            )}
                          >
                            <IconButton
                              color={sidenavColor}
                              onClick={() =>
                                handleOpenCreateRisk &&
                                handleOpenCreateRisk({
                                  controls: [
                                    {
                                      id: row.id,
                                      name: row.name,
                                    },
                                  ],
                                })
                              }
                              size="small"
                            >
                              <GppMaybeIcon />
                            </IconButton>
                          </Tooltip>
                        )}
                    </MDBox>
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    {row.name}
                  </DataTableBodyCell>
                  <DataTableBodyCell align="right">
                    {row.totalRecurringTasks}
                  </DataTableBodyCell>
                  <DataTableBodyCell align="right">
                    {row.totalOneTimeTasks}
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    <TotalTaskHealth
                      health={row.totalTaskHealth}
                    />
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

export default ProgramControlSubListTable;

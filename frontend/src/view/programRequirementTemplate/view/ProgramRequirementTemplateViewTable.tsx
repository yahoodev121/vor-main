import { i18n } from 'src/i18n';
import { Link } from 'react-router-dom';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { TableContainer } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import actions from 'src/modules/programRequirementTemplate/list/programRequirementTemplateListActions';
import authSelectors from 'src/modules/auth/authSelectors';
import ConfirmModal from 'src/view/shared/modals/ConfirmModal';
import DataTableBodyCell from 'src/mui/shared/Tables/DataTable/DataTableBodyCell';
import DataTableHeadCell from 'src/mui/shared/Tables/DataTable/DataTableHeadCell';
import DeleteIcon from '@mui/icons-material/Delete';
import destroyActions from 'src/modules/programRequirementTemplate/destroy/programRequirementTemplateDestroyActions';
import destroySelectors from 'src/modules/programRequirementTemplate/destroy/programRequirementTemplateDestroySelectors';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import Pagination from 'src/view/shared/table/Pagination';
import ProgramControlTemplateListItem from 'src/view/programControlTemplate/list/ProgramControlTemplateListItem';
import ProgramRequirementGuidanceTemplateListItem from 'src/view/programRequirementGuidanceTemplate/list/ProgramRequirementGuidanceTemplateListItem';
import ProgramRequirementTemplateListFilter from 'src/view/programRequirementTemplate/list/ProgramRequirementTemplateListFilter';
import programRequirementTemplateSelectors from 'src/modules/programRequirementTemplate/programRequirementTemplateSelectors';
import ProgramTemplateListItem from 'src/view/programTemplate/list/ProgramTemplateListItem';
import SearchIcon from '@mui/icons-material/Search';
import selectors from 'src/modules/programRequirementTemplate/list/programRequirementTemplateListSelectors';
import Spinner from 'src/view/shared/Spinner';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';

function ProgramRequirementTemplateViewTable(props) {
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
  const currentTenant = useSelector(
    authSelectors.selectCurrentTenant,
  );
  const hasPermissionToEdit = useSelector(
    programRequirementTemplateSelectors.selectPermissionToEdit,
  );
  const hasPermissionToDestroy = useSelector(
    programRequirementTemplateSelectors.selectPermissionToDestroy,
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

    dispatch(destroyActions.doDestroy(id, false));
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
          {i18n(
            'entities.programRequirementTemplate.label',
          )}
        </MDTypography>
        <MDBox flexGrow={1}>
          <ProgramRequirementTemplateListFilter
            additionalFilters={{
              ids: props.value?.map((v) => v.id ?? v),
              contains: true,
            }}
          />
        </MDBox>
      </MDBox>
      <TableContainer sx={{ boxShadow: 'none' }}>
        <Table>
          <MDBox component="thead">
            <TableRow>
              <DataTableHeadCell sorted={false} width="0">
                {' '}
              </DataTableHeadCell>
              <DataTableHeadCell
                onClick={() =>
                  doChangeSort('requirementID')
                }
                sorted={
                  sorter.field === 'requirementID'
                    ? sorter.order
                    : 'none'
                }
                width="0"
                noWrap
              >
                {i18n(
                  'entities.programRequirementTemplate.fields.requirementID',
                )}
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
                {i18n(
                  'entities.programRequirementTemplate.fields.name',
                )}
              </DataTableHeadCell>
              <DataTableHeadCell
                onClick={() => doChangeSort('description')}
                sorted={
                  sorter.field === 'description'
                    ? sorter.order
                    : 'none'
                }
                width="0"
              >
                {i18n(
                  'entities.programRequirementTemplate.fields.description',
                )}
              </DataTableHeadCell>
              <DataTableHeadCell sorted={false}>
                {i18n(
                  'entities.programRequirementTemplate.fields.programTemplates',
                )}
              </DataTableHeadCell>
              <DataTableHeadCell sorted={false}>
                {i18n(
                  'entities.programRequirementTemplate.fields.guidanceTemplates',
                )}
              </DataTableHeadCell>
              <DataTableHeadCell sorted={false} width="0">
                {i18n(
                  'entities.programRequirementTemplate.fields.totalControlTemplates',
                )}
              </DataTableHeadCell>
              <DataTableHeadCell sorted={false}>
                {i18n(
                  'entities.programRequirementTemplate.fields.controlTemplates',
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
                <TableRow key={row.id}>
                  <DataTableBodyCell>
                    {row.tenant === currentTenant.id && (
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
                            to={`/program-requirement-template/${row.id}`}
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
                              to={`/program-requirement-template/${row.id}/edit`}
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
                    )}
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    {row.requirementID}
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    {row.name}
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    {row.description}
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    <ProgramTemplateListItem
                      value={row.programTemplates}
                    />
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    <ProgramRequirementGuidanceTemplateListItem
                      value={row.guidanceTemplates}
                    />
                  </DataTableBodyCell>
                  <DataTableBodyCell align="right">
                    {row.totalControlTemplates}
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    <ProgramControlTemplateListItem
                      value={row.controlTemplates}
                    />
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

export default ProgramRequirementTemplateViewTable;

import { i18n } from 'src/i18n';
import { Link } from 'react-router-dom';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { TableContainer } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import actions from 'src/modules/programRequirementTemplate/list/programRequirementTemplateListActions';
import authSelectors from 'src/modules/auth/authSelectors';
import Checkbox from '@mui/material/Checkbox';
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
import programRequirementTemplateSelectors from 'src/modules/programRequirementTemplate/programRequirementTemplateSelectors';
import ProgramTemplateListItem from 'src/view/programTemplate/list/ProgramTemplateListItem';
import SearchIcon from '@mui/icons-material/Search';
import selectors from 'src/modules/programRequirementTemplate/list/programRequirementTemplateListSelectors';
import Spinner from 'src/view/shared/Spinner';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';

function ProgramRequirementTemplateListTable(props) {
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
                  )}
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

export default ProgramRequirementTemplateListTable;

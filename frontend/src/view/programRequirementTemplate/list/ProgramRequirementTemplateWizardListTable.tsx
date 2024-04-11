import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { TableContainer } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import actions from 'src/modules/programRequirementTemplate/list/programRequirementTemplateListActions';
import Checkbox from '@mui/material/Checkbox';
import DataTableBodyCell from 'src/mui/shared/Tables/DataTable/DataTableBodyCell';
import DataTableHeadCell from 'src/mui/shared/Tables/DataTable/DataTableHeadCell';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import Pagination from 'src/view/shared/table/Pagination';
import ProgramRequirementTemplateWizardListRow from 'src/view/programRequirementTemplate/list/ProgramRequirementTemplateWizardListRow';
import selectors from 'src/modules/programRequirementTemplate/list/programRequirementTemplateListSelectors';
import Spinner from 'src/view/shared/Spinner';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';

function ProgramRequirementTemplateListTable(props) {
  const {
    checkedIdsForControls,
    checkedIdsForRequirements,
    onClickControlCheckBox,
    onClickRequirementCheckBox,
  } = props;

  const { sidenavColor } = selectMuiSettings();

  const dispatch = useDispatch();

  const findLoading = useSelector(selectors.selectLoading);

  const loading = findLoading;

  const rows = useSelector(selectors.selectRows);
  const pagination = useSelector(
    selectors.selectPagination,
  );
  const hasRows = useSelector(selectors.selectHasRows);
  const sorter = useSelector(selectors.selectSorter);

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

  const doToggleAllSelected = () => {
    if (hasRows) {
      const doAll = isAllChecked();
      onClickRequirementCheckBox(
        rows
          .filter(
            ({ id }) =>
              doAll ||
              !checkedIdsForRequirements.includes(id),
          )
          .map(({ id, controlTemplates }) => ({
            id,
            controlTemplates,
          })),
      );
    }
  };

  const doToggleOneSelectedRequirement = ({
    id,
    controlTemplates,
  }) =>
    onClickRequirementCheckBox({ id, controlTemplates });

  const isAllChecked = () => {
    if (!checkedIdsForRequirements || !hasRows) {
      return false;
    }
    for (const row of rows) {
      if (!checkedIdsForRequirements.includes(row.id)) {
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
                    checked={isAllChecked()}
                    onChange={() => doToggleAllSelected()}
                    size="small"
                  />
                )}
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
              >
                {i18n(
                  'entities.programRequirementTemplate.fields.description',
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
                <ProgramRequirementTemplateWizardListRow
                  key={`requirement-${row.id}`}
                  checkedIdsForControls={
                    checkedIdsForControls
                  }
                  checkedIdsForRequirements={
                    checkedIdsForRequirements
                  }
                  doToggleOneSelectedRequirement={
                    doToggleOneSelectedRequirement
                  }
                  doToggleOneSelectedControl={
                    onClickControlCheckBox
                  }
                  row={row}
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
    </>
  );
}

export default ProgramRequirementTemplateListTable;

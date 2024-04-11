import { i18n } from 'src/i18n';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import DataTableBodyCell from 'src/mui/shared/Tables/DataTable/DataTableBodyCell';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import MDBox from 'src/mui/components/MDBox';
import ProgramRequirementSubListRows from 'src/view/programRequirement/list/ProgramRequirementListRows';
import SearchIcon from '@mui/icons-material/Search';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import TotalControlHealth from 'src/view/shared/components/TotalControlHealth';

const ProgramListRow = ({
  doOpenDestroyConfirmModal,
  doToggleOneSelected,
  handleOpenCreateRisk,
  hasPermissionToCreateRisk,
  hasPermissionToDestroy,
  hasPermissionToEdit,
  row,
  selectedKeys,
  sidenavColor,
}) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      <TableRow>
        <DataTableBodyCell padding="checkbox">
          <Checkbox
            color={sidenavColor}
            checked={selectedKeys.includes(row.id)}
            onChange={() => doToggleOneSelected(row.id)}
            size="small"
          />
        </DataTableBodyCell>
        <DataTableBodyCell
          noPaddingL={true}
          noPaddingR={true}
        >
          <IconButton
            color={sidenavColor}
            onClick={() => setExpanded(!expanded)}
            size="small"
          >
            {expanded ? (
              <KeyboardArrowDownIcon />
            ) : (
              <KeyboardArrowRightIcon />
            )}
          </IconButton>
        </DataTableBodyCell>
        <DataTableBodyCell noPaddingL={true}>
          <MDBox display="flex" justifyContent="flex-end">
            <Tooltip
              disableInteractive
              title={i18n('common.view')}
            >
              <IconButton
                size="small"
                component={Link}
                color={sidenavColor}
                to={`/program/${row.id}`}
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
                  to={`/program/${row.id}/edit`}
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
                    doOpenDestroyConfirmModal(row.id)
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
        <DataTableBodyCell>{row.name}</DataTableBodyCell>
        <DataTableBodyCell>
          <TotalControlHealth
            health={row.totalControlHealth}
          />
        </DataTableBodyCell>
        <DataTableBodyCell align="right">
          {row.totalRequirements ?? 0}
        </DataTableBodyCell>
        <DataTableBodyCell align="right">
          {row.totalControls ?? 0}
        </DataTableBodyCell>
        <DataTableBodyCell> </DataTableBodyCell>
      </TableRow>
      {expanded && (
        <ProgramRequirementSubListRows
          handleOpenCreateRisk={handleOpenCreateRisk}
          hasPermissionToCreateRisk={
            hasPermissionToCreateRisk
          }
          rows={row.requirements ?? []}
          sidenavColor={sidenavColor}
        />
      )}
    </>
  );
};

export default ProgramListRow;

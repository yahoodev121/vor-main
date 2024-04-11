import { i18n } from 'src/i18n';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import DataTableBodyCell from 'src/mui/shared/Tables/DataTable/DataTableBodyCell';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import GppMaybeIcon from '@mui/icons-material/GppMaybe';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import MDBox from 'src/mui/components/MDBox';
import ProgramRequirementListItem from 'src/view/programRequirement/list/ProgramRequirementListItem';
import SearchIcon from '@mui/icons-material/Search';
import TableRow from '@mui/material/TableRow';
import TaskSubListTable from 'src/view/task/list/TaskSubListTable';
import Tooltip from '@mui/material/Tooltip';
import TotalTaskHealth from 'src/view/shared/components/TotalTaskHealth';

const ProgramControlListRow = ({
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
        {!!doToggleOneSelected && (
          <DataTableBodyCell padding="checkbox">
            <Checkbox
              color={sidenavColor}
              checked={selectedKeys.includes(row.id)}
              onChange={() => doToggleOneSelected(row.id)}
              size="small"
            />
          </DataTableBodyCell>
        )}
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
            {hasPermissionToDestroy &&
              !!doOpenDestroyConfirmModal && (
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
        <DataTableBodyCell>{row.name}</DataTableBodyCell>
        <DataTableBodyCell>
          <TotalTaskHealth health={row.totalTaskHealth} />
        </DataTableBodyCell>
        <DataTableBodyCell>
          <ProgramRequirementListItem
            value={row.requirements}
          />
        </DataTableBodyCell>
        <DataTableBodyCell align="right">
          {row.totalRecurringTasks}
        </DataTableBodyCell>
        <DataTableBodyCell align="right">
          {row.totalOneTimeTasks}
        </DataTableBodyCell>
        <DataTableBodyCell> </DataTableBodyCell>
      </TableRow>
      {expanded && (
        <TableRow>
          <DataTableBodyCell
            colSpan={!!doToggleOneSelected ? 2 : 1}
          >
            {' '}
          </DataTableBodyCell>
          <DataTableBodyCell colSpan={100} px={0}>
            <TaskSubListTable
              handleOpenCreateRisk={handleOpenCreateRisk}
              rows={row.tasks ?? []}
            />
          </DataTableBodyCell>
        </TableRow>
      )}
    </>
  );
};

export default ProgramControlListRow;

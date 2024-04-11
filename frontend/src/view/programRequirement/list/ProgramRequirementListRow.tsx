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
import ProgramControlSubListTable from 'src/view/programControl/list/ProgramControlSubListTable';
import ProgramListItem from 'src/view/program/list/ProgramListItem';
import SearchIcon from '@mui/icons-material/Search';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import TotalControlHealth from 'src/view/shared/components/TotalControlHealth';

const ProgramRequirementListRow = ({
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
                to={`/program-requirement/${row.id}`}
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
                  to={`/program-requirement/${row.id}/edit`}
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
                    'entities.programRequirement.tooltips.createRisk',
                  )}
                >
                  <IconButton
                    color={sidenavColor}
                    onClick={() =>
                      handleOpenCreateRisk &&
                      handleOpenCreateRisk({
                        requirements: [
                          {
                            id: row.id,
                            name: row.name,
                            requirementID:
                              row.requirementID,
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
          {row.requirementID}
        </DataTableBodyCell>
        <DataTableBodyCell>{row.name}</DataTableBodyCell>
        <DataTableBodyCell>
          <TotalControlHealth
            health={row.totalControlHealth}
          />
        </DataTableBodyCell>
        <DataTableBodyCell>
          <ProgramListItem value={row.programs} />
        </DataTableBodyCell>
        <DataTableBodyCell align="right">
          {row.totalControls}
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
            <ProgramControlSubListTable
              handleOpenCreateRisk={handleOpenCreateRisk}
              rows={row.controls ?? []}
            />
          </DataTableBodyCell>
        </TableRow>
      )}
    </>
  );
};

export default ProgramRequirementListRow;

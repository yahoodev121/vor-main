import { IconButton } from '@mui/material';
import { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import DataTableBodyCell from 'src/mui/shared/Tables/DataTable/DataTableBodyCell';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import TableRow from '@mui/material/TableRow';
import ProgramControlTemplateSubListRows from 'src/view/programControlTemplate/list/ProgramControlTemplateSubListRows';

const ProgramRequirementTemplateWizardListRow = ({
  checkedIdsForControls,
  checkedIdsForRequirements,
  doToggleOneSelectedControl,
  doToggleOneSelectedRequirement,
  row,
  sidenavColor,
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <TableRow>
        <DataTableBodyCell padding="checkbox">
          <Checkbox
            color={sidenavColor}
            checked={checkedIdsForRequirements.includes(
              row.id,
            )}
            onChange={() =>
              doToggleOneSelectedRequirement(row)
            }
            size="small"
          />
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
        <DataTableBodyCell>
          {row.requirementID}
        </DataTableBodyCell>
        <DataTableBodyCell>{row.name}</DataTableBodyCell>
        <DataTableBodyCell>
          {row.description}
        </DataTableBodyCell>
      </TableRow>
      {expanded && (
        <ProgramControlTemplateSubListRows
          checkedIds={checkedIdsForControls[row.id] ?? []}
          doToggleOneSelectedControl={
            doToggleOneSelectedControl
          }
          requirementId={row.id}
          rows={row.controlTemplates ?? []}
          sidenavColor={sidenavColor}
        />
      )}
    </>
  );
};

export default ProgramRequirementTemplateWizardListRow;

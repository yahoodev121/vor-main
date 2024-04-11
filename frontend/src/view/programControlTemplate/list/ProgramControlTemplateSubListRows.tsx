import { i18n } from 'src/i18n';
import Checkbox from '@mui/material/Checkbox';
import DataTableBodyCell from 'src/mui/shared/Tables/DataTable/DataTableBodyCell';
import MDTypography from 'src/mui/components/MDTypography';
import TableRow from '@mui/material/TableRow';

const ProgramControlTemplateSubListRows = ({
  checkedIds,
  doToggleOneSelectedControl,
  requirementId,
  rows,
  sidenavColor,
}) => {
  const hasRows = rows && !!rows.length;
  return (
    <>
      {!hasRows && (
        <TableRow>
          <DataTableBodyCell> </DataTableBodyCell>
          <DataTableBodyCell align="center" colSpan={100}>
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
      {hasRows &&
        rows.map((row) => (
          <TableRow key={`control-${row.id}`}>
            <DataTableBodyCell
              padding="checkbox"
              align="right"
            >
              <Checkbox
                color={sidenavColor}
                checked={checkedIds.includes(row.id)}
                onChange={() =>
                  doToggleOneSelectedControl(
                    requirementId,
                    row.id,
                  )
                }
                size="small"
              />
            </DataTableBodyCell>
            <DataTableBodyCell colSpan={2}>
              {row.name}
            </DataTableBodyCell>
            <DataTableBodyCell colSpan={2}>
              {row.description}
            </DataTableBodyCell>
          </TableRow>
        ))}
    </>
  );
};

export default ProgramControlTemplateSubListRows;

import { i18n } from 'src/i18n';
import { toSafeLimitedValue } from 'src/modules/utils';
import { useState } from 'react';
import config from 'src/config';
import DataTableBodyCell from 'src/mui/shared/Tables/DataTable/DataTableBodyCell';
import Empty from 'src/view/shared/components/Empty';
import GppMaybeIcon from '@mui/icons-material/GppMaybe';
import IconButton from '@mui/material/IconButton';
import MDBox from 'src/mui/components/MDBox';
import MDButton from 'src/mui/components/MDButton';
import MDTypography from 'src/mui/components/MDTypography';
import ProgramControlSubListTable from 'src/view/programControl/list/ProgramControlSubListTable';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';

const ProgramRequirementSubListRows = ({
  handleOpenCreateRisk,
  hasPermissionToCreateRisk,
  rows,
  sidenavColor,
}) => {
  const hasRows = rows && !!rows.length;
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
  return (
    <>
      {!hasRows && (
        <TableRow>
          <DataTableBodyCell align="center" colSpan={100}>
            <MDTypography
              align="center"
              color="inherit"
              fontWeight="regular"
              variant="body2"
            >
              {i18n('table.noRequirements')}
            </MDTypography>
          </DataTableBodyCell>
        </TableRow>
      )}
      {hasRows &&
        rows.slice(0, limit).map((row) => (
          <Empty key={`requirement-${row.id}`}>
            <TableRow>
              <DataTableBodyCell> </DataTableBodyCell>
              <DataTableBodyCell>
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
              </DataTableBodyCell>
              <DataTableBodyCell colSpan={2}>
                <MDTypography
                  color="inherit"
                  fontWeight="bold"
                  variant="body2"
                >
                  {i18n(
                    'entities.program.fields.requirementID',
                    row.requirementID,
                  )}
                </MDTypography>
              </DataTableBodyCell>
              <DataTableBodyCell colSpan={100}>
                <MDBox
                  alignItems="center"
                  color="inherit"
                  display="flex"
                  gap={0.8}
                >
                  <MDTypography
                    color="inherit"
                    fontWeight="bold"
                    variant="body2"
                  >
                    {row.name}
                  </MDTypography>
                </MDBox>
              </DataTableBodyCell>
            </TableRow>
            <TableRow>
              <DataTableBodyCell colSpan={2}>
                {' '}
              </DataTableBodyCell>
              <DataTableBodyCell colSpan={100} p={0}>
                <ProgramControlSubListTable
                  handleOpenCreateRisk={
                    handleOpenCreateRisk
                  }
                  rows={row.controls ?? []}
                />
              </DataTableBodyCell>
            </TableRow>
          </Empty>
        ))}
      {hasRows && limit < rows.length && (
        <TableRow>
          <DataTableBodyCell align="center" colSpan={100}>
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
    </>
  );
};

export default ProgramRequirementSubListRows;

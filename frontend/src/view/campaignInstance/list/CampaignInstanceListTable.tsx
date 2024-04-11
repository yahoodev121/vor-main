import { DEFAULT_MOMENT_FORMAT_DATE_ONLY } from 'src/config/common';
import { i18n } from 'src/i18n';
import { Link } from 'react-router-dom';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { TableContainer } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import actions from 'src/modules/campaignInstance/list/campaignInstanceListActions';
import authSelectors from 'src/modules/auth/authSelectors';
import CampaignStatusViewItem from 'src/view/campaign/view/CampaignStatusViewItem';
import ClientListItem from 'src/view/client/list/ClientListItem';
import DataTableBodyCell from 'src/mui/shared/Tables/DataTable/DataTableBodyCell';
import DataTableHeadCell from 'src/mui/shared/Tables/DataTable/DataTableHeadCell';
import IconButton from '@mui/material/IconButton';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import moment from 'moment';
import Pagination from 'src/view/shared/table/Pagination';
import ProgressStatus from 'src/view/shared/components/ProgressStatus';
import SearchIcon from '@mui/icons-material/Search';
import selectors from 'src/modules/campaignInstance/list/campaignInstanceListSelectors';
import Spinner from 'src/view/shared/Spinner';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import UserGroupItem from 'src/view/user/list/UserGroupItem';
import UserListItem from 'src/view/user/list/UserListItem';
import VendorListItem from 'src/view/vendor/list/VendorListItem';

function CampaignInstanceListTable(props) {
  const { record } = props;
  const { sidenavColor } = selectMuiSettings();
  const dispatch = useDispatch();

  const hasAdminRole = useSelector(
    authSelectors.selectHasAdminRole,
  );

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
                onClick={() => doChangeSort('reference')}
                sorted={
                  sorter.field === 'reference'
                    ? sorter.order
                    : 'none'
                }
                width="0"
                noWrap
              >
                {i18n(
                  'entities.campaignInstance.fields.reference',
                )}
              </DataTableHeadCell>
              {hasAdminRole && (
                <>
                  {record?.audience === 'Vendors' && (
                    <DataTableHeadCell sorted={false}>
                      {i18n(
                        'entities.campaignInstance.fields.vendor',
                      )}
                    </DataTableHeadCell>
                  )}
                  {record?.audience === 'Clients' && (
                    <DataTableHeadCell sorted={false}>
                      {i18n(
                        'entities.campaignInstance.fields.client',
                      )}
                    </DataTableHeadCell>
                  )}
                </>
              )}
              <DataTableHeadCell
                onClick={() => doChangeSort('name')}
                sorted={
                  sorter.field === 'name'
                    ? sorter.order
                    : 'none'
                }
              >
                {i18n(
                  'entities.campaignInstance.fields.name',
                )}
              </DataTableHeadCell>
              <DataTableHeadCell
                onClick={() => doChangeSort('status')}
                sorted={
                  sorter.field === 'status'
                    ? sorter.order
                    : 'none'
                }
              >
                {i18n(
                  'entities.campaignInstance.fields.status',
                )}
              </DataTableHeadCell>
              <DataTableHeadCell
                onClick={() => doChangeSort('progress')}
                sorted={
                  sorter.field === 'progress'
                    ? sorter.order
                    : 'none'
                }
                width="150px"
              >
                {i18n(
                  'entities.campaignInstance.fields.progress',
                )}
              </DataTableHeadCell>
              {hasAdminRole && (
                <DataTableHeadCell
                  onClick={() => doChangeSort('scores')}
                  sorted={
                    sorter.field === 'scores'
                      ? sorter.order
                      : 'none'
                  }
                  width="150px"
                >
                  {i18n(
                    'entities.campaignInstance.fields.score',
                  )}
                </DataTableHeadCell>
              )}
              <DataTableHeadCell sorted={false}>
                {i18n(
                  'entities.campaignInstance.fields.users',
                )}
              </DataTableHeadCell>
              <DataTableHeadCell
                onClick={() =>
                  doChangeSort('submittedDate')
                }
                sorted={
                  sorter.field === 'submittedDate'
                    ? sorter.order
                    : 'none'
                }
              >
                {i18n(
                  'entities.campaignInstance.fields.submittedDate',
                )}
              </DataTableHeadCell>
              <DataTableHeadCell sorted={false}>
                {i18n(
                  'entities.campaignInstance.fields.submittedBy',
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
                          to={`/${
                            record
                              ? `campaign/${record.id}`
                              : 'campaign-instance'
                          }/${row.id}`}
                        >
                          <SearchIcon />
                        </IconButton>
                      </Tooltip>
                    </MDBox>
                  </DataTableBodyCell>
                  <DataTableBodyCell align="right">
                    {row.reference}
                  </DataTableBodyCell>
                  {hasAdminRole && (
                    <>
                      {record?.audience === 'Vendors' && (
                        <DataTableBodyCell>
                          <VendorListItem
                            value={row.vendor}
                          />
                        </DataTableBodyCell>
                      )}
                      {record?.audience === 'Clients' && (
                        <DataTableBodyCell>
                          <ClientListItem
                            value={row.client}
                          />
                        </DataTableBodyCell>
                      )}
                    </>
                  )}
                  <DataTableBodyCell>
                    {row.name}
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    <CampaignStatusViewItem
                      value={row.status}
                    />
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    <ProgressStatus
                      completed={row.progress}
                      title={row.status}
                    />
                  </DataTableBodyCell>
                  {hasAdminRole && (
                    <DataTableBodyCell align="right">
                      <ProgressStatus
                        completed={row.score}
                        title={i18n(
                          'entities.campaignInstance.fields.score',
                        )}
                      />
                    </DataTableBodyCell>
                  )}
                  <DataTableBodyCell>
                    <UserGroupItem
                      key={`user-group-${row.id}`}
                      value={row.users}
                    />
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    {row.submittedDate
                      ? moment(row.submittedDate).format(
                          DEFAULT_MOMENT_FORMAT_DATE_ONLY,
                        )
                      : null}
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    <UserListItem value={row.submittedBy} />
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
    </>
  );
}

export default CampaignInstanceListTable;

import { DEFAULT_MOMENT_FORMAT_DATE_ONLY } from 'src/config/common';
import { i18n } from 'src/i18n';
import { Link } from 'react-router-dom';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { TableContainer } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import actions from 'src/modules/policy/versions/policyVersionsActions';
import ConfirmModal from 'src/view/shared/modals/ConfirmModal';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DataTableBodyCell from 'src/mui/shared/Tables/DataTable/DataTableBodyCell';
import DataTableHeadCell from 'src/mui/shared/Tables/DataTable/DataTableHeadCell';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import moment from 'moment';
import Pagination from 'src/view/shared/table/Pagination';
import policyDestroyActions from 'src/modules/policy/destroy/policyDestroyActions';
import policySelectors from 'src/modules/policy/policySelectors';
import SearchIcon from '@mui/icons-material/Search';
import selectors from 'src/modules/policy/versions/policyVersionsSelectors';
import Spinner from 'src/view/shared/Spinner';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TagListItem from 'src/view/tag/list/TagListItem';
import Tooltip from '@mui/material/Tooltip';
import UserListItem from 'src/view/user/list/UserListItem';
import VisibilityIcon from '@mui/icons-material/Visibility';

function PolicyVersions(props) {
  const { sidenavColor } = selectMuiSettings();
  const dispatch = useDispatch();
  const [recordIdToDestroy, setRecordIdToDestroy] =
    useState(null);
  const [recordIdToClone, setRecordIdToClone] =
    useState(null);
  const [recordIdToPublish, setRecordIdToPublish] =
    useState(null);

  const findLoading = useSelector(selectors.selectLoading);

  const loading = findLoading;

  const rows = useSelector(selectors.selectRows);
  const pagination = useSelector(
    selectors.selectPagination,
  );
  const hasRows = useSelector(selectors.selectHasRows);
  const sorter = useSelector(selectors.selectSorter);
  const hasPermissionToEdit = useSelector(
    policySelectors.selectPermissionToEdit,
  );
  const hasPermissionToDestroy = useSelector(
    policySelectors.selectPermissionToDestroy,
  );

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

  const doOpenDestroyConfirmModal = (id) => {
    setRecordIdToDestroy(id);
  };

  const doCloseDestroyConfirmModal = () => {
    setRecordIdToDestroy(null);
  };

  const doOpenCloneConfirmModal = (policy, version) => {
    setRecordIdToClone({ policy, version });
  };

  const doCloseCloneConfirmModal = () => {
    setRecordIdToClone(null);
  };

  const doOpenPublishConfirmModal = (policy, version) => {
    setRecordIdToPublish({ policy, version });
  };

  const doClosePublishConfirmModal = () => {
    setRecordIdToPublish(null);
  };

  const doDestroy = (policy) => {
    doCloseDestroyConfirmModal();

    dispatch(policyDestroyActions.doDestroy(policy));
  };

  const doPublish = (params) => {
    doClosePublishConfirmModal();

    dispatch(
      actions.doPublish(params.policy, params.version),
    );
  };

  const doClone = (params) => {
    doCloseCloneConfirmModal();

    dispatch(
      actions.doClone(params.policy, params.version),
    );
  };

  useEffect(() => {
    dispatch(actions.doFetch(props.policy));
  }, [dispatch]);

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
                onClick={() => doChangeSort('version')}
                sorted={
                  sorter.field === 'version'
                    ? sorter.order
                    : 'none'
                }
                width="0"
              >
                {i18n('entities.policy.fields.version')}
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
                {i18n('entities.policy.fields.name')}
              </DataTableHeadCell>
              <DataTableHeadCell
                onClick={() => doChangeSort('type')}
                sorted={
                  sorter.field === 'type'
                    ? sorter.order
                    : 'none'
                }
                width="0"
              >
                {i18n('entities.policy.fields.type')}
              </DataTableHeadCell>
              <DataTableHeadCell
                onClick={() =>
                  doChangeSort('lastPublishedDate')
                }
                sorted={
                  sorter.field === 'lastPublishedDate'
                    ? sorter.order
                    : 'none'
                }
                width="0"
              >
                {i18n(
                  'entities.policy.fields.lastPublishedDate',
                )}
              </DataTableHeadCell>
              <DataTableHeadCell sorted={false}>
                {i18n('entities.policy.fields.publishedBy')}
              </DataTableHeadCell>
              <DataTableHeadCell sorted={false}>
                {i18n('entities.policy.fields.tags')}
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
                          to={`/policy/${row.policy}/${row.version}`}
                          disabled={
                            !props.isEditing &&
                            row.version === props.version
                          }
                        >
                          <SearchIcon />
                        </IconButton>
                      </Tooltip>
                      {hasPermissionToEdit && (
                        <Tooltip
                          disableInteractive
                          title={i18n('common.edit')}
                        >
                          <span>
                            <IconButton
                              size="small"
                              color={sidenavColor}
                              component={Link}
                              to={`/policy/${row.policy}/${row.version}/edit`}
                              disabled={
                                Boolean(
                                  row.lastPublishedDate,
                                ) ||
                                (props.isEditing &&
                                  row.version ===
                                    props.version)
                              }
                            >
                              <EditIcon />
                            </IconButton>
                          </span>
                        </Tooltip>
                      )}
                      {hasPermissionToDestroy && (
                        <Tooltip
                          disableInteractive
                          title={i18n('common.destroy')}
                        >
                          <span>
                            <IconButton
                              size="small"
                              color={sidenavColor}
                              onClick={() =>
                                doOpenDestroyConfirmModal(
                                  row.policy,
                                )
                              }
                              disabled={
                                props.isEditing ||
                                Boolean(
                                  row.lastPublishedDate,
                                )
                              }
                            >
                              <DeleteIcon />
                            </IconButton>
                          </span>
                        </Tooltip>
                      )}
                      {hasPermissionToEdit && (
                        <>
                          <Tooltip
                            disableInteractive
                            title={i18n('common.clone')}
                          >
                            <span>
                              <IconButton
                                size="small"
                                color={sidenavColor}
                                onClick={() =>
                                  doOpenCloneConfirmModal(
                                    row.policy,
                                    row.version,
                                  )
                                }
                                disabled={
                                  !Boolean(
                                    row.lastPublishedDate,
                                  )
                                }
                              >
                                <ContentCopyIcon />
                              </IconButton>
                            </span>
                          </Tooltip>
                          <Tooltip
                            disableInteractive
                            title={i18n('common.publish')}
                          >
                            <span>
                              <IconButton
                                size="small"
                                color={sidenavColor}
                                onClick={() =>
                                  doOpenPublishConfirmModal(
                                    row.policy,
                                    row.version,
                                  )
                                }
                                disabled={Boolean(
                                  row.lastPublishedDate,
                                )}
                              >
                                <VisibilityIcon />
                              </IconButton>
                            </span>
                          </Tooltip>
                        </>
                      )}
                    </MDBox>
                  </DataTableBodyCell>
                  <DataTableBodyCell align="right">
                    {row.version}
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    {row.name}
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    {row.type &&
                      i18n(
                        `entities.policy.enumerators.type.${row.type}`,
                      )}
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    <MDTypography
                      fontSize="inherit"
                      fontWeight="inherit"
                      color={
                        row.lastPublishedDate
                          ? moment().diff(
                              moment(row.lastPublishedDate),
                              'year',
                            ) >= 1
                            ? 'primary'
                            : 'success'
                          : 'text'
                      }
                    >
                      {row.lastPublishedDate
                        ? moment(
                            row.lastPublishedDate,
                          ).format(
                            DEFAULT_MOMENT_FORMAT_DATE_ONLY,
                          )
                        : 'Not Published'}
                    </MDTypography>
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    <UserListItem value={row.publishedBy} />
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    <TagListItem value={row.tags} />
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

      {recordIdToClone && (
        <ConfirmModal
          title={i18n('common.areYouSure')}
          onConfirm={() => doClone(recordIdToClone)}
          onClose={() => doCloseCloneConfirmModal()}
          okText={i18n('common.yes')}
          cancelText={i18n('common.no')}
        />
      )}

      {recordIdToPublish && (
        <ConfirmModal
          title={i18n('common.areYouSure')}
          onConfirm={() => doPublish(recordIdToPublish)}
          onClose={() => doClosePublishConfirmModal()}
          okText={i18n('common.yes')}
          cancelText={i18n('common.no')}
        />
      )}
    </>
  );
}

export default PolicyVersions;

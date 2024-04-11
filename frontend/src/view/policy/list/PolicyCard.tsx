import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Menu,
  Tooltip,
} from '@mui/material';
import {
  DEFAULT_MOMENT_FORMAT,
  DEFAULT_MOMENT_FORMAT_DATE_ONLY,
} from 'src/config/common';
import { extractsDomain } from 'src/modules/utils';
import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';
import { POLICY_TYPES } from 'src/modules/policy/policyEnumerators';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import AssignmentIcon from '@mui/icons-material/Assignment';
import authSelectors from 'src/modules/auth/authSelectors';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import CardButtonActions from 'src/view/shared/components/CardButtonActions';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import EditIcon from '@mui/icons-material/Edit';
import GppMaybeIcon from '@mui/icons-material/GppMaybe';
import LazyLoad from 'react-lazy-load';
import MaterialLink from '@mui/material/Link';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import moment from 'moment';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import NotificationItem from 'src/mui/shared/Items/NotificationItem';
import PolicyFavoriteService from 'src/modules/policyFavorite/policyFavoriteService';
import policyListActions from 'src/modules/policy/list/policyListActions';
import policySelectors from 'src/modules/policy/policySelectors';
import PolicyService from 'src/modules/policy/policyService';
import ReactFileIcon from 'src/view/shared/view/ReactFileIcon';
import riskSelectors from 'src/modules/risk/riskSelectors';
import SearchIcon from '@mui/icons-material/Search';
import TagAutocompleteForm from 'src/view/tag/autocomplete/TagAutocompleteForm';
import taskSelectors from 'src/modules/task/taskSelectors';

function PolicyCard(props) {
  const { sidenavColor } = selectMuiSettings();

  const dispatch = useDispatch();

  const {
    row,
    doOpenDestroyConfirmModal,
    handleOpenCreateTask,
    handleOpenCreateRisk,
  } = props;

  const currentTenant = useSelector(
    authSelectors.selectCurrentTenant,
  );

  const hasPermissionCreateTask = useSelector(
    taskSelectors.selectPermissionToCreate,
  );
  const hasPermissionCreateRisk = useSelector(
    riskSelectors.selectPermissionToCreate,
  );

  const hasPermissionToEdit = useSelector(
    policySelectors.selectPermissionToEdit,
  );

  const hasPermissionToDestroy = useSelector(
    policySelectors.selectPermissionToDestroy,
  );

  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleViewPolicy = () => {
    getHistory().push(`/policy/${row.id}`);
  };

  const handleEditPolicy = () => {
    getHistory().push(`/policy/${row.id}/edit`);
  };

  const handleFavoriteToggle = () => {
    const togglePromise = new Promise(async (resolve) => {
      resolve(await PolicyFavoriteService.toggle(row.id));
    });

    togglePromise.then(() => {
      dispatch(policyListActions.doFetchCurrentFilter());
    });
  };

  return (
    <LazyLoad>
      <Card sx={{ overflow: 'hidden' }}>
        <MDBox topBorder>
          <MDTypography
            variant="button"
            fontWeight="bold"
            color="secondary"
            textAlign="right"
            pt={0.8}
            px={1.6}
          >{`v${row.version}`}</MDTypography>
          <CardHeader
            action={
              row.tenant === currentTenant.id && (
                <>
                  <IconButton onClick={handleOpenMenu}>
                    <MoreVertIcon />
                  </IconButton>
                  <Tooltip
                    disableInteractive
                    title={i18n(
                      'entities.policy.tooltips.addBookmark',
                    )}
                  >
                    <span>
                      <IconButton
                        onClick={handleFavoriteToggle}
                        color={
                          row.favorite
                            ? 'warning'
                            : 'default'
                        }
                      >
                        {row.favorite ? (
                          <BookmarkIcon />
                        ) : (
                          <BookmarkBorderIcon />
                        )}
                      </IconButton>
                    </span>
                  </Tooltip>
                  <Menu
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleCloseMenu}
                  >
                    <NotificationItem
                      onClick={handleViewPolicy}
                      icon={<SearchIcon />}
                      title={i18n('common.view')}
                    />
                    {hasPermissionToEdit &&
                      !row.lastPublishedDate && (
                        <NotificationItem
                          onClick={handleEditPolicy}
                          icon={<EditIcon />}
                          title={i18n('common.edit')}
                        />
                      )}
                    {hasPermissionToDestroy && (
                      <NotificationItem
                        onClick={() => {
                          doOpenDestroyConfirmModal(row.id);
                        }}
                        icon={<DeleteIcon />}
                        title={i18n('common.destroy')}
                      />
                    )}
                  </Menu>
                </>
              )
            }
            title={
              <MDTypography
                variant="h5"
                fontWeight="regular"
              >
                {row.name}
              </MDTypography>
            }
            sx={{
              pt: 0,
            }}
          />
          <CardContent sx={{ py: 0 }}>
            {Boolean(row.description) &&
              row.description.trim() !== '' && (
                <MDTypography
                  variant="body2"
                  color="text"
                  fontWeight="regular"
                  whiteSpace="pre-line"
                  mb={0.8}
                >
                  {row.description}
                </MDTypography>
              )}
            <MDBox
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
              lineHeight={0}
              mt={1.6}
            >
              {row.type === POLICY_TYPES.DOCUMENT && (
                <>
                  <ReactFileIcon
                    filename={row.attachment[0].name}
                  />
                  {Boolean(row.lastPublishedDate) ? (
                    <MaterialLink
                      href={row.attachment[0].downloadUrl}
                    >
                      <MDTypography
                        variant="body2"
                        color={sidenavColor}
                        fontWeight="regular"
                        lineHeight={1}
                        display="flex"
                        alignItems="center"
                        my={0.8}
                      >
                        <DownloadIcon fontSize="medium" />
                        {i18n('common.download')}
                      </MDTypography>
                    </MaterialLink>
                  ) : (
                    <MDTypography
                      variant="body2"
                      color="secondary"
                      fontWeight="regular"
                      lineHeight={1}
                      display="flex"
                      alignItems="center"
                      my={0.8}
                    >
                      <DownloadIcon fontSize="medium" />
                      {i18n('common.download')}
                    </MDTypography>
                  )}
                </>
              )}
              {row.type === POLICY_TYPES.LINK && (
                <MDTypography
                  variant="body2"
                  color={sidenavColor}
                  fontWeight="regular"
                  mb={1.6}
                >
                  <MaterialLink
                    href={row.link}
                    target="_blank"
                    underline="hover"
                  >
                    {extractsDomain(row.link)}
                  </MaterialLink>
                </MDTypography>
              )}
              <MDTypography
                variant="body2"
                fontWeight="regular"
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
                lineHeight={1}
              >
                {row.lastPublishedDate
                  ? `${i18n(
                      'entities.policy.fields.publishedOn',
                    )} ${moment(
                      row.lastPublishedDate,
                    ).format(
                      DEFAULT_MOMENT_FORMAT_DATE_ONLY,
                    )}`
                  : 'Never Published'}
              </MDTypography>
            </MDBox>
          </CardContent>
          <CardActions disableSpacing>
            <MDBox p={0.8} width="100%">
              <TagAutocompleteForm
                name="tags"
                id={row.id}
                tags={row.tags}
                handleService={PolicyService.tags}
              />
            </MDBox>
          </CardActions>
          <CardButtonActions
            buttons={[
              hasPermissionCreateTask && {
                label: i18n(
                  'entities.policy.tooltips.createTask',
                ),
                icon: <AssignmentIcon />,
                onClick: () =>
                  handleOpenCreateTask([
                    {
                      id: row.id,
                      name: row.name,
                    },
                  ]),
              },
              hasPermissionCreateRisk && {
                label: i18n(
                  'entities.policy.tooltips.createRisk',
                ),
                icon: <GppMaybeIcon />,
                onClick: () =>
                  handleOpenCreateRisk([
                    {
                      id: row.id,
                      name: row.name,
                    },
                  ]),
              },
            ].filter(Boolean)}
          />
        </MDBox>
      </Card>
    </LazyLoad>
  );
}

export default PolicyCard;

import { Grid } from '@mui/material';
import { hasBanRoles4Group } from 'src/modules/user/userEnumerators';
import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import actions from 'src/modules/user/form/userFormActions';
import Authentication from 'src/view/auth/profile/Authentication';
import authSelectors from 'src/modules/auth/authSelectors';
import BasicInfo from 'src/view/auth/profile/BasicInfo';
import BlockIcon from '@mui/icons-material/Block';
import ChangePassword from 'src/view/auth/profile/ChangePassword';
import CloseIcon from '@mui/icons-material/Close';
import ConfirmModal from 'src/view/shared/modals/ConfirmModal';
import DeleteAccount from 'src/view/auth/profile/DeleteAccount';
import EditIcon from '@mui/icons-material/Edit';
import MDBox from 'src/mui/components/MDBox';
import MDButton from 'src/mui/components/MDButton';
import MDTypography from 'src/mui/components/MDTypography';
import Risks from 'src/view/auth/profile/Risks';
import riskSelectors from 'src/modules/risk/riskSelectors';
import selectors from 'src/modules/user/form/userFormSelectors';
import Sessions from 'src/view/auth/profile/Sessions';
import SideNav from 'src/view/auth/profile/SideNav';
import slug from 'slug';
import Spinner from 'src/view/shared/Spinner';
import Tasks from 'src/view/auth/profile/Tasks';
import taskSelectors from 'src/modules/task/taskSelectors';
import UserGroups from 'src/view/auth/profile/UserGroups';
import userSelectors from 'src/modules/user/userSelectors';
import VerifiedIcon from '@mui/icons-material/Verified';

const sideNavItems = ({
  hasUserDestroy = true,
  hasUserGroupEdit = false,
  isMe = false,
  readOnly = false,
}) =>
  [
    {
      id: slug('basic-info'),
      icon: 'receipt_long',
      label: i18n('profile.sideNavItems.basicInfo'),
      Component: BasicInfo,
    },
    hasUserGroupEdit && {
      id: slug('user-groups'),
      icon: 'group',
      label: i18n('profile.sideNavItems.userGroups'),
      Component: UserGroups,
    },
    isMe &&
      !readOnly && {
        id: slug('change-password'),
        icon: 'lock',
        label: i18n('profile.sideNavItems.changePassword'),
        Component: ChangePassword,
      },
    isMe && {
      id: slug('2fa'),
      icon: 'security',
      label: i18n(
        'profile.sideNavItems.twoFactorAuthentication',
      ),
      Component: Authentication,
    },
    {
      id: slug('sessions'),
      icon: 'settings_applications',
      label: i18n('profile.sideNavItems.sessions'),
      Component: Sessions,
    },
    !isMe &&
      hasUserDestroy && {
        id: slug('delete-account'),
        icon: 'delete',
        label: i18n('profile.sideNavItems.deleteAccount'),
        Component: DeleteAccount,
      },
  ].filter(Boolean);

const ProfileFormPage = (props) => {
  const { onCancel, onEdit, readOnly, title } = props;

  const { fixedNavbar, sidenavColor } = selectMuiSettings();

  const dispatch = useDispatch();

  const [dispatched, setDispatched] = useState(false);

  const initLoading = useSelector(
    selectors.selectInitLoading,
  );

  const saveLoading = useSelector(
    selectors.selectSaveLoading,
  );

  const destroyLoading = useSelector(
    selectors.selectDestroyLoading,
  );

  const disabled =
    initLoading || saveLoading || destroyLoading;

  const currentUser = useSelector(
    authSelectors.selectCurrentUser,
  );

  const user = useSelector(selectors.selectUser);

  const match = useRouteMatch();

  const userId = match.params.id ?? currentUser.id;

  const hasUserEdit = useSelector(
    userSelectors.selectPermissionToEdit,
  );

  const hasUserDestroy = useSelector(
    userSelectors.selectPermissionToDestroy,
  );

  const hasUserGroupEdit = useSelector(
    userSelectors.selectPermissionToEdit,
  );

  const hasTaskRead = useSelector(
    taskSelectors.selectPermissionToRead,
  );

  const hasRiskRead = useSelector(
    riskSelectors.selectPermissionToRead,
  );

  const doReloadUserInfo = () =>
    dispatch(actions.doInit(userId));

  const [confirmAction, setConfirmAction] = useState(null);

  const onActivate = () =>
    hasUserEdit &&
    dispatch(actions.doActivate(userId, doReloadUserInfo));

  const onDeactivate = () =>
    hasUserEdit &&
    dispatch(
      actions.doDeactivate(userId, doReloadUserInfo),
    );

  const isMe = userId === currentUser.id;

  const navItems = sideNavItems({
    hasUserDestroy,
    hasUserGroupEdit,
    isMe,
    readOnly,
  });

  const [useUserGroups, setUseUserGroups] = useState(false);

  useEffect(
    () => setUseUserGroups(!hasBanRoles4Group(user?.roles)),
    [user],
  );

  const useFeatures = {
    'user-groups': {
      status: useUserGroups,
      update: setUseUserGroups,
    },
  };

  const setUseFeatures = (states) =>
    navItems.forEach(
      ({ id }) =>
        Boolean(useFeatures[id]) &&
        useFeatures[id].update.call(null, states[id]),
    );

  const fnFeatureFilter = ({ id, Component }) =>
    !!Component &&
    Boolean(
      useFeatures[id] === undefined
        ? true
        : useFeatures[id].status,
    );

  useEffect(() => {
    doReloadUserInfo();
    setDispatched(true);
  }, [dispatch, userId]);

  return (
    <>
      <MDBox
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        p={2.4}
      >
        <MDTypography variant="h3">
          {title ?? i18n('profile.title')}
        </MDTypography>
        <MDBox display="flex" gap={0.8}>
          {hasUserEdit && (
            <>
              {onEdit && (
                <MDButton
                  color={sidenavColor}
                  disabled={disabled}
                  onClick={() => onEdit()}
                  size="small"
                  startIcon={<EditIcon />}
                  type="button"
                  variant="contained"
                >
                  {i18n('common.edit')}
                </MDButton>
              )}
              {onCancel && (
                <MDButton
                  color={sidenavColor}
                  disabled={disabled}
                  onClick={() => onCancel()}
                  size="small"
                  startIcon={<CloseIcon />}
                  type="button"
                  variant="outlined"
                >
                  {i18n('common.cancel')}
                </MDButton>
              )}
              {!isMe && (
                <>
                  <MDButton
                    color="success"
                    disabled={
                      disabled || user?.status === 'active'
                    }
                    onClick={() =>
                      setConfirmAction({
                        callback: onActivate,
                      })
                    }
                    size="small"
                    startIcon={<VerifiedIcon />}
                    type="button"
                    variant="gradient"
                  >
                    {i18n('common.activate')}
                  </MDButton>
                  <MDButton
                    color="error"
                    disabled={
                      disabled ||
                      user?.status === 'inactive'
                    }
                    onClick={() =>
                      setConfirmAction({
                        callback: onDeactivate,
                      })
                    }
                    size="small"
                    startIcon={<BlockIcon />}
                    type="button"
                    variant="gradient"
                  >
                    {i18n('common.deactivate')}
                  </MDButton>
                </>
              )}
            </>
          )}
        </MDBox>
      </MDBox>
      <Grid container spacing={1.6}>
        <Grid item xs={12} lg={3}>
          <MDBox
            position="sticky"
            top={fixedNavbar ? '70px' : 0}
          >
            <Grid container spacing={1.6}>
              <Grid item xs={12}>
                <SideNav
                  items={navItems.filter(fnFeatureFilter)}
                />
              </Grid>
              {dispatched && !initLoading && hasTaskRead && (
                <Grid item xs={12}>
                  <Tasks id="tasks" user={user} />
                </Grid>
              )}
              {dispatched && !initLoading && hasRiskRead && (
                <Grid item xs={12}>
                  <Risks id="risks" user={user} />
                </Grid>
              )}
            </Grid>
          </MDBox>
        </Grid>
        <Grid item xs={12} lg={9}>
          {initLoading && <Spinner />}
          {dispatched && !initLoading && (
            <Grid container spacing={1.6}>
              {navItems
                .filter(fnFeatureFilter)
                .map(({ id, Component }, index) => (
                  <Grid
                    key={`profile-section-${index}`}
                    xs={12}
                    item
                  >
                    <Component
                      destroyLoading={destroyLoading}
                      id={id}
                      readOnly={readOnly}
                      saveLoading={saveLoading}
                      user={user}
                      setUseFeatures={setUseFeatures}
                    />
                  </Grid>
                ))}
            </Grid>
          )}
        </Grid>
      </Grid>
      {confirmAction && (
        <ConfirmModal
          onConfirm={() =>
            confirmAction.callback() &&
            setConfirmAction(null)
          }
          onClose={() => setConfirmAction(null)}
        />
      )}
    </>
  );
};

export default ProfileFormPage;

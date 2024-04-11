import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';
import { Menu, IconButton, Icon } from '@mui/material';
import { navbarIconButton } from 'src/mui/shared/Navbars/DashboardNavbar/styles';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import authActions from 'src/modules/auth/authActions';
import authSelectors from 'src/modules/auth/authSelectors';
import config from 'src/config';
import NotificationItem from 'src/mui/shared/Items/NotificationItem';
import PermissionChecker from 'src/modules/auth/permissionChecker';
import Permissions from 'src/security/permissions';

import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

// Declaring prop types for Header
interface Props {
  absolute?: boolean;
  light?: boolean;
  isMini?: boolean;
}

const AccountManagmentMenu = ({
  absolute,
  light,
  isMini,
}: Props): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState(null);

  const dispatch = useDispatch();

  const currentTenant = useSelector(
    authSelectors.selectCurrentTenant,
  );

  const currentUser = useSelector(
    authSelectors.selectCurrentUser,
  );

  const permissionChecker = new PermissionChecker(
    currentTenant,
    currentUser,
  );

  const doAccessWorkspaces = permissionChecker.match(
    Permissions.values.tenantRead,
  );

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const doSignout = () => {
    dispatch(authActions.doSignout());
  };

  const doNavigateToUser = () => {
    getHistory().push('/user');
  };
  const doNavigateToRole = () => {
    getHistory().push('/role');
  };
  
  const doNavigateToSubscription = ()  => {
    getHistory().push('/plan');
  }
  const doNavigateToUsergroup = () =>{
    getHistory().push('/user-group');
  }

  const doNavigateToTenants = () => {
    getHistory().push('/settings');
  };

  const doNavigateToWorkspace = () => {
    getHistory().push('/tenant');
  };

  const { transparentNavbar, darkMode } =
    selectMuiSettings();

  // Styles for the navbar icons
  const iconsStyle = ({
    palette: { dark, white, text },
    functions: { rgba },
  }: {
    palette: any;
    functions: any;
  }) => ({
    color: () => {
      let colorValue =
        light || darkMode ? white.main : dark.main;

      if (transparentNavbar && !light) {
        colorValue = darkMode
          ? rgba(text.main, 0.6)
          : text.main;
      }

      return colorValue;
    },
  });

  return (
    <>
      <IconButton
        onClick={handleClick}
        sx={navbarIconButton}
        size="small"
        color="inherit"
        disableRipple
      >
        <ManageAccountsIcon fontSize="medium" sx={iconsStyle}/>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <NotificationItem
          onClick={doNavigateToUser}
          icon={<Icon>person_outline</Icon>}
          title={i18n('auth.users')}
        />
        <NotificationItem
          onClick={doNavigateToUsergroup}
          icon={<Icon>group</Icon>}
          title={i18n('user.fields.userGroups')}
        />
        <NotificationItem
          onClick={doNavigateToRole}
          icon={<Icon>badge</Icon>}
          title={i18n('role.title')}
        />
        <NotificationItem
          onClick={doNavigateToTenants}
          icon={<Icon>room_preferences</Icon>}
          title={i18n('tenant.name')}
        />
        
        {doAccessWorkspaces &&
          ['multi', 'multi-with-subdomain'].includes(
            config.tenantMode,
          ) && (
            <NotificationItem
              onClick={doNavigateToWorkspace}
              icon={<Icon>apps</Icon>}
              title={i18n('auth.tenants')}
            />
          )}


           <NotificationItem
              onClick={doNavigateToSubscription}
              icon={<Icon>credit_card_outlined</Icon>}
              title={i18n('plan.menu')}
            />

          {doAccessWorkspaces &&
          config.apiDocumentationUrl && (
            <NotificationItem
              outlink
              href={config.apiDocumentationUrl}
              icon={<Icon>code</Icon>}
              title={i18n('api.menu')}
              target="_blank"
              rel="noopener noreferrer"
            />
          )}
        {/* <NotificationItem
          onClick={doNavigateToPasswordChange}
          icon={<Icon>lock</Icon>}
          title={i18n('auth.passwordChange.title')}
        /> */}
        {/* {doAccessWorkspaces &&
          ['multi', 'multi-with-subdomain'].includes(
            config.tenantMode,
          ) && (
            <NotificationItem
              onClick={doNavigateToTenants}
              icon={<Icon>apps</Icon>}
              title={i18n('auth.tenants')}
            />
          )}
        {doAccessWorkspaces &&
          config.apiDocumentationUrl && (
            <NotificationItem
              outlink
              href={config.apiDocumentationUrl}
              icon={<Icon>code</Icon>}
              title={i18n('api.menu')}
              target="_blank"
              rel="noopener noreferrer"
            />
          )} */}
        {/* <NotificationItem
          onClick={doSignout}
          icon={<Icon>exit_to_app</Icon>}
          title={i18n('auth.signout')}
        /> */}
      </Menu>
    </>
  );
};

// Declaring default props for UserMenu
AccountManagmentMenu.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

export default AccountManagmentMenu;

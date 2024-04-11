import { i18n } from 'src/i18n';
import { Avatar } from '@mui/material';
import { BrandLogo } from 'src/assets/resources';
import { findRoute, matchedRoutes } from 'src/view/routes';
import { getClientOrVendorName } from 'src/modules/utils';
import {
  menus,
  profileRoutes,
  tenantRoutes,
  userRoutes,
} from 'src/view/menus';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import authSelectors from 'src/modules/auth/authSelectors';
import Divider from '@mui/material/Divider';
import Icon from '@mui/material/Icon';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import muiActions from 'src/modules/mui/muiActions';
import PermissionChecker from 'src/modules/auth/permissionChecker';
import SidenavCollapse from 'src/mui/shared/Sidenav/SidenavCollapse';
import SidenavItem from 'src/mui/shared/Sidenav/SidenavItem';
import SidenavList from 'src/mui/shared/Sidenav/SidenavList';
import SidenavRoot from 'src/mui/shared/Sidenav/SidenavRoot';
import breakpoints from 'src/mui/assets/theme/base/breakpoints';

// Declaring props types for Sidenav
interface Props {
  brand?: string;
  brandName: string;
  [key: string]: any;
}

function Menu({
  brand,
  brandName,
  ...rest
}: Props): JSX.Element {
  const dispatch = useDispatch();

  const {
    miniSidenav4View,
    miniSidenav,
    transparentSidenav,
    whiteSidenav,
    sidenavColor,
    darkMode,
    miniSettingnavView
  } = selectMuiSettings();

  const color = sidenavColor;

  const [openCollapse, setOpenCollapse] = useState<
    boolean | string
  >(false);
  const [openNestedCollapse, setOpenNestedCollapse] =
    useState<boolean | string>(false);
  const location = useLocation();
  const { pathname } = location;
  const currentRoutes = matchedRoutes(pathname);
  const getCollapseName = () =>
    (currentRoutes.length &&
      currentRoutes[0].collapseName) ||
    false;
  const getItemParentName = () =>
    (currentRoutes.length &&
      currentRoutes[currentRoutes.length - 1]
        .collapseName) ||
    false;
  const collapseName = getCollapseName();
  const itemParentName = getItemParentName();

  let textColor:
    | 'primary'
    | 'secondary'
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
    | 'dark'
    | 'white'
    | 'inherit'
    | 'text'
    | 'purple'
    | 'light' = 'white';

  if (transparentSidenav || (whiteSidenav && !darkMode)) {
    textColor = 'dark';
  } else if (whiteSidenav && darkMode) {
    textColor = 'inherit';
  }

  const closeSidenav = () => {
    dispatch(muiActions.doMiniSidenav4View(true));
  };

  const userText = useSelector(
    authSelectors.selectCurrentUserNameOrEmailPrefix,
  );
  const userAvatar = useSelector(
    authSelectors.selectCurrentUserAvatar,
  );

  const currentTenant = useSelector(
    authSelectors.selectCurrentTenant,
  );
  const currentUser = useSelector(
    authSelectors.selectCurrentUser,
  );
  const hasAdminOrCustomRole = useSelector(
    authSelectors.selectHasAdminOrCustomRole,
  );

  const permissionChecker = new PermissionChecker(
    currentTenant,
    currentUser,
  );

  const match = (permission) => {
    return permissionChecker.match(permission);
  };

  const lockedForCurrentPlan = (permission) => {
    return permissionChecker.lockedForCurrentPlan(
      permission,
    );
  };

  const onClickSettings = () => {
    console.log('miniSettingnavView:', miniSettingnavView)
    dispatch(muiActions.doMiniSettingnavView(!miniSettingnavView));
  }

  useEffect(() => {
    setOpenCollapse(collapseName);
    setOpenNestedCollapse(itemParentName);
  }, [collapseName, itemParentName]);

  useEffect(() => {
    // A function that sets the mini state of the sidenav.
    function handleMiniSidenav() {
      dispatch(
        muiActions.doMiniSidenav4View(
          window.innerWidth < breakpoints.values.xl ||
            miniSidenav,
        ),
      );
      dispatch(
        muiActions.doTransparentSidenav(transparentSidenav),
      );
      dispatch(muiActions.doWhiteSidenav(whiteSidenav));
    }

    /**
     * The event listener that's calling the handleMiniSidenav function when resizing the window.
     */
    window.addEventListener('resize', handleMiniSidenav);

    // Call the handleMiniSidenav function to set the state with the initial value.
    handleMiniSidenav();

    // Remove event listener on cleanup
    return () =>
      window.removeEventListener(
        'resize',
        handleMiniSidenav,
      );
  }, [
    dispatch,
    pathname,
    transparentSidenav,
    whiteSidenav,
  ]);

  const renderAvailable = (permissionRequired) => {
    return {
      visible: match(permissionRequired),
      disabled: lockedForCurrentPlan(permissionRequired),
    };
  };

  // Render all the nested collapse items from the routes.js
  const renderNestedCollapse = (collapse: any) =>
    collapse.map(
      ({
        href,
        icon,
        key,
        name,
        path,
        permissionRequired,
      }: any) => {
        const { visible, disabled } = renderAvailable(
          permissionRequired,
        );
        const active = !!findRoute(path, currentRoutes);
        if (!visible) {
          return null;
        }
        key = key || path;
        return href ? (
          <Link
            key={key}
            href={disabled ? '#' : href}
            target="_blank"
            rel="noreferrer"
            sx={{ textDecoration: 'none' }}
          >
            <SidenavItem
              name={name}
              icon={icon}
              color={color}
              disabled={disabled}
              nested
              noCollapse
            />
          </Link>
        ) : (
          <NavLink
            to={disabled ? '#' : path}
            disabled={disabled}
            key={key}
            style={{ textDecoration: 'none' }}
          >
            <SidenavItem
              name={name}
              icon={icon}
              color={color}
              active={active}
              disabled={disabled}
              nested
              noCollapse
            />
          </NavLink>
        );
      },
    );

  // Render the all the collpases from the routes.js
  const renderCollapse = (collapses: any) =>
    collapses.map(
      ({
        collapse,
        href,
        icon,
        key,
        name,
        path,
        permissionRequired,
      }: any) => {
        const { visible, disabled } = renderAvailable(
          permissionRequired,
        );
        const active = !!findRoute(path, currentRoutes);
        if (!visible) {
          return null;
        }

        key = key || path;

        let returnValue;

        if (collapse) {
          returnValue = (
            <SidenavItem
              disabled={disabled}
              key={key}
              color={color}
              name={name}
              icon={icon}
              active={
                key === itemParentName ? 'isParent' : false
              }
              open={openNestedCollapse === key}
              onClick={({ currentTarget }: any) =>
                openNestedCollapse === key &&
                currentTarget.classList.contains(
                  'MuiListItem-root',
                )
                  ? setOpenNestedCollapse(false)
                  : setOpenNestedCollapse(key)
              }
            >
              {renderNestedCollapse(collapse)}
            </SidenavItem>
          );
        } else {
          returnValue = href ? (
            <Link
              href={disabled ? '#' : href}
              key={key}
              target="_blank"
              rel="noreferrer"
              sx={{ textDecoration: 'none' }}
            >
              <SidenavItem
                color={color}
                name={name}
                active={active}
                icon={icon}
                disabled={disabled}
                noCollapse
              />
            </Link>
          ) : (
            <NavLink
              to={disabled ? '#' : path}
              key={key}
              style={{ textDecoration: 'none' }}
            >
              <SidenavItem
                color={color}
                name={name}
                active={active}
                icon={icon}
                disabled={disabled}
                noCollapse
              />
            </NavLink>
          );
        }
        return (
          <SidenavList key={key}>{returnValue}</SidenavList>
        );
      },
    );

  // Render all the routes from the routes.js (All the visible items on the Sidenav)
  const renderRoutes = (routes) =>
    routes.map(
      ({
        collapse,
        href,
        icon,
        key,
        name,
        noCollapse,
        path,
        permissionRequired,
        title,
        type,
        onClick
      }: any) => {
        const { visible, disabled } = renderAvailable(
          permissionRequired,
        );
        const active = !!findRoute(path, currentRoutes);
        if (!visible) {
          return null;
        }

        key = key || path;

        let returnValue;

        noCollapse = noCollapse || !collapse;

        if (type === 'collapse' || !type) {
          if (onClick) {
            returnValue = (
              <Link
                href='#'
                key={key}
                target="_blank"
                rel="noreferrer"
                sx={{ textDecoration: 'none' }}
                onClick={(e) => {
                  e.preventDefault();
                  onClick()
                }}
              >
                <SidenavCollapse
                  name={name}
                  icon={icon}
                  color={color}
                  active={key === collapseName}
                  noCollapse={noCollapse}
                  disabled={disabled}
                />
              </Link>);
          } else if (href) {
            returnValue = (
              <Link
                href={disabled ? '#' : href}
                key={key}
                target="_blank"
                rel="noreferrer"
                sx={{ textDecoration: 'none' }}
              >
                <SidenavCollapse
                  name={name}
                  icon={icon}
                  color={color}
                  active={key === collapseName}
                  noCollapse={noCollapse}
                  disabled={disabled}
                />
              </Link>
            );
          } else if (noCollapse && path) {
            returnValue = (
              <NavLink
                to={disabled ? '#' : path}
                key={key}
                disabled={disabled}
              >
                <SidenavCollapse
                  name={name}
                  icon={icon}
                  color={color}
                  noCollapse={noCollapse}
                  active={active}
                  disabled={disabled}
                >
                  {collapse
                    ? renderCollapse(collapse)
                    : null}
                </SidenavCollapse>
              </NavLink>
            );
          } else {
            returnValue = (
              <SidenavCollapse
                key={key}
                name={name}
                icon={icon}
                color={color}
                active={key === collapseName}
                open={openCollapse === key}
                disabled={disabled}
                onClick={() =>
                  openCollapse === key
                    ? setOpenCollapse(false)
                    : setOpenCollapse(key)
                }
              >
                {collapse ? renderCollapse(collapse) : null}
              </SidenavCollapse>
            );
          }
        } else if (type === 'title') {
          returnValue = (
            <MDTypography
              key={key}
              color={textColor}
              display="block"
              variant="caption"
              fontWeight="bold"
              textTransform="uppercase"
              pl={2.4}
              mt={1.6}
              mb={0.8}
              ml={0.8}
            >
              {title}
            </MDTypography>
          );
        } else if (type === 'divider') {
          returnValue = (
            <Divider
              key={key}
              light={
                (!darkMode &&
                  !whiteSidenav &&
                  !transparentSidenav) ||
                (darkMode &&
                  !transparentSidenav &&
                  whiteSidenav)
              }
            />
          );
        }

        return returnValue;
      },
    );

  const filterMenus = () => {
    if (hasAdminOrCustomRole) {
      return [
        ...menus,
        // { type: 'divider', key: 'divider-0' },
        {
          name: i18n('common.settings'),
          //key: 'my-profile',
          key: 'settings',
          icon: <Icon fontSize="medium">settings</Icon>,
          // onClick: onClickSettings,
          collapse: [
            ...profileRoutes,
            // ...userRoutes,
            ...tenantRoutes,
          ],
        },
        { type: 'divider', key: 'divider-0' },
        //...menus,
      ];
    }
    const clientOrVendorName =
      getClientOrVendorName(currentUser);
    return [
      Boolean(clientOrVendorName) && {
        type: 'title',
        title: clientOrVendorName,
        key: 'client-or-vendor-name',
      },
      {
        name: userText,
        key: 'my-profile-only-show',
        path: '#',
        icon: (
          <Avatar
            src={userAvatar}
            alt={userText}
            sx={{
              width: '25.6px',
              height: '25.6px',
            }}
          />
        ),
      },
      { type: 'divider', key: 'divider-0' },
      ...profileRoutes,
      ...userRoutes,
      ...tenantRoutes,
      ...menus,
    ].filter(Boolean);
  };

  return (
    <>
      <SidenavRoot
        {...rest}
        variant="permanent"
        ownerState={{
          transparentSidenav,
          whiteSidenav,
          miniSidenav: miniSidenav4View,
          darkMode,
        }}
      >
        <MDBox py={1.5}>
          <MDBox pb={0} px={6} textAlign="center">
            <MDBox
              display={{ xs: 'block', xl: 'none' }}
              position="absolute"
              top={0}
              right={0}
              p={1.3}
              onClick={closeSidenav}
              sx={{ cursor: 'pointer' }}
            >
              <MDTypography variant="h6" color="secondary">
                <Icon sx={{ fontWeight: 'bold' }}>
                  close
                </Icon>
              </MDTypography>
            </MDBox>
            <MDBox
              component={NavLink}
              to="/"
              display="flex"
              alignItems="center"
            >
              <BrandLogo sidenav={true} />
            </MDBox>
          </MDBox>
          <Divider
            light={
              (!darkMode &&
                !whiteSidenav &&
                !transparentSidenav) ||
              (darkMode &&
                !transparentSidenav &&
                whiteSidenav)
            }
          />
          <List>{renderRoutes(filterMenus())}</List>
        </MDBox>
      </SidenavRoot>
    </>
  );
}

export default Menu;

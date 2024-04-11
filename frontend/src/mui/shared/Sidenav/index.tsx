/**
=========================================================
* Material Dashboard 2 PRO React TS - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-2-pro-react-ts
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useEffect, useState, ReactNode } from 'react';

// react-router-dom components
import { useLocation, NavLink } from 'react-router-dom';

// @mui material components
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Icon from '@mui/material/Icon';

// Material Dashboard 2 PRO React TS components
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

// Material Dashboard 2 PRO React TS examples components
import SidenavCollapse from 'src/mui/shared/Sidenav/SidenavCollapse';
import SidenavList from 'src/mui/shared/Sidenav/SidenavList';
import SidenavItem from 'src/mui/shared/Sidenav/SidenavItem';

// Custom styles for the Sidenav
import SidenavRoot from 'src/mui/shared/Sidenav/SidenavRoot';
import sidenavLogoLabel from 'src/mui/shared/Sidenav/styles/sidenav';

// for MUI 2 Dashboard
import muiActions from 'src/modules/mui/muiActions';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useDispatch } from 'react-redux';
import breakpoints from 'src/mui/assets/theme/base/breakpoints';

// Declaring props types for Sidenav
interface Props {
  color?:
    | 'primary'
    | 'secondary'
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
    | 'dark'
    | 'purple';
  brand?: string;
  brandName: string;
  routes: {
    [key: string]:
      | ReactNode
      | string
      | {
          [key: string]:
            | ReactNode
            | string
            | {
                [key: string]: ReactNode | string;
              }[];
        }[];
  }[];
  [key: string]: any;
}

function Sidenav({
  color,
  brand,
  brandName,
  routes,
  ...rest
}: Props): JSX.Element {
  const [openCollapse, setOpenCollapse] = useState<
    boolean | string
  >(false);
  const [openNestedCollapse, setOpenNestedCollapse] =
    useState<boolean | string>(false);
  const dispatch = useDispatch();
  const {
    miniSidenav4View,
    miniSidenav,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = selectMuiSettings();
  const location = useLocation();
  const { pathname } = location;
  const collapseName = pathname.split('/').slice(1)[0];
  const items = pathname.split('/').slice(1);
  const itemParentName = items[1];
  const itemName = items[items.length - 1];

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
    window.innerWidth >= 1200 &&
      dispatch(
        muiActions.doSave({
          miniSidenav: true,
        }),
      );
    dispatch(muiActions.doMiniSidenav4View(true));
  };

  useEffect(() => {
    setOpenCollapse(collapseName);
    setOpenNestedCollapse(itemParentName);
  }, []);

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
  }, [dispatch, location]);

  // Render all the nested collapse items from the routes.js
  const renderNestedCollapse = (collapse: any) => {
    const template = collapse.map(
      ({ name, route, key, href }: any) =>
        href ? (
          <Link
            key={key}
            href={href}
            target="_blank"
            rel="noreferrer"
            sx={{ textDecoration: 'none' }}
          >
            <SidenavItem name={name} nested />
          </Link>
        ) : (
          <NavLink
            to={route}
            key={key}
            style={{ textDecoration: 'none' }}
          >
            <SidenavItem
              name={name}
              active={route === pathname}
              nested
            />
          </NavLink>
        ),
    );

    return template;
  };
  // Render the all the collpases from the routes.js
  const renderCollapse = (collapses: any) =>
    collapses.map(
      ({ name, collapse, route, href, key }: any) => {
        let returnValue;

        if (collapse) {
          returnValue = (
            <SidenavItem
              key={key}
              color={color}
              name={name}
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
              href={href}
              key={key}
              target="_blank"
              rel="noreferrer"
              sx={{ textDecoration: 'none' }}
            >
              <SidenavItem
                color={color}
                name={name}
                active={key === itemName}
              />
            </Link>
          ) : (
            <NavLink
              to={route}
              key={key}
              style={{ textDecoration: 'none' }}
            >
              <SidenavItem
                color={color}
                name={name}
                active={key === itemName}
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
  const renderRoutes = routes.map(
    ({
      type,
      name,
      icon,
      title,
      collapse,
      noCollapse,
      key,
      href,
      route,
    }: any) => {
      let returnValue;

      if (type === 'collapse') {
        if (href) {
          returnValue = (
            <Link
              href={href}
              key={key}
              target="_blank"
              rel="noreferrer"
              sx={{ textDecoration: 'none' }}
            >
              <SidenavCollapse
                name={name}
                icon={icon}
                active={key === collapseName}
                noCollapse={noCollapse}
              />
            </Link>
          );
        } else if (noCollapse && route) {
          returnValue = (
            <NavLink to={route} key={key}>
              <SidenavCollapse
                name={name}
                icon={icon}
                noCollapse={noCollapse}
                active={key === collapseName}
              >
                {collapse ? renderCollapse(collapse) : null}
              </SidenavCollapse>
            </NavLink>
          );
        } else {
          returnValue = (
            <SidenavCollapse
              key={key}
              name={name}
              icon={icon}
              active={key === collapseName}
              open={openCollapse === key}
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

  return (
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
      <MDBox pt={2.4} pb={0.8} px={3.2} textAlign="center">
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
            <Icon sx={{ fontWeight: 'bold' }}>close</Icon>
          </MDTypography>
        </MDBox>
        <MDBox
          component={NavLink}
          to="/"
          display="flex"
          alignItems="center"
        >
          {brand && (
            <MDBox
              component="img"
              src={brand}
              alt="Brand"
              width="1.6rem"
            />
          )}
          <MDBox
            width={!brandName && '100%'}
            sx={(theme: any) =>
              sidenavLogoLabel(theme, {
                miniSidenav: miniSidenav4View,
              })
            }
          >
            <MDTypography
              component="h6"
              variant="button"
              fontWeight="medium"
              color={textColor}
            >
              {brandName}
            </MDTypography>
          </MDBox>
        </MDBox>
      </MDBox>
      <Divider
        light={
          (!darkMode &&
            !whiteSidenav &&
            !transparentSidenav) ||
          (darkMode && !transparentSidenav && whiteSidenav)
        }
      />
      <List>{renderRoutes}</List>
    </SidenavRoot>
  );
}

// Declaring default props for Sidenav
Sidenav.defaultProps = {
  color: 'info',
  brand: '',
};

export default Sidenav;

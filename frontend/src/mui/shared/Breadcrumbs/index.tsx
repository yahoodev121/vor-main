import { ReactNode } from 'react';

// react-router-dom components
import { Link } from 'react-router-dom';

import authSelectors from 'src/modules/auth/authSelectors';

// @mui material components
import { Breadcrumbs as MuiBreadcrumbs } from '@mui/material';
import Icon from '@mui/material/Icon';

// Material Dashboard 2 PRO React TS components
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

import { i18n } from 'src/i18n';

import {
  useLocation,
  useRouteMatch,
} from 'react-router-dom';
import { matchedRoutes } from 'src/view/routes';
import { useSelector } from 'react-redux';

// Declaring props types for the Breadcrumbs
interface Props {
  icon: ReactNode;
  title: string;
  route: string | string[];
  light?: boolean;
  [key: string]: any;
}

function Breadcrumbs({
  icon,
  title,
  route,
  light,
}: Props): JSX.Element {
  const { pathname } = useLocation();
  const routes = matchedRoutes(pathname);
  const current = routes.pop();
  const userText = useSelector(
    authSelectors.selectCurrentUserNameOrEmailPrefix,
  );

  const labels = {
    '{USER_TEXT}': userText,
  };

  const resolvePath = (path) => {
    const match = useRouteMatch({
      path,
      strict: true,
      sensitive: true,
    });
    const els = [];
    path.split('/').forEach((el) => {
      els.push(match?.params[el.replace(/^:/, '')] ?? el);
    });
    return els.join('/');
  };

  return (
    <MDBox ml={{ xs: 1, xl: 4 }}>
      <MuiBreadcrumbs
        sx={{
          '& .MuiBreadcrumbs-separator': {
            color: ({ palette: { white, grey } }) =>
              light ? white.main : grey[600],
          },
        }}
      >
        <Link to="/">
          <MDTypography
            component="span"
            variant="body2"
            color={light ? 'white' : 'dark'}
            opacity={light ? 0.8 : 0.5}
            sx={{ lineHeight: 0 }}
          >
            <Icon>{icon}</Icon>
          </MDTypography>
        </Link>
        {routes.map((el, index) => (
          <Link
            key={`route-${index}`}
            to={resolvePath(
              el.virtual ? el.redirect : el.path,
            )}
          >
            <MDTypography
              component="span"
              variant="button"
              fontWeight="regular"
              // textTransform="capitalize"
              color={light ? 'white' : 'dark'}
              opacity={light ? 0.8 : 0.5}
              sx={{ lineHeight: 0 }}
            >
              {el.virtual
                ? labels[el.labelCode] ||
                i18n(el.i18n) ||
                ''
                : i18n(el.i18n)}
            </MDTypography>
          </Link>
        ))}
        <MDTypography
          variant="button"
          fontWeight="regular"
          // textTransform="capitalize"
          color={light ? 'white' : 'dark'}
          sx={{ lineHeight: 0 }}
        >
          {i18n(current.i18n)?.replace('-', ' ')}
        </MDTypography>
      </MuiBreadcrumbs>
      {/* <MDTypography
        fontWeight="bold"
        // textTransform="capitalize"
        variant="h6"
        color={light ? 'white' : 'dark'}
        noWrap
      >
        {i18n(current.i18n).replace('-', ' ')}
      </MDTypography> */}
    </MDBox>
  );
}

// Declaring default props for Breadcrumbs
Breadcrumbs.defaultProps = {
  light: false,
};

export default Breadcrumbs;

import React, { ReactNode } from 'react';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import MDBox from 'src/mui/components/MDBox';
import {
  useLocation,
  useRouteMatch,
} from 'react-router-dom';
import SettingMenu from './SettingMenu';

const SettingLayout = ({ children }: { children: ReactNode }) : JSX.Element => {
  const { miniSettingnavView } = selectMuiSettings()

  const match = useRouteMatch();

  return (
    <>{ miniSettingnavView ? 
      <>{children}</>
      :
      <MDBox
        display="flex"
      >
        <SettingMenu
          match={match}
          brandName='settings-nav'
        />
        <div>{children}</div>
      </MDBox>
    }
    </>
  )
}

export default SettingLayout
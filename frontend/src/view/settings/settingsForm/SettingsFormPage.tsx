import React, { useEffect } from 'react';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import SettingsForm from 'src/view/settings/settingsForm/SettingsForm';
import SettingsFormToolbar from 'src/view/settings/settingsForm/SettingsFormToolbar';
import Spinner from 'src/view/shared/Spinner';
import actions from 'src/modules/settings/settingsActions';
import selectors from 'src/modules/settings/settingsSelectors';
import { useSelector, useDispatch } from 'react-redux';
import { Card } from '@mui/material';
import MDTypography from 'src/mui/components/MDTypography';
import MDBox from 'src/mui/components/MDBox';

const SettingsFormPage = (props) => {
  const dispatch = useDispatch();

  const initLoading = useSelector(
    selectors.selectInitLoading,
  );

  const settings = useSelector(selectors.selectSettings);

  useEffect(() => {
    dispatch(actions.doInit());
  }, []);

  return (
    <>
      <MDBox id={props.id}>
        <Card>
          <MDBox py={2.4} px={2.4} topBorder>
            <MDBox
              display="flex"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <MDTypography variant="h5">
                {i18n('settings.settings.title')}
              </MDTypography>
              <SettingsFormToolbar />
            </MDBox>
            {initLoading && <Spinner />}

            {!initLoading && settings && (
              <SettingsForm
                settings={settings}
                onCancel={() => getHistory().push('/')}
              />
            )}
          </MDBox>
        </Card>
      </MDBox>
    </>
  );
};

export default SettingsFormPage;

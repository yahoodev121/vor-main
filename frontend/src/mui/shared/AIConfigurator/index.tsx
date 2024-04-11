import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Divider from '@mui/material/Divider';
import Icon from '@mui/material/Icon';
import { Card } from '@mui/material';

// @mui icons

// Material Dashboard 2 PRO React TS components
import MDBox from 'src/mui/components/MDBox';
import MDButton from 'src/mui/components/MDButton';
import MDTypography from 'src/mui/components/MDTypography';

// Custom styles for the AIConfigurator
import AIConfiguratorRoot from 'src/mui/shared/AIConfigurator/AIConfiguratorRoot';
import AIConfiguratorForm from 'src/mui/shared/AIConfigurator/AIConfiguratorForm';

// for MUI 2 Dashboard
import muiActions from 'src/modules/mui/muiActions';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';

import { i18n } from 'src/i18n';
import Spinner from 'src/view/shared/Spinner';
import vorAISettingSelectors from 'src/modules/vorAI/setting/vorAISettingSelectors';
import vorAISettingActions from 'src/modules/vorAI/setting/vorAISettingActions';
import SlideButton from 'src/mui/shared/AIConfigurator/SlideButton';

let resize = false;

function AIConfigurator(): JSX.Element {
  const dispatch = useDispatch();
  const [width, setWidth] = useState(288);

  const status = useSelector(
    vorAISettingSelectors.selectStatus,
  );

  const initLoading = useSelector(
    vorAISettingSelectors.selectInitLoading,
  );

  const submitLoading = useSelector(
    vorAISettingSelectors.selectSubmitLoading,
  );

  const loading = initLoading || submitLoading;

  const record = useSelector(
    vorAISettingSelectors.selectRecord,
  );

  const responseFromAPIService = useSelector(
    vorAISettingSelectors.selectResponseFromAPIService,
  );

  const onSubmit = (values) => {
    dispatch(vorAISettingActions.doSubmit(values));
  };

  const {
    sidenavColor,
    openAIConfigurator,
    darkMode,
  } = selectMuiSettings();

  const handleCloseConfigurator = () => {
    dispatch(muiActions.doOpenAIConfigurator(false));
    setWidth(288);
  };

  const handleMouseDown = (event) => {
    resize = true;
  };

  const handleMouseMove = (event) => {
    if (!resize) return;
    let offsetRight = document.body.offsetWidth - (event.clientX - document.body.offsetLeft);
    let minWidth = 200;
    let maxWidth = 800;
    if (offsetRight > minWidth && offsetRight < maxWidth) {
      setWidth(offsetRight);
    }
  };

  const handleMouseUp = (event) => {
    resize = false;
  };

  useEffect(() => {
    document.addEventListener("mousemove", e => handleMouseMove(e));
    document.addEventListener("mouseup", e => handleMouseUp(e));
  }, []);

  useEffect(() => {
    dispatch(vorAISettingActions.doInit());
  }, [dispatch]);

  return (
    <AIConfiguratorRoot
      variant="permanent"
      ownerState={{ openAIConfigurator, width }}
    >
      <MDBox
        display="flex"
        justifyContent="space-between"
        alignItems="baseline"
        pt={3.2}
        pb={0.4}
        px={2.4}
      >
        <MDBox>
          <MDTypography variant="h5" color={sidenavColor}>
            {i18n('mui.AIConfigurator.title')}
          </MDTypography>
          <MDTypography variant="body2" color="text" sx={{ whiteSpace: 'break-spaces' }}>
            {i18n('mui.AIConfigurator.description')}
          </MDTypography>
        </MDBox>

        <Icon
          sx={({
            typography: { size },
            palette: { dark, white },
          }) => ({
            fontSize: `${size.lg} !important`,
            color: darkMode ? white.main : dark.main,
            stroke: 'currentColor',
            strokeWidth: '1.6px',
            cursor: 'pointer',
            transform: 'translateY(4px)',
          })}
          onClick={handleCloseConfigurator}
        >
          close
        </Icon>
      </MDBox>

      <Divider />

      <MDBox
        px={2.4}
        pt={2.4}
      >
        <AIConfiguratorForm
          onCancel={handleCloseConfigurator}
          onSubmit={onSubmit}
          responseFromAPIService={responseFromAPIService}
          loading={loading}
          isConfigured={Boolean(record)}
        />
        {submitLoading && (
          <MDBox
            display="flex"
            position="absolute"
            left="0"
            top="0"
            right="0"
            bottom="0"
            alignItems="center"
            justifyContent="center"
          >
            <Card sx={{ p: 2.4 }}>
              <MDTypography
                variant="body2"
                textAlign="center"
              >
                {status}
              </MDTypography>
              <Spinner />
            </Card>
          </MDBox>
        )}
      </MDBox>
      <SlideButton
        doMouseDown={handleMouseDown}
        color={sidenavColor}
        label={i18n('mui.AIConfigurator.slide')}
      />
    </AIConfiguratorRoot>
  );
}

export default AIConfigurator;

import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useRef } from 'react';
import MDBox from 'src/mui/components/MDBox';
import MDButton from 'src/mui/components/MDButton';
import Questionnaire from 'src/view/Questionnaire';
import StepContent from 'src/view/shared/components/StepContent';

const PreviewQuestionnaire = ({ visible = false }) => {
  const { sidenavColor } = selectMuiSettings();

  const questionnaire = useRef(null);

  const doExportToJSON = () =>
    questionnaire?.current?.doExportToJSON();

  const doImportFromJSON = () =>
    questionnaire?.current?.doImportFromJSON();

  return (
    <StepContent
      title={
        <MDBox
          alignItems="center"
          color="inherit"
          display="flex"
          justifyContent="space-between"
        >
          {i18n(
            'entities.campaign.sections.previewQuestionnaire',
          )}
          <MDBox display="flex" gap={0.8}>
            <MDButton
              variant="contained"
              color={sidenavColor}
              onClick={() => doImportFromJSON()}
            >
              {i18n(`common.import`)}
            </MDButton>
            <MDButton
              variant="contained"
              color={sidenavColor}
              onClick={() => doExportToJSON()}
            >
              {i18n(`common.exportToJSON`)}
            </MDButton>
          </MDBox>
        </MDBox>
      }
      visible={visible}
    >
      <Questionnaire
        name="questionnaire"
        preview={true}
        ref={questionnaire}
        visibleExportButton={false}
        visibleImportButton={false}
      />
    </StepContent>
  );
};

export default PreviewQuestionnaire;

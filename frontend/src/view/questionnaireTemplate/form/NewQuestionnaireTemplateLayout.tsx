import { Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useRef, useState } from 'react';
import GradientTitle from 'src/view/shared/components/GradientTitle';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import MDBox from 'src/mui/components/MDBox';
import MDButton from 'src/mui/components/MDButton';
import Questionnaire from 'src/view/Questionnaire';

function NewQuestionnaireTemplateLayout(props) {
  const { sidenavColor } = selectMuiSettings();
  const { title, initialValues, hiddenImpossibleFields } =
    props;
  const [preview, setPreview] = useState(false);

  const questionnaire = useRef(null);

  const doExportToJSON = () =>
    questionnaire?.current?.doExportToJSON();

  const doImportFromJSON = () =>
    questionnaire?.current?.doImportFromJSON();

  return (
    <MDBox px={0.8}>
      <Grid spacing={1.6} container>
        <Grid item xs={12}>
          <GradientTitle>
            {title ??
              i18n(
                'entities.questionnaireTemplate.new.title',
              )}
          </GradientTitle>
        </Grid>
        <Grid item xs={3}>
          <InputFormItem
            name="name"
            label={i18n(
              'entities.questionnaireTemplate.fields.name',
            )}
            variant="standard"
            required
            autoFocus
          />
        </Grid>
        <Grid
          item
          xs={9}
          justifyContent="end"
          gap={0.8}
          display="flex"
          alignItems="end"
        >
          <MDButton
            variant={preview ? 'outlined' : 'contained'}
            color={sidenavColor}
            onClick={() => setPreview(!preview)}
          >
            {i18n(
              `common.${preview ? 'cancel' : 'preview'}`,
            )}
          </MDButton>
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
        </Grid>
        <Grid item xs={12}>
          <Questionnaire
            name="questionnaire"
            ref={questionnaire}
            preview={preview}
            visibleExportButton={false}
            visibleImportButton={false}
          />
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default NewQuestionnaireTemplateLayout;

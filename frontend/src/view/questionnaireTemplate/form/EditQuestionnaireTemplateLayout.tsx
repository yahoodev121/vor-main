import { Card, Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useRef, useState } from 'react';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import MDBox from 'src/mui/components/MDBox';
import MDButton from 'src/mui/components/MDButton';
import Questionnaire from 'src/view/Questionnaire';

function EditQuestionnaireTemplateLayout(props) {
  const { sidenavColor } = selectMuiSettings();
  const { initialValues } = props;
  const [preview, setPreview] = useState(false);

  const questionnaire = useRef(null);

  const doExportToJSON = () =>
    questionnaire?.current?.doExportToJSON();

  const doImportFromJSON = () =>
    questionnaire?.current?.doImportFromJSON();

  return (
    <Card>
      <MDBox p={2.4} topBorder>
        <Grid spacing={1.6} container>
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
    </Card>
  );
}

export default EditQuestionnaireTemplateLayout;

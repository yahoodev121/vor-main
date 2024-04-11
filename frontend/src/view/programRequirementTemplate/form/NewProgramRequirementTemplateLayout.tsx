import { Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import GradientTitle from 'src/view/shared/components/GradientTitle';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import MDBox from 'src/mui/components/MDBox';
import ProgramControlTemplateAutocompleteFormItem from 'src/view/programControlTemplate/autocomplete/ProgramControlTemplateAutocompleteFormItem';
import ProgramRequirementGuidanceTemplateAutocompleteFormItem from 'src/view/programRequirementGuidanceTemplate/autocomplete/ProgramRequirementGuidanceTemplateAutocompleteFormItem';
import ProgramTemplateAutocompleteFormItem from 'src/view/programTemplate/autocomplete/ProgramTemplateAutocompleteFormItem';
import TextAreaFormItem from 'src/view/shared/form/items/TextAreaFormItem';

function NewProgramTemplateLayout(props) {
  const { title } = props;
  return (
    <MDBox px={0.8}>
      <Grid spacing={1.6} container>
        <Grid item xs={12}>
          <GradientTitle>
            {title ??
              i18n(
                'entities.programRequirementTemplate.new.title',
              )}
          </GradientTitle>
        </Grid>
        <Grid item xs={12}>
          <InputFormItem
            name="requirementID"
            label={i18n(
              'entities.programRequirementTemplate.fields.requirementID',
            )}
            variant="standard"
            required={true}
            autoFocus={true}
          />
        </Grid>
        <Grid item xs={12}>
          <InputFormItem
            name="name"
            label={i18n(
              'entities.programRequirementTemplate.fields.name',
            )}
            variant="standard"
            required={true}
          />
        </Grid>
        <Grid item xs={12}>
          <TextAreaFormItem
            name="description"
            label={i18n(
              'entities.programRequirementTemplate.fields.description',
            )}
            variant="standard"
            required={false}
          />
        </Grid>
        <Grid item lg={6} xs={12}>
          <ProgramTemplateAutocompleteFormItem
            name="programTemplates"
            label={i18n(
              'entities.programRequirementTemplate.fields.programTemplates',
            )}
            mode="multiple"
            required={false}
            showCreate={true}
            variant="standard"
          />
        </Grid>
        <Grid item lg={6} xs={12}>
          <ProgramRequirementGuidanceTemplateAutocompleteFormItem
            name="guidanceTemplates"
            label={i18n(
              'entities.programRequirementTemplate.fields.guidanceTemplates',
            )}
            mode="multiple"
            required={false}
            showCreate={true}
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <ProgramControlTemplateAutocompleteFormItem
            name="controlTemplates"
            label={i18n(
              'entities.programRequirementTemplate.fields.controlTemplates',
            )}
            mode="multiple"
            required={false}
            showCreate={true}
            variant="standard"
          />
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default NewProgramTemplateLayout;

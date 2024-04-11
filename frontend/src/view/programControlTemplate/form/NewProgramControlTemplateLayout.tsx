import { Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import GradientTitle from 'src/view/shared/components/GradientTitle';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import MDBox from 'src/mui/components/MDBox';
import ProgramRequirementTemplateAutocompleteFormItem from 'src/view/programRequirementTemplate/autocomplete/ProgramRequirementTemplateAutocompleteFormItem';
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
                'entities.programControlTemplate.new.title',
              )}
          </GradientTitle>
        </Grid>
        <Grid item xs={12}>
          <InputFormItem
            name="name"
            label={i18n(
              'entities.programControlTemplate.fields.name',
            )}
            variant="standard"
            required={true}
            autoFocus
          />
        </Grid>
        <Grid item xs={12}>
          <TextAreaFormItem
            name="description"
            label={i18n(
              'entities.programControlTemplate.fields.description',
            )}
            variant="standard"
            required={true}
          />
        </Grid>
        <Grid item xs={12}>
          <ProgramRequirementTemplateAutocompleteFormItem
            name="requirementTemplates"
            label={i18n(
              'entities.programControlTemplate.fields.requirementTemplates',
            )}
            mode="multiple"
            variant="standard"
            required={false}
            showCreate={true}
          />
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default NewProgramTemplateLayout;

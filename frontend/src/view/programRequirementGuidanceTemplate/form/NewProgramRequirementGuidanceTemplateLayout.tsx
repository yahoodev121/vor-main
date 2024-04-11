import { Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import GradientTitle from 'src/view/shared/components/GradientTitle';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import MDBox from 'src/mui/components/MDBox';
import ProductCategoryAutocompleteFormItem from 'src/view/productCategory/autocomplete/ProductCategoryAutocompleteFormItem';
import ProgramRequirementTemplateAutocompleteFormItem from 'src/view/programRequirementTemplate/autocomplete/ProgramRequirementTemplateAutocompleteFormItem';
import TextAreaFormItem from 'src/view/shared/form/items/TextAreaFormItem';

function NewProgramRequirementGuidanceTemplateLayout(
  props,
) {
  const { title } = props;
  return (
    <MDBox px={0.8}>
      <Grid spacing={1.6} container>
        <Grid item xs={12}>
          <GradientTitle>
            {title ??
              i18n(
                'entities.programRequirementGuidanceTemplate.new.title',
              )}
          </GradientTitle>
        </Grid>
        <Grid item xs={12}>
          <InputFormItem
            name="name"
            label={i18n(
              'entities.programRequirementGuidanceTemplate.fields.name',
            )}
            variant="standard"
            required={true}
            autoFocus={true}
          />
        </Grid>
        <Grid item xs={12}>
          <TextAreaFormItem
            name="description"
            label={i18n(
              'entities.programRequirementGuidanceTemplate.fields.description',
            )}
            variant="standard"
            required={true}
          />
        </Grid>
        <Grid item xs={12}>
          <ProgramRequirementTemplateAutocompleteFormItem
            name="requirementTemplates"
            label={i18n(
              'entities.programRequirementGuidanceTemplate.fields.requirementTemplates',
            )}
            mode="multiple"
            required={false}
            showCreate={true}
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <ProductCategoryAutocompleteFormItem
            name="productCategories"
            label={i18n(
              'entities.programRequirementGuidanceTemplate.fields.productCategories',
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

export default NewProgramRequirementGuidanceTemplateLayout;

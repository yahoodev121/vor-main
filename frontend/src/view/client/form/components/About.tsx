import { Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import clientEnumerators from 'src/modules/client/clientEnumerators';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import Storage from 'src/security/storage';
import ColorBadgeSelectFormItem, {
  generateColorBadgeSelectOptions,
} from 'src/view/shared/form/items/ColorBadgeSelectFormItem';
import ClientCategoryAutocompleteFormItem from 'src/view/clientCategory/autocomplete/ClientCategoryAutocompleteFormItem';
import DatePickerFormItem from 'src/view/shared/form/items/DatePickerFormItem';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import LogoFormItem from 'src/view/shared/form/items/LogoFormItem';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';
import TagAutocompleteFormItem from 'src/view/tag/autocomplete/TagAutocompleteFormItem';
import TextAreaFormItem from 'src/view/shared/form/items/TextAreaFormItem';

function AboutSection({ visible }): JSX.Element {
  return (
    <MDBox display={visible ? 'block' : 'none'}>
      <MDBox lineHeight={0}>
        <MDTypography variant="h5">
          {i18n('entities.client.sections.about')}
        </MDTypography>
      </MDBox>
      <MDBox mt={1.3}>
        <Grid spacing={1.6} container>
          <Grid item md={6} xs={12}>
            <InputFormItem
              name="name"
              label={i18n('entities.client.fields.name')}
              required={true}
              variant="standard"
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <ClientCategoryAutocompleteFormItem
              name="category"
              label={i18n(
                'entities.client.fields.category',
              )}
              required={true}
              showCreate={true}
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <TextAreaFormItem
              name="description"
              label={i18n(
                'entities.client.fields.description',
              )}
              required={false}
              variant="standard"
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <ColorBadgeSelectFormItem
              name="status"
              label={i18n('entities.client.fields.status')}
              options={generateColorBadgeSelectOptions(
                clientEnumerators.status,
                clientEnumerators.statusColor,
                'entities.client.enumerators.status',
              )}
              required={true}
              variant="standard"
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <ColorBadgeSelectFormItem
              name="rating"
              label={i18n('entities.client.fields.rating')}
              options={generateColorBadgeSelectOptions(
                clientEnumerators.rating,
                clientEnumerators.ratingColor,
                'entities.client.enumerators.rating',
              )}
              required={true}
              variant="standard"
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <SelectFormItem
              name="industry"
              label={i18n(
                'entities.client.fields.industry',
              )}
              options={clientEnumerators.industry.map(
                (value) => ({
                  value,
                  label: i18n(
                    `entities.client.enumerators.industry.${value}`,
                  ),
                }),
              )}
              required={true}
              variant="standard"
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <SelectFormItem
              name="dataProcessed"
              label={i18n(
                'entities.client.fields.dataProcessed',
              )}
              options={clientEnumerators.dataProcessed.map(
                (value) => ({
                  value,
                  label: i18n(
                    `entities.client.enumerators.dataProcessed.${value}`,
                  ),
                }),
              )}
              required={true}
              variant="standard"
              mode="multiple"
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <DatePickerFormItem
              name="dateOnboarded"
              label={i18n(
                'entities.client.fields.dateOnboarded',
              )}
              required={false}
              variant="standard"
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <DatePickerFormItem
              name="dateOffboarded"
              label={i18n(
                'entities.client.fields.dateOffboarded',
              )}
              required={false}
              variant="standard"
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <MDBox py={1.3}>
              <MDTypography variant="h5">
                {i18n('entities.client.fields.logo')}
              </MDTypography>
            </MDBox>
            <LogoFormItem
              name="logo"
              required={false}
              storage={Storage.values.clientLogo}
              max={1}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <MDBox py={1.3}>
              <MDTypography variant="h5">
                {i18n('entities.client.fields.tags')}
              </MDTypography>
            </MDBox>
            <TagAutocompleteFormItem name="tags" />
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  );
}

export default AboutSection;

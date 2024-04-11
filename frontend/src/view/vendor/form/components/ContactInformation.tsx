import { Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import Roles from 'src/security/roles';
import TextAreaFormItem from 'src/view/shared/form/items/TextAreaFormItem';
import UserAutocompleteFormItem from 'src/view/user/autocomplete/UserAutocompleteFormItem';

function ContactInformationSection({
  visible,
}): JSX.Element {
  return (
    <MDBox display={visible ? 'block' : 'none'}>
      <MDBox lineHeight={0}>
        <MDTypography variant="h5">
          {i18n(
            'entities.vendor.sections.contactInformation',
          )}
        </MDTypography>
      </MDBox>
      <MDBox mt={1.3}>
        <Grid spacing={1.6} container>
          <Grid item xs={12}>
            <UserAutocompleteFormItem
              name="users"
              label={i18n('entities.vendor.fields.users')}
              fullWidth={true}
              mode="multiple"
              readOnlyRoles={true}
              required={true}
              roles={[Roles.values.vendor]}
              showCreate={true}
              variant="standard"
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <InputFormItem
              name="supportEmail"
              label={i18n(
                'entities.vendor.fields.supportEmail',
              )}
              variant="standard"
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <InputFormItem
              name="supportPhoneNumber"
              label={i18n(
                'entities.vendor.fields.supportPhoneNumber',
              )}
              variant="standard"
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <InputFormItem
              name="infoSecEmail"
              label={i18n(
                'entities.vendor.fields.infoSecEmail',
              )}
              variant="standard"
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <InputFormItem
              name="infoSecPhoneNumber"
              label={i18n(
                'entities.vendor.fields.infoSecPhoneNumber',
              )}
              variant="standard"
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <InputFormItem
              name="privacyEmail"
              label={i18n(
                'entities.vendor.fields.privacyEmail',
              )}
              variant="standard"
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <InputFormItem
              name="privacyPhoneNumber"
              label={i18n(
                'entities.vendor.fields.privacyPhoneNumber',
              )}
              variant="standard"
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <InputFormItem
              name="website"
              label={i18n('entities.vendor.fields.website')}
              variant="standard"
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextAreaFormItem
              name="address"
              label={i18n('entities.vendor.fields.address')}
              variant="standard"
              fullWidth
            />
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  );
}

export default ContactInformationSection;

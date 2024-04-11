import { Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import clientEnumerators from 'src/modules/client/clientEnumerators';
import FilesFormItem from 'src/view/shared/form/items/FilesFormItem';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';
import Storage from 'src/security/storage';

function BusinessSection({ visible }): JSX.Element {
  return (
    <MDBox display={visible ? 'block' : 'none'}>
      <MDBox lineHeight={0}>
        <MDTypography variant="h5">
          {i18n('entities.client.sections.business')}
        </MDTypography>
      </MDBox>
      <MDBox mt={1.3}>
        <Grid spacing={1.6} container>
          <Grid item md={6} xs={12}>
            <SelectFormItem
              name="location"
              label={i18n(
                'entities.client.fields.location',
              )}
              options={clientEnumerators.location.map(
                (value) => ({
                  value,
                  label: i18n(
                    `entities.client.enumerators.location.${value}`,
                  ),
                }),
              )}
              required={true}
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <FilesFormItem
              name="contract"
              label={i18n(
                'entities.client.fields.contract',
              )}
              required={false}
              storage={Storage.values.clientContract}
              max={undefined}
            />
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  );
}

export default BusinessSection;

import { Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import clientEnumerators from 'src/modules/client/clientEnumerators';
import FilesFormItem from 'src/view/shared/form/items/FilesFormItem';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';
import Storage from 'src/security/storage';

function ComplianceSection({ visible }): JSX.Element {
  return (
    <MDBox display={visible ? 'block' : 'none'}>
      <MDBox lineHeight={0}>
        <MDTypography variant="h5">
          {i18n('entities.client.sections.compliance')}
        </MDTypography>
      </MDBox>
      <MDBox mt={1.3}>
        <Grid spacing={1.6} container>
          <Grid item md={6} xs={12}>
            <SelectFormItem
              name="gdprRopa"
              label={i18n(
                'entities.client.fields.gdprRopa',
              )}
              options={clientEnumerators.gdprRopa.map(
                (value) => ({
                  value,
                  label: i18n(
                    `entities.client.enumerators.gdprRopa.${value}`,
                  ),
                }),
              )}
              required={true}
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <FilesFormItem
              name="documentation"
              label={i18n(
                'entities.client.fields.documentation',
              )}
              required={false}
              storage={Storage.values.clientDocumentation}
              max={undefined}
            />
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  );
}

export default ComplianceSection;

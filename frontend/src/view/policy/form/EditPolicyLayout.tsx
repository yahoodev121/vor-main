import { Card, Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import FilesFormItem from 'src/view/shared/form/items/FilesFormItem';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import NoteAutocompleteFormItem from 'src/view/note/autocomplete/NoteAutocompleteFormItem';
import policyEnumerators, {
  POLICY_TYPES,
} from 'src/modules/policy/policyEnumerators';
import PolicyVersions from 'src/view/policy/view/PolicyVersions';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';
import Storage from 'src/security/storage';
import TagAutocompleteFormItem from 'src/view/tag/autocomplete/TagAutocompleteFormItem';
import TextAreaFormItem from 'src/view/shared/form/items/TextAreaFormItem';

function EditPolicyLayout(props) {
  const {
    initialValues,
    policyType,
    setPolicyType,
    record,
  } = props;
  return (
    <Grid container spacing={1.6}>
      <Grid item md={8} xs={12}>
        <Card sx={{ height: '100%' }}>
          <MDBox p={2.4} topBorder>
            <Grid spacing={1.6} container>
              <Grid item xs={12}>
                <MDBox
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <MDTypography variant="h5">
                    {i18n('entities.policy.info')}
                  </MDTypography>
                  <MDTypography
                    variant="button"
                    fontWeight="bold"
                    color="secondary"
                  >
                    {`v${record.version}`}
                  </MDTypography>
                </MDBox>
              </Grid>
              <Grid item xs={12}>
                <Grid spacing={1.6} container>
                  <Grid md={6} xs={12} item>
                    <InputFormItem
                      name="name"
                      label={i18n(
                        'entities.policy.fields.name',
                      )}
                      variant="standard"
                      required={true}
                      autoFocus
                    />
                  </Grid>
                  <Grid md={6} xs={12} item>
                    <SelectFormItem
                      name="type"
                      label={i18n(
                        'entities.policy.fields.type',
                      )}
                      hint={i18n(
                        'entities.policy.hints.type',
                      )}
                      options={policyEnumerators.type.map(
                        (value) => ({
                          value,
                          label: i18n(
                            `entities.policy.enumerators.type.${value}`,
                          ),
                        }),
                      )}
                      onChange={(value) =>
                        setPolicyType(value)
                      }
                      variant="standard"
                      required={true}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextAreaFormItem
                      name="description"
                      label={i18n(
                        'entities.policy.fields.description',
                      )}
                      variant="standard"
                    />
                  </Grid>
                  {policyType === POLICY_TYPES.DOCUMENT && (
                    <Grid xs={12} item>
                      <FilesFormItem
                        name="attachment"
                        label={i18n(
                          'entities.policy.fields.attachment',
                        )}
                        required={true}
                        storage={
                          Storage.values.policyAttachment
                        }
                        max={1}
                      />
                    </Grid>
                  )}
                  {policyType === POLICY_TYPES.LINK && (
                    <Grid xs={12} item>
                      <InputFormItem
                        name="link"
                        label={i18n(
                          'entities.policy.fields.link',
                        )}
                        variant="standard"
                        required={true}
                      />
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </MDBox>
        </Card>
      </Grid>
      <Grid item md={4} xs={12}>
        <MDBox position="relative" height="100%">
          <Grid height="100%" container>
            <Grid item xs={12} pb={1.6}>
              <Card sx={{ height: '100%' }}>
                <MDBox p={2.4} topBorder>
                  <Grid container spacing={1.6}>
                    <Grid item xs={12}>
                      <MDTypography variant="h5">
                        {i18n(
                          'entities.policy.fields.tags',
                        )}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12}>
                      <TagAutocompleteFormItem name="tags" />
                    </Grid>
                  </Grid>
                </MDBox>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card sx={{ height: '100%' }}>
                <MDBox p={2.4} topBorder>
                  <Grid container spacing={1.6}>
                    <Grid item xs={12}>
                      <MDTypography variant="h5">
                        {i18n(
                          'entities.policy.fields.notes',
                        )}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12}>
                      <NoteAutocompleteFormItem
                        name="notes"
                        label={i18n(
                          'entities.policy.fields.notes',
                        )}
                        required={false}
                        showCreate={true}
                        mode="multiple"
                        variant="standard"
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
      </Grid>
      <Grid item xs={12}>
        <Card sx={{ height: '100%' }}>
          <MDBox p={2.4} topBorder>
            <Grid spacing={1.6} container>
              <Grid item xs={12}>
                <MDBox
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <MDTypography variant="h5">
                    {i18n('entities.policy.fields.version')}
                  </MDTypography>
                </MDBox>
              </Grid>
              <Grid item xs={12}>
                <PolicyVersions
                  policy={record.policy || record.id}
                  version={record.version}
                  isEditing
                />
              </Grid>
            </Grid>
          </MDBox>
        </Card>
      </Grid>
    </Grid>
  );
}

export default EditPolicyLayout;

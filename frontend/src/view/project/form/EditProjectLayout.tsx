import { getAbsoluteDateTimeByHour } from 'src/modules/utils';
import { Grid, Card } from '@mui/material';
import { i18n } from 'src/i18n';
import { useFormContext } from 'react-hook-form';
import { useState } from 'react';
import DatePickerFormItem from 'src/view/shared/form/items/DatePickerFormItem';
import FilesFormItem from 'src/view/shared/form/items/FilesFormItem';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import NoteAutocompleteFormItem from 'src/view/note/autocomplete/NoteAutocompleteFormItem';
import ProjectPriorityAutocompleteFormItem from 'src/view/projectPriority/autocomplete/ProjectPriorityAutocompleteFormItem';
import ProjectStatusAutocompleteFormItem from 'src/view/projectStatus/autocomplete/ProjectStatusAutocompleteFormItem';
import ProjectTypeAutocompleteFormItem from 'src/view/projectType/autocomplete/ProjectTypeAutocompleteFormItem';
import Storage from 'src/security/storage';
import TextAreaFormItem from 'src/view/shared/form/items/TextAreaFormItem';
import UserAutocompleteFormItem from 'src/view/user/autocomplete/UserAutocompleteFormItem';
import UserGroupAutocompleteFormItem from 'src/view/userGroup/autocomplete/UserGroupAutocompleteFormItem';

function EditProjectLayout(props) {
  const { initialValues, record } = props;
  const [visibleCompletedDate, setVisibleCompletedDate] =
    useState(initialValues.status.status === 'Complete');
  const onChangeStatus = (status) => {
    setVisibleCompletedDate(
      status.label === 'Complete' ||
        status.status === 'Complete',
    );
  };
  const { setValue } = useFormContext();
  const [dueDate, setDueDate] = useState(
    record?.dueDate || null,
  );

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
                    {i18n('entities.project.info')}
                  </MDTypography>
                  <MDTypography
                    variant="button"
                    color="text"
                    fontWeight="bold"
                  >
                    {`# ${initialValues.reference}`}
                  </MDTypography>
                </MDBox>
              </Grid>
              <Grid item md={6} xs={12}>
                <InputFormItem
                  name="name"
                  label={i18n(
                    'entities.project.fields.name',
                  )}
                  variant="standard"
                  autoFocus
                  required
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <ProjectTypeAutocompleteFormItem
                  name="type"
                  label={i18n(
                    'entities.project.fields.type',
                  )}
                  variant="standard"
                  fullWidth
                  required
                  showCreate
                />
              </Grid>
              <Grid item xs={12}>
                <TextAreaFormItem
                  name="description"
                  label={i18n(
                    'entities.project.fields.description',
                  )}
                  variant="standard"
                  fullWidth
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <ProjectStatusAutocompleteFormItem
                  name="status"
                  label={i18n(
                    'entities.project.fields.status',
                  )}
                  onChange={onChangeStatus}
                  variant="standard"
                  fullWidth
                  required
                  showCreate
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <ProjectPriorityAutocompleteFormItem
                  name="priority"
                  label={i18n(
                    'entities.project.fields.priority',
                  )}
                  variant="standard"
                  fullWidth
                  required
                  showCreate
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <UserAutocompleteFormItem
                  name="owner"
                  label={i18n(
                    'entities.project.fields.owner',
                  )}
                  required={false}
                  showSelect={true}
                  variant="standard"
                  fullWidth
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <UserAutocompleteFormItem
                  name="owner"
                  label={i18n(
                    'entities.project.fields.owner',
                  )}
                  variant="standard"
                  fullWidth
                  required
                  showSelect
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <DatePickerFormItem
                  name="dueDate"
                  label={i18n(
                    'entities.project.fields.dueDate',
                  )}
                  required={false}
                  variant="standard"
                  onAccept={(value) => {
                    const newValue =
                      getAbsoluteDateTimeByHour(value);
                    setDueDate(
                      newValue?.toISOString() || null,
                    );
                    setValue('dueDate', newValue, {
                      shouldValidate: false,
                      shouldDirty: true,
                    });
                  }}
                  value={dueDate}
                  forceValue
                  showTime
                />
              </Grid>
              {visibleCompletedDate && (
                <Grid item md={6} xs={12}>
                  <DatePickerFormItem
                    name="completedDate"
                    label={i18n(
                      'entities.project.fields.completedDate',
                    )}
                    required={false}
                    variant="standard"
                    showTime
                  />
                </Grid>
              )}
            </Grid>
          </MDBox>
        </Card>
      </Grid>
      <Grid item md={4} xs={12}>
        <MDBox position="relative" height="100%">
          <Card sx={{ height: '100%' }}>
            <MDBox p={2.4} topBorder>
              <Grid container spacing={1.6}>
                <Grid item xs={12}>
                  <MDTypography variant="h5">
                    {i18n('entities.project.fields.notes')}
                  </MDTypography>
                </Grid>
                <Grid item xs={12}>
                  <NoteAutocompleteFormItem
                    name="notes"
                    label={i18n(
                      'entities.project.fields.notes',
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
        </MDBox>
      </Grid>
      <Grid item xs={12}>
        <Grid spacing={1.6} container>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Card sx={{ height: '100%' }}>
              <MDBox p={2.4} topBorder>
                <Grid spacing={1.6} container>
                  <Grid item xs={12}>
                    <MDTypography variant="h5">
                      {i18n(
                        'entities.project.fields.teamMembers',
                      )}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12}>
                    <UserAutocompleteFormItem
                      name="teamMembers"
                      label={i18n(
                        'entities.project.fields.teamMembers',
                      )}
                      mode="multiple"
                      variant="standard"
                      hiddenLabel
                      fullWidth
                      showCreate
                    />
                  </Grid>
                </Grid>
              </MDBox>
            </Card>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Card sx={{ height: '100%' }}>
              <MDBox p={2.4} topBorder>
                <Grid spacing={1.6} container>
                  <Grid item xs={12}>
                    <MDTypography variant="h5">
                      {i18n(
                        'entities.project.fields.teamGroups',
                      )}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12}>
                    <UserGroupAutocompleteFormItem
                      name="teamGroups"
                      label={i18n(
                        'entities.project.fields.teamGroups',
                      )}
                      mode="multiple"
                      variant="standard"
                      hiddenLabel
                      fullWidth
                      showCreate
                    />
                  </Grid>
                </Grid>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <MDBox p={2.4} topBorder>
            <Grid spacing={1.6} container>
              <Grid item xs={12}>
                <MDTypography variant="h5">
                  {i18n(
                    'entities.project.fields.attachments',
                  )}
                </MDTypography>
              </Grid>
              <Grid item xs={12}>
                <FilesFormItem
                  name="attachments"
                  required={false}
                  storage={
                    Storage.values.projectAttachments
                  }
                  max={undefined}
                />
              </Grid>
            </Grid>
          </MDBox>
        </Card>
      </Grid>
    </Grid>
  );
}

export default EditProjectLayout;

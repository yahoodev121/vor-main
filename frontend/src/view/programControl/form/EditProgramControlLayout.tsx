import { Card, Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import FilesFormItem from 'src/view/shared/form/items/FilesFormItem';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import NoteAutocompleteFormItem from 'src/view/note/autocomplete/NoteAutocompleteFormItem';
import ProgramRequirementAutocompleteFormItem from 'src/view/programRequirement/autocomplete/ProgramRequirementAutocompleteFormItem';
import Storage from 'src/security/storage';
import TagAutocompleteFormItem from 'src/view/tag/autocomplete/TagAutocompleteFormItem';
import TaskAutocompleteFormItem from 'src/view/task/autocomplete/TaskAutocompleteFormItem';
import TextAreaFormItem from 'src/view/shared/form/items/TextAreaFormItem';

function EditProgramControlLayout(props) {
  const { initialValues } = props;
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
                    {i18n('entities.programControl.info')}
                  </MDTypography>
                </MDBox>
              </Grid>
              <Grid item xs={12}>
                <InputFormItem
                  name="name"
                  label={i18n(
                    'entities.programControl.fields.name',
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
                    'entities.programControl.fields.description',
                  )}
                  variant="standard"
                  required={false}
                />
              </Grid>
              <Grid item xs={12}>
                <ProgramRequirementAutocompleteFormItem
                  name="requirements"
                  label={i18n(
                    'entities.programControl.fields.requirements',
                  )}
                  mode="multiple"
                  variant="standard"
                  required={false}
                  showCreate={true}
                />
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
                          'entities.programControl.fields.tags',
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
                        {i18n('entities.task.fields.notes')}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12}>
                      <NoteAutocompleteFormItem
                        name="notes"
                        label={i18n(
                          'entities.programControl.fields.notes',
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
            <Grid container spacing={1.6}>
              <Grid item xs={12}>
                <MDTypography variant="h5">
                  {i18n(
                    'entities.programControl.fields.attachments',
                  )}
                </MDTypography>
              </Grid>
              <Grid item xs={12}>
                <FilesFormItem
                  name="attachments"
                  required={false}
                  storage={
                    Storage.values.programControlAttachments
                  }
                  max={undefined}
                />
              </Grid>
            </Grid>
          </MDBox>
        </Card>
      </Grid>
      {/*<Grid item xs={12}>
        <Card sx={{ height: '100%' }}>
          <MDBox p={2.4} topBorder>
            <Grid container spacing={1.6}>
              <Grid item xs={12}>
                <MDTypography variant="h5">
                  {i18n(
                    'entities.programControl.fields.tasks',
                  )}
                </MDTypography>
              </Grid>
              <Grid item xs={12}>
                <TaskAutocompleteFormItem
                  name="tasks"
                  label={i18n(
                    'entities.programControl.fields.tasks',
                  )}
                  mode="multiple"
                  variant="standard"
                  required={false}
                  showCreate={true}
                />
              </Grid>
            </Grid>
          </MDBox>
        </Card>
                  </Grid>*/}
    </Grid>
  );
}

export default EditProgramControlLayout;

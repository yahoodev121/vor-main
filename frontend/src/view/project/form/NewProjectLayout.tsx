import { getAbsoluteDateTimeByHour } from 'src/modules/utils';
import { Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import { useFormContext } from 'react-hook-form';
import { useState } from 'react';
import DatePickerFormItem from 'src/view/shared/form/items/DatePickerFormItem';
import FilesFormItem from 'src/view/shared/form/items/FilesFormItem';
import GradientTitle from 'src/view/shared/components/GradientTitle';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import MDBox from 'src/mui/components/MDBox';
import NoteAutocompleteFormItem from 'src/view/note/autocomplete/NoteAutocompleteFormItem';
import ProjectPriorityAutocompleteFormItem from 'src/view/projectPriority/autocomplete/ProjectPriorityAutocompleteFormItem';
import ProjectStatusAutocompleteFormItem from 'src/view/projectStatus/autocomplete/ProjectStatusAutocompleteFormItem';
import ProjectTypeAutocompleteFormItem from 'src/view/projectType/autocomplete/ProjectTypeAutocompleteFormItem';
import RiskAutocompleteFormItem from 'src/view/risk/autocomplete/RiskAutocompleteFormItem';
import Storage from 'src/security/storage';
import TaskAutocompleteFormItem from 'src/view/task/autocomplete/TaskAutocompleteFormItem';
import TextAreaFormItem from 'src/view/shared/form/items/TextAreaFormItem';
import UserAutocompleteFormItem from 'src/view/user/autocomplete/UserAutocompleteFormItem';
import UserGroupAutocompleteFormItem from 'src/view/userGroup/autocomplete/UserGroupAutocompleteFormItem';

function NewProjectLayout(props) {
  const { title } = props;
  const { setValue } = useFormContext();
  const [dueDate, setDueDate] = useState(null);
  return (
    <MDBox px={0.8}>
      <Grid spacing={1.6} container>
        <Grid item xs={12}>
          <GradientTitle>
            {title ?? i18n('entities.project.new.title')}
          </GradientTitle>
        </Grid>
        <Grid item md={6} xs={12}>
          <InputFormItem
            name="name"
            label={i18n('entities.project.fields.name')}
            variant="standard"
            autoFocus
            required
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <ProjectTypeAutocompleteFormItem
            name="type"
            label={i18n('entities.project.fields.type')}
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
            label={i18n('entities.project.fields.status')}
            variant="standard"
            fullWidth
            required
            showCreate
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <ProjectPriorityAutocompleteFormItem
            name="priority"
            label={i18n('entities.project.fields.priority')}
            variant="standard"
            fullWidth
            required
            showCreate
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <UserAutocompleteFormItem
            name="owner"
            label={i18n('entities.project.fields.owner')}
            variant="standard"
            fullWidth
            required
            showSelect
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <DatePickerFormItem
            name="dueDate"
            label={i18n('entities.project.fields.dueDate')}
            required={false}
            variant="standard"
            onAccept={(value) => {
              const newValue =
                getAbsoluteDateTimeByHour(value);
              setDueDate(newValue?.toISOString() || null);
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
        {/* <Grid item md={6} xs={12}>
          <DatePickerFormItem
            name="completedDate"
            label={i18n(
              'entities.project.fields.completedDate',
            )}
            variant="standard"
            showTime
          />
        </Grid> */}
        <Grid item md={6} xs={12}>
          <UserAutocompleteFormItem
            name="teamMembers"
            label={i18n(
              'entities.project.fields.teamMembers',
            )}
            mode="multiple"
            variant="standard"
            fullWidth
            showCreate
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <UserGroupAutocompleteFormItem
            name="teamGroups"
            label={i18n(
              'entities.project.fields.teamGroups',
            )}
            mode="multiple"
            variant="standard"
            fullWidth
            showCreate
          />
        </Grid>
        <Grid item xs={12}>
          <FilesFormItem
            name="attachments"
            label={i18n(
              'entities.project.fields.attachments',
            )}
            required={false}
            storage={Storage.values.projectAttachments}
            max={undefined}
          />
        </Grid>
        <Grid item xs={12}>
          <TaskAutocompleteFormItem
            name="tasks"
            label={i18n('entities.project.fields.tasks')}
            mode="multiple"
            variant="standard"
            fullWidth
            showCreate
          />
        </Grid>
        <Grid item xs={12}>
          <RiskAutocompleteFormItem
            name="risks"
            label={i18n('entities.project.fields.risks')}
            mode="multiple"
            variant="standard"
            fullWidth
            showCreate
          />
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default NewProjectLayout;

import { Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import FilesFormItem from 'src/view/shared/form/items/FilesFormItem';
import GradientTitle from 'src/view/shared/components/GradientTitle';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import MDBox from 'src/mui/components/MDBox';
import NoteAutocompleteFormItem from 'src/view/note/autocomplete/NoteAutocompleteFormItem';
import ProgramRequirementAutocompleteFormItem from 'src/view/programRequirement/autocomplete/ProgramRequirementAutocompleteFormItem';
import Storage from 'src/security/storage';
import TagAutocompleteFormItem from 'src/view/tag/autocomplete/TagAutocompleteFormItem';
import TaskAutocompleteFormItem from 'src/view/task/autocomplete/TaskAutocompleteFormItem';
import TextAreaFormItem from 'src/view/shared/form/items/TextAreaFormItem';

function NewProgramControlLayout(props) {
  const { title } = props;
  return (
    <MDBox px={0.8}>
      <Grid spacing={1.6} container>
        <Grid item xs={12}>
          <GradientTitle>
            {title ??
              i18n('entities.programControl.new.title')}
          </GradientTitle>
        </Grid>
        <Grid item xs={12}>
          <InputFormItem
            name="name"
            label={i18n(
              'entities.programControl.fields.name',
            )}
            variant="standard"
            required={true}
            autoFocue={true}
          />
        </Grid>
        <Grid item xs={12}>
          <TextAreaFormItem
            name="description"
            label={i18n(
              'entities.programControl.fields.description',
            )}
            variant="standard"
            required={true}
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
            programId={props.programId}
          />
        </Grid>
        <Grid item xs={12}>
          <FilesFormItem
            name="attachments"
            label={i18n(
              'entities.programControl.fields.attachments',
            )}
            required={false}
            storage={
              Storage.values.programControlAttachments
            }
            max={undefined}
          />
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
        <Grid item xs={12}>
          <TagAutocompleteFormItem
            name="tags"
            label={i18n(
              'entities.programControl.fields.tags',
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <NoteAutocompleteFormItem
            name="notes"
            label={i18n(
              'entities.programControl.fields.notes',
            )}
            variant="standard"
            mode="multiple"
            required={false}
            showCreate={true}
            fullWidth={true}
          />
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default NewProgramControlLayout;

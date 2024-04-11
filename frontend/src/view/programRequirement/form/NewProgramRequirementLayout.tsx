import { Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import GradientTitle from 'src/view/shared/components/GradientTitle';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import MDBox from 'src/mui/components/MDBox';
import NoteAutocompleteFormItem from 'src/view/note/autocomplete/NoteAutocompleteFormItem';
import ProgramAutocompleteFormItem from 'src/view/program/autocomplete/ProgramAutocompleteFormItem';
import ProgramControlAutocompleteFormItem from 'src/view/programControl/autocomplete/ProgramControlAutocompleteFormItem';
import TagAutocompleteFormItem from 'src/view/tag/autocomplete/TagAutocompleteFormItem';
import TextAreaFormItem from 'src/view/shared/form/items/TextAreaFormItem';

function NewProgramRequirementLayout(props) {
  const { title } = props;
  return (
    <MDBox px={0.8}>
      <Grid spacing={1.6} container>
        <Grid item xs={12}>
          <GradientTitle>
            {title ??
              i18n('entities.programRequirement.new.title')}
          </GradientTitle>
        </Grid>
        <Grid item xs={12}>
          <InputFormItem
            name="requirementID"
            label={i18n(
              'entities.programRequirement.fields.requirementID',
            )}
            variant="standard"
            required={true}
            autoFocus={true}
          />
        </Grid>
        <Grid item xs={12}>
          <InputFormItem
            name="name"
            label={i18n(
              'entities.programRequirement.fields.name',
            )}
            variant="standard"
            required={true}
          />
        </Grid>
        <Grid item xs={12}>
          <TextAreaFormItem
            name="description"
            label={i18n(
              'entities.programRequirement.fields.description',
            )}
            variant="standard"
            required={false}
          />
        </Grid>
        <Grid item xs={12}>
          <ProgramAutocompleteFormItem
            name="programs"
            label={i18n(
              'entities.programRequirement.fields.programs',
            )}
            variant="standard"
            mode="multiple"
            required={false}
            showCreate={true}
          />
        </Grid>
        <Grid item xs={12}>
          <ProgramControlAutocompleteFormItem
            name="controls"
            label={i18n(
              'entities.programRequirement.fields.controls',
            )}
            variant="standard"
            mode="multiple"
            required={false}
            showCreate={true}
          />
        </Grid>
        <Grid item xs={12}>
          <TagAutocompleteFormItem
            name="tags"
            label={i18n(
              'entities.programRequirement.fields.tags',
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <NoteAutocompleteFormItem
            name="notes"
            label={i18n(
              'entities.programRequirement.fields.notes',
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
  );
}

export default NewProgramRequirementLayout;

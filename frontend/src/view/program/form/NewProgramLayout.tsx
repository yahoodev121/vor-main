import { Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import ColorBadgeSelectFormItem, {
  generateColorBadgeSelectOptions,
} from 'src/view/shared/form/items/ColorBadgeSelectFormItem';
import GradientTitle from 'src/view/shared/components/GradientTitle';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import MDBox from 'src/mui/components/MDBox';
import NoteAutocompleteFormItem from 'src/view/note/autocomplete/NoteAutocompleteFormItem';
import programEnumerators from 'src/modules/program/programEnumerators';
import ProgramRequirementAutocompleteFormItem from 'src/view/programRequirement/autocomplete/ProgramRequirementAutocompleteFormItem';
import TagAutocompleteFormItem from 'src/view/tag/autocomplete/TagAutocompleteFormItem';
import TextAreaFormItem from 'src/view/shared/form/items/TextAreaFormItem';

function NewProgramLayout(props) {
  const { title } = props;
  return (
    <MDBox px={0.8}>
      <Grid spacing={1.6} container>
        <Grid item xs={12}>
          <GradientTitle>
            {title ?? i18n('entities.program.new.title')}
          </GradientTitle>
        </Grid>
        <Grid item xs={12}>
          <InputFormItem
            name="name"
            label={i18n('entities.program.fields.name')}
            variant="standard"
            required={true}
            autoFocus={true}
          />
        </Grid>
        <Grid item xs={12}>
          <TextAreaFormItem
            name="description"
            label={i18n(
              'entities.program.fields.description',
            )}
            variant="standard"
            required={false}
          />
        </Grid>
        <Grid item xs={12}>
          <ColorBadgeSelectFormItem
            name="status"
            label={i18n('entities.program.fields.status')}
            options={generateColorBadgeSelectOptions(
              programEnumerators.status,
              programEnumerators.statusColor,
              'entities.program.enumerators.status',
            )}
            required={true}
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <ProgramRequirementAutocompleteFormItem
            name="requirements"
            label={i18n(
              'entities.program.fields.requirements',
            )}
            fullWidth={true}
            mode="multiple"
            required={false}
            showCreate={true}
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TagAutocompleteFormItem
            name="tags"
            label={i18n('entities.program.fields.tags')}
          />
        </Grid>
        <Grid item xs={12}>
          <NoteAutocompleteFormItem
            name="notes"
            label={i18n('entities.program.fields.notes')}
            fullWidth={true}
            mode="multiple"
            required={false}
            showCreate={true}
            variant="standard"
          />
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default NewProgramLayout;

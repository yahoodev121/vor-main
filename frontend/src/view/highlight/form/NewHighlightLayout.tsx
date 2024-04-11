import { Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import DatePickerFormItem from 'src/view/shared/form/items/DatePickerFormItem';
import GradientTitle from 'src/view/shared/components/GradientTitle';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import MDBox from 'src/mui/components/MDBox';
import TagAutocompleteFormItem from 'src/view/tag/autocomplete/TagAutocompleteFormItem';
import TextAreaFormItem from 'src/view/shared/form/items/TextAreaFormItem';

function NewHighlightLayout(props) {
  const { title, hiddenImpossibleFields } = props;
  return (
    <MDBox px={0.8}>
      <Grid spacing={1.6} container>
        <Grid item xs={12}>
          <GradientTitle>
            {title ?? i18n('entities.highlight.new.title')}
          </GradientTitle>
        </Grid>
        <Grid item xs={12}>
          <Grid spacing={1.6} container>
            <Grid item xs={12}>
              <InputFormItem
                name="title"
                label={i18n(
                  'entities.highlight.fields.title',
                )}
                variant="standard"
                required={true}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <InputFormItem
                name="source"
                label={i18n(
                  'entities.highlight.fields.source',
                )}
                variant="standard"
                required={true}
              />
            </Grid>
            <Grid item xs={12}>
              <TextAreaFormItem
                name="description"
                label={i18n(
                  'entities.highlight.fields.description',
                )}
                variant="standard"
                required={true}
              />
            </Grid>
            <Grid item xs={12}>
              <TagAutocompleteFormItem
                name="tags"
                label={i18n(
                  'entities.highlight.fields.tags',
                )}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default NewHighlightLayout;

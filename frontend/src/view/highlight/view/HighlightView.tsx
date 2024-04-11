import { Card, Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import CreationInfo from 'src/view/shared/view/CreationInfo';
import HighlightService from 'src/modules/highlight/highlightService';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import TagAutocompleteForm from 'src/view/tag/autocomplete/TagAutocompleteForm';
import TextViewItem from 'src/view/shared/view/TextViewItem';

function HighlightView(props) {
  const { record } = props;

  return (
    <Grid container spacing={1.6}>
      <Grid lg={7} xs={12} item>
        <Card sx={{ height: '100%' }}>
          <MDBox p={2.4} topBorder>
            <Grid spacing={1.6} container>
              <Grid xs={12} item>
                <MDTypography variant="h3">
                  {record.title}
                </MDTypography>
              </Grid>
              <Grid xs={12} item>
                <TextViewItem
                  label={i18n(
                    'entities.highlight.fields.source',
                  )}
                  value={record.source}
                />
              </Grid>
              <Grid xs={12} item>
                <TextViewItem
                  label={i18n(
                    'entities.highlight.fields.description',
                  )}
                  value={record.description}
                  multiline
                />
              </Grid>
              <Grid xs={12} item>
                <CreationInfo {...props} />
              </Grid>
            </Grid>
          </MDBox>
        </Card>
      </Grid>
      <Grid lg={5} xs={12} item>
        <Card>
          <MDBox p={2.4} topBorder>
            <Grid spacing={1.6} container>
              <Grid xs={12} item>
                <MDTypography variant="h5">
                  {i18n('entities.highlight.fields.tags')}
                </MDTypography>
              </Grid>
              <Grid xs={12} item>
                <TagAutocompleteForm
                  name="tags"
                  id={record.id}
                  tags={record.tags}
                  handleService={HighlightService.tags}
                />
              </Grid>
            </Grid>
          </MDBox>
        </Card>
      </Grid>
    </Grid>
  );
}

export default HighlightView;

import { Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import CreationInfo from 'src/view/shared/view/CreationInfo';
import HtmlViewItem from 'src/view/shared/view/HtmlViewItem';
import Spinner from 'src/view/shared/Spinner';
import TextViewItem from 'src/view/shared/view/TextViewItem';

function EmailTemplateView(props) {
  const renderView = () => {
    const { record } = props;

    return (
      <Grid spacing={1.6} container>
        <Grid xs={12} item>
          <TextViewItem
            label={i18n(
              'entities.emailTemplate.fields.name',
            )}
            value={record.name}
          />
        </Grid>
        <Grid xs={12} item>
          <TextViewItem
            label={i18n(
              'entities.emailTemplate.fields.fromEmailAddress',
            )}
            value={record.fromEmailAddress}
          />
        </Grid>
        <Grid xs={12} item>
          <TextViewItem
            label={i18n(
              'entities.emailTemplate.fields.subject',
            )}
            value={record.subject}
          />
        </Grid>
        <Grid xs={12} item>
          <HtmlViewItem
            label={i18n(
              'entities.emailTemplate.fields.body',
            )}
            value={record.body}
          />
        </Grid>
        <Grid xs={12} item>
          <CreationInfo {...props} />
        </Grid>
      </Grid>
    );
  };

  const { record, loading } = props;

  if (loading || !record) {
    return <Spinner />;
  }

  return renderView();
}

export default EmailTemplateView;

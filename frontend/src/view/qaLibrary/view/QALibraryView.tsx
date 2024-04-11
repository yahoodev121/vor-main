import Spinner from 'src/view/shared/Spinner';
import { i18n } from 'src/i18n';
import TextViewItem from 'src/view/shared/view/TextViewItem';
import { Grid } from '@mui/material';
import CreationInfo from 'src/view/shared/view/CreationInfo';

function QALibraryView(props) {
  const renderView = () => {
    const { record } = props;

    return (
      <Grid spacing={1.6} container>
        <Grid item xs={12}>
          <TextViewItem
            label={i18n('entities.qaLibrary.fields.question')}
            value={record.question}
          />
        </Grid>
        <Grid item xs={12}>
          <TextViewItem
            label={i18n(
              'entities.qaLibrary.fields.answer',
            )}
            value={record.answer}
          />
        </Grid>
        <Grid item xs={12}>
          <TextViewItem
            label={i18n(
              'entities.qaLibrary.fields.aiKnowledgebase',
            )}
            value={record.aiKnowledgebase}
          />
        </Grid>
        <Grid item xs={12}>
          <TextViewItem
            label={i18n(
              'entities.qaLibrary.fields.expirationDate',
            )}
            value={record.expirationDate}
          />
        </Grid>
        <Grid item xs={12}>
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

export default QALibraryView;

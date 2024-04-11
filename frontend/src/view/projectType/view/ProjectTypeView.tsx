import { Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import CreationInfo from 'src/view/shared/view/CreationInfo';
import CustomViewItem from 'src/view/shared/view/CustomViewItem';
import ProjectTypeListItem from 'src/view/projectType/list/ProjectTypeListItem';
import Spinner from 'src/view/shared/Spinner';

function ProjectTypeView(props) {
  const renderView = () => {
    const { record } = props;

    return (
      <Grid spacing={1.6} container>
        <Grid xs={12} item>
          <CustomViewItem
            label={i18n('entities.projectType.fields.type')}
            value={[record]}
            render={(values) =>
              values.map((value) => (
                <ProjectTypeListItem
                  key={value}
                  value={value}
                />
              ))
            }
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

export default ProjectTypeView;

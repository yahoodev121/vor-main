import { Card, Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import CreationInfo from 'src/view/shared/view/CreationInfo';
import Spinner from 'src/view/shared/Spinner';
import TextViewItem from 'src/view/shared/view/TextViewItem';
import UserSubTable from 'src/view/user/list/UserSubTable';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import UserGroupTypeViewItem from 'src/view/userGroup/view/UserGroupTypeViewItem';
import CustomViewItem from 'src/view/shared/view/CustomViewItem';

function UserGroupView(props) {
  const renderView = () => {
    const { record } = props;

    return (
      <Grid container spacing={1.6}>
        <Grid item xs={12}>
          <Card sx={{ height: '100%' }}>
            <MDBox position="relative" p={2.4} topBorder>
              <Grid spacing={1.6} container>
                <Grid item md={6} xs={12}>
                  <MDTypography variant="h5">
                    {record.name}
                  </MDTypography>
                </Grid>
                <Grid item md={6} xs={12}>
                  <CustomViewItem
                    label={i18n(
                      'entities.userGroup.fields.type',
                    )}
                    value={[record.type]}
                    render={(values) =>
                      values.map((value) => (
                        <UserGroupTypeViewItem
                          key={`user-group-type-${value}`}
                          value={value}
                        />
                      ))
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextViewItem
                    label={i18n(
                      'entities.userGroup.fields.description',
                    )}
                    value={record.description}
                    multiline
                  />
                </Grid>
                <Grid item xs={12}>
                  <CreationInfo {...props} />
                </Grid>
              </Grid>
            </MDBox>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <UserSubTable groupId={record.id} />
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

export default UserGroupView;

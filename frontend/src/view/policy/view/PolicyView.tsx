import { Card, Grid } from '@mui/material';
import { DEFAULT_MOMENT_FORMAT } from 'src/config/common';
import { i18n } from 'src/i18n';
import { POLICY_TYPES } from 'src/modules/policy/policyEnumerators';
import CreationInfo from 'src/view/shared/view/CreationInfo';
import FilesViewItem from 'src/view/shared/view/FilesViewItem';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import moment from 'moment';
import NoteViewItem from 'src/view/note/view/NoteViewItem';
import PolicyService from 'src/modules/policy/policyService';
import PolicyVersions from 'src/view/policy/view/PolicyVersions';
import Spinner from 'src/view/shared/Spinner';
import TagAutocompleteForm from 'src/view/tag/autocomplete/TagAutocompleteForm';
import TextViewItem from 'src/view/shared/view/TextViewItem';
import UserViewItem from 'src/view/user/view/UserViewItem';

function PolicyView(props) {
  const renderView = () => {
    const { record } = props;

    return (
      <Grid container spacing={1.6}>
        <Grid item md={8} xs={12}>
          <Card sx={{ height: '100%' }}>
            <MDBox position="relative" p={2.4} topBorder>
              <Grid spacing={1.6} container>
                <Grid item xs={12}>
                  <MDBox
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <MDTypography variant="h3">
                      {record.name}
                    </MDTypography>
                    <MDTypography
                      variant="button"
                      fontWeight="bold"
                      color="secondary"
                    >
                      {`v${record.version}`}
                    </MDTypography>
                  </MDBox>
                </Grid>
                <Grid xs={12} item>
                  <TextViewItem
                    label={i18n(
                      'entities.policy.fields.type',
                    )}
                    value={
                      record.type &&
                      i18n(
                        `entities.policy.enumerators.type.${record.type}`,
                      )
                    }
                  />
                </Grid>
                <Grid xs={12} item>
                  <TextViewItem
                    label={i18n(
                      'entities.policy.fields.description',
                    )}
                    value={record.description}
                    multiline
                  />
                </Grid>
                <Grid md={6} xs={12} item>
                  <TextViewItem
                    label={i18n(
                      'entities.policy.fields.lastPublishedDate',
                    )}
                    value={
                      record.lastPublishedDate
                        ? moment(
                            record.lastPublishedDate,
                          ).format(DEFAULT_MOMENT_FORMAT)
                        : null
                    }
                  />
                </Grid>
                <Grid md={6} xs={12} item>
                  <UserViewItem
                    label={i18n(
                      'entities.policy.fields.publishedBy',
                    )}
                    value={record.publishedBy}
                  />
                </Grid>
                {record.type === POLICY_TYPES.DOCUMENT && (
                  <Grid xs={12} item>
                    <FilesViewItem
                      label={i18n(
                        'entities.policy.fields.attachment',
                      )}
                      value={record.attachment}
                    />
                  </Grid>
                )}
                {record.type === POLICY_TYPES.LINK && (
                  <Grid xs={12} item>
                    <TextViewItem
                      label={i18n(
                        'entities.policy.fields.link',
                      )}
                      value={record.link}
                    />
                  </Grid>
                )}
                <Grid xs={12} item>
                  <CreationInfo {...props} />
                </Grid>
              </Grid>
            </MDBox>
          </Card>
        </Grid>
        <Grid item md={4} xs={12}>
          <Grid height="100%" container>
            <Grid item xs={12} pb={1.6}>
              <Card sx={{ height: '100%' }}>
                <MDBox p={2.4} topBorder>
                  <Grid container spacing={1.6}>
                    <Grid item xs={12}>
                      <MDTypography variant="h5">
                        {i18n(
                          'entities.policy.fields.tags',
                        )}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12}>
                      <TagAutocompleteForm
                        name="tags"
                        id={record.policy || record.id}
                        handleService={PolicyService.tags}
                        tags={record.tags}
                      />
                    </Grid>
                  </Grid>
                </MDBox>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card sx={{ height: '100%' }}>
                <MDBox p={2.4} topBorder>
                  <Grid container spacing={1.6}>
                    <Grid item xs={12}>
                      <MDTypography variant="h5">
                        {i18n(
                          'entities.policy.fields.notes',
                        )}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12}>
                      <NoteViewItem
                        label={i18n(
                          'entities.policy.fields.notes',
                        )}
                        value={record.notes}
                        hiddenLabel
                      />
                    </Grid>
                  </Grid>
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Card sx={{ height: '100%' }}>
            <MDBox p={2.4} topBorder>
              <Grid spacing={1.6} container>
                <Grid item xs={12}>
                  <MDBox
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <MDTypography variant="h5">
                      {i18n(
                        'entities.policy.fields.version',
                      )}
                    </MDTypography>
                  </MDBox>
                </Grid>
                <Grid item xs={12}>
                  <PolicyVersions
                    policy={record.policy || record.id}
                    version={record.version}
                  />
                </Grid>
              </Grid>
            </MDBox>
          </Card>
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

export default PolicyView;

import { Card, Grid } from '@mui/material';
import { DEFAULT_MOMENT_FORMAT_DATE_ONLY } from 'src/config/common';
import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import CampaignInstanceViewItem from 'src/view/campaignInstance/view/CampaignInstanceViewItem';
import ClientCategoryViewItem from 'src/view/clientCategory/view/ClientCategoryViewItem';
import ClientRatingViewItem from 'src/view/client/view/ClientRatingViewItem';
import ClientService from 'src/modules/client/clientService';
import ClientStatusViewItem from 'src/view/client/view/ClientStatusViewItem';
import CreationInfo from 'src/view/shared/view/CreationInfo';
import CustomViewItem from 'src/view/shared/view/CustomViewItem';
import FilesViewItem from 'src/view/shared/view/FilesViewItem';
import HighlightsViewItem from 'src/view/highlight/view/HighlightsViewItem';
import LogoViewItem from 'src/view/shared/view/LogoViewItem';
import MDBadgeDot from 'src/mui/components/MDBadgeDot';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import moment from 'moment';
import RiskViewTable from 'src/view/risk/view/RiskViewTable';
import Spinner from 'src/view/shared/Spinner';
import TagAutocompleteForm from 'src/view/tag/autocomplete/TagAutocompleteForm';
import TaskViewItem from 'src/view/task/view/TaskViewItem';
import TextViewItem from 'src/view/shared/view/TextViewItem';
import UserViewItem from 'src/view/user/view/UserViewItem';

function ClientView(props) {
  const { sidenavColor } = selectMuiSettings();
  const renderView = () => {
    const { record } = props;

    return (
      <Grid spacing={1.6} container>
        <Grid item md={8} xs={12}>
          <Card sx={{ height: '100%' }}>
            <MDBox position="relative" p={2.4} topBorder>
              <MDTypography
                position="absolute"
                top={0}
                right={0}
                p={1.6}
                textAlign="right"
                variant="button"
                color="text"
                fontWeight="bold"
              >{`# ${record.reference}`}</MDTypography>
              <Grid container spacing={1.6}>
                <Grid item md={6} xs={12}>
                  <MDTypography variant="h3">
                    {record.name}
                  </MDTypography>
                </Grid>
                <Grid item md={6} xs={12}>
                  <ClientCategoryViewItem
                    label={i18n(
                      'entities.client.fields.category',
                    )}
                    value={record.category}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextViewItem
                    label={i18n(
                      'entities.client.fields.description',
                    )}
                    value={record.description}
                    multiline
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <CustomViewItem
                    label={i18n(
                      'entities.client.fields.status',
                    )}
                    value={[record.status]}
                    render={(values) =>
                      values.map((value) => (
                        <ClientStatusViewItem
                          key={value}
                          value={value}
                        />
                      ))
                    }
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <CustomViewItem
                    label={i18n(
                      'entities.client.fields.rating',
                    )}
                    value={[record.rating]}
                    render={(values) =>
                      values.map((value) => (
                        <ClientRatingViewItem
                          key={value}
                          value={value}
                        />
                      ))
                    }
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextViewItem
                    label={i18n(
                      'entities.client.fields.industry',
                    )}
                    value={
                      record.industry &&
                      i18n(
                        `entities.client.enumerators.industry.${record.industry}`,
                      )
                    }
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <CustomViewItem
                    label={i18n(
                      'entities.client.fields.dataProcessed',
                    )}
                    value={record.dataProcessed}
                    render={(values) =>
                      (values || []).map((value) => (
                        <MDBadgeDot
                          key={value}
                          width="max-content"
                          badgeContent={
                            value
                              ? i18n(
                                  `entities.client.enumerators.dataProcessed.${value}`,
                                )
                              : null
                          }
                          color={sidenavColor}
                          variant="contained"
                          size="md"
                        />
                      ))
                    }
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextViewItem
                    label={i18n(
                      'entities.client.fields.dateOnboarded',
                    )}
                    value={
                      record.dateOnboarded &&
                      moment(record.dateOnboarded).format(
                        DEFAULT_MOMENT_FORMAT_DATE_ONLY,
                      )
                    }
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextViewItem
                    label={i18n(
                      'entities.client.fields.dateOffboarded',
                    )}
                    value={
                      record.dateOffboarded &&
                      moment(record.dateOffboarded).format(
                        DEFAULT_MOMENT_FORMAT_DATE_ONLY,
                      )
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <CreationInfo {...props} />
                </Grid>
              </Grid>
            </MDBox>
          </Card>
        </Grid>
        <Grid item md={4} xs={12}>
          <Grid height="100%" container>
            <Grid xs={12} pb={1.6} item>
              <Card sx={{ height: '100%' }}>
                <MDBox p={2.4} topBorder>
                  <Grid spacing={1.6} container>
                    <Grid xs={12} item>
                      <MDTypography variant="h5">
                        {i18n(
                          'entities.client.fields.logo',
                        )}
                      </MDTypography>
                    </Grid>
                    <Grid xs={12} item>
                      <LogoViewItem
                        label={i18n(
                          'entities.client.fields.logo',
                        )}
                        value={record.logo}
                        hiddenLabel
                      />
                    </Grid>
                  </Grid>
                </MDBox>
              </Card>
            </Grid>
            <Grid xs={12} item>
              <Card sx={{ height: '100%' }}>
                <MDBox p={2.4} topBorder>
                  <Grid spacing={1.6} container>
                    <Grid xs={12} item>
                      <MDTypography variant="h5">
                        {i18n(
                          'entities.client.fields.tags',
                        )}
                      </MDTypography>
                    </Grid>
                    <Grid xs={12} item>
                      <TagAutocompleteForm
                        id={record.id}
                        handleService={ClientService.tags}
                        tags={record.tags}
                      />
                    </Grid>
                  </Grid>
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={4} xs={12}>
          <Card sx={{ height: '100%' }}>
            <MDBox p={2.4} topBorder>
              <Grid container spacing={1.6}>
                <Grid item xs={12}>
                  <MDTypography variant="h5">
                    {i18n(
                      'entities.client.sections.contactInformation',
                    )}
                  </MDTypography>
                </Grid>
                <Grid item xs={12}>
                  <UserViewItem
                    label={i18n(
                      'entities.client.fields.users',
                    )}
                    value={record.users}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextViewItem
                    label={i18n(
                      'entities.client.fields.infoSecEmail',
                    )}
                    value={record.infoSecEmail}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextViewItem
                    label={i18n(
                      'entities.client.fields.infoSecPhoneNumber',
                    )}
                    value={record.infoSecPhoneNumber}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextViewItem
                    label={i18n(
                      'entities.client.fields.privacyEmail',
                    )}
                    value={record.privacyEmail}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextViewItem
                    label={i18n(
                      'entities.client.fields.privacyPhoneNumber',
                    )}
                    value={record.privacyPhoneNumber}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextViewItem
                    label={i18n(
                      'entities.client.fields.address',
                    )}
                    value={record.address}
                    multiline
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextViewItem
                    label={i18n(
                      'entities.client.fields.website',
                    )}
                    value={record.website}
                  />
                </Grid>
              </Grid>
            </MDBox>
          </Card>
        </Grid>
        <Grid item md={8} xs={12}>
          <Grid container height="100%">
            <Grid item xs={12} pb={1.6}>
              <Card sx={{ height: '100%' }}>
                <MDBox p={2.4} topBorder>
                  <Grid container spacing={1.6}>
                    <Grid item xs={12}>
                      <MDTypography variant="h5">
                        {i18n(
                          'entities.client.sections.business',
                        )}
                      </MDTypography>
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextViewItem
                        label={i18n(
                          'entities.client.fields.location',
                        )}
                        value={
                          record.location &&
                          i18n(
                            `entities.client.enumerators.location.${record.location}`,
                          )
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FilesViewItem
                        label={i18n(
                          'entities.client.fields.contract',
                        )}
                        value={record.contract}
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
                          'entities.client.sections.compliance',
                        )}
                      </MDTypography>
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextViewItem
                        label={i18n(
                          'entities.client.fields.gdprRopa',
                        )}
                        value={record.gdprRopa}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FilesViewItem
                        label={i18n(
                          'entities.client.fields.documentation',
                        )}
                        value={record.documentation}
                      />
                    </Grid>
                  </Grid>
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Card id="risks-on-client">
            <RiskViewTable value={record.risks} />
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card id="tasks-on-client">
            <TaskViewItem value={record.tasks} />
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CampaignInstanceViewItem
              ownerClient={record.id}
            />
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card id="highlights-on-client">
            <HighlightsViewItem ownerClient={record.id} />
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

export default ClientView;

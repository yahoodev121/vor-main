import { Card, Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import ClientViewItem from 'src/view/client/view/ClientViewItem';
import CreationInfo from 'src/view/shared/view/CreationInfo';
import CustomViewItem from 'src/view/shared/view/CustomViewItem';
import FilesViewItem from 'src/view/shared/view/FilesViewItem';
import HighlightViewItem from 'src/view/highlight/view/HighlightViewItem';
import HorizontalAccordion from 'src/view/shared/HorizontalAccordion';
import MDBadge from 'src/mui/components/MDBadge';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import NewsArticleViewItem from 'src/view/newsArticle/view/NewsArticleViewItem';
import NoteViewItem from 'src/view/note/view/NoteViewItem';
import PolicyTemplateViewItem from 'src/view/policyTemplate/view/PolicyTemplateViewItem';
import PolicyViewItem from 'src/view/policy/view/PolicyViewItem';
import ProductViewItem from 'src/view/product/view/ProductViewItem';
import ProgramControlViewItem from 'src/view/programControl/view/ProgramControlViewItem';
import ProgramRequirementViewItem from 'src/view/programRequirement/view/ProgramRequirementViewItem';
import RiskCategoryViewItem from 'src/view/riskCategory/view/RiskCategoryViewItem';
import RiskImpactViewItem from 'src/view/risk/view/RiskImpactViewItem';
import RiskInherentScoreViewItem from 'src/view/risk/view/RiskInherentScoreViewItem';
import RiskLikelihoodViewItem from 'src/view/risk/view/RiskLikelihoodViewItem';
import RiskService from 'src/modules/risk/riskService';
import RiskStatusViewItem from 'src/view/risk/view/RiskStatusViewItem';
import Spinner from 'src/view/shared/Spinner';
import TagAutocompleteForm from 'src/view/tag/autocomplete/TagAutocompleteForm';
import TaskViewItem from 'src/view/task/view/TaskViewItem';
import TextViewItem from 'src/view/shared/view/TextViewItem';
import UserViewItem from 'src/view/user/view/UserViewItem';
import VendorViewItem from 'src/view/vendor/view/VendorViewItem';
import ProjectViewItem from 'src/view/project/view/ProjectViewItem';

function RiskView(props) {
  const renderView = () => {
    const { record } = props;
    const { sidenavColor } = selectMuiSettings();

    const length =
      record.vendors.length +
      record.clients.length +
      record.newsArticles.length +
      record.controls.length +
      record.requirements.length +
      record.highlights.length +
      record.products.length +
      record.policies.length +
      record.policyTemplates.length +
      record.projects.length;

    return (
      <Grid container spacing={1.6}>
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
              <Grid spacing={1.6} container>
                <Grid item md={6} xs={12}>
                  <MDTypography variant="h5">
                    {record.title}
                  </MDTypography>
                </Grid>
                <Grid item md={6} xs={12}>
                  <RiskCategoryViewItem
                    label={i18n(
                      'entities.risk.fields.category',
                    )}
                    value={record.category}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextViewItem
                    label={i18n(
                      'entities.risk.fields.description',
                    )}
                    value={record.description}
                    multiline
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <CustomViewItem
                    label={i18n(
                      'entities.risk.fields.status',
                    )}
                    value={[record.status]}
                    render={(values) =>
                      values.map((value) => (
                        <RiskStatusViewItem
                          key={value}
                          value={value}
                        />
                      ))
                    }
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <UserViewItem
                    label={i18n(
                      'entities.risk.fields.owner',
                    )}
                    value={record.owner}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <CustomViewItem
                    label={i18n(
                      'entities.risk.fields.likelihood',
                    )}
                    value={[record.likelihood]}
                    render={(values) =>
                      values.map((value) => (
                        <RiskLikelihoodViewItem
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
                      'entities.risk.fields.impact',
                    )}
                    value={[record.impact]}
                    render={(values) =>
                      values.map((value) => (
                        <RiskImpactViewItem
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
                      'entities.risk.fields.inherentScore',
                    )}
                    value={[record.inherentScore]}
                    render={(value) =>
                      value.map((score) => (
                        <RiskInherentScoreViewItem
                          key={score}
                          value={score}
                        />
                      ))
                    }
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextViewItem
                    label={i18n(
                      'entities.risk.fields.residualScore',
                    )}
                    value={record.residualScore}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextViewItem
                    label={i18n(
                      'entities.risk.fields.cost',
                    )}
                    value={record.cost}
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
            <Grid item xs={12} pb={1.6}>
              <Card sx={{ height: '100%' }}>
                <MDBox p={2.4} topBorder>
                  <Grid container spacing={1.6}>
                    <Grid item xs={12}>
                      <MDTypography variant="h5">
                        {i18n('entities.risk.fields.tags')}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12}>
                      <TagAutocompleteForm
                        name="tags"
                        id={record.id}
                        handleService={RiskService.tags}
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
                        {i18n('entities.risk.fields.notes')}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12}>
                      <NoteViewItem
                        label={i18n(
                          'entities.risk.fields.notes',
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
          <Card>
            <MDBox p={2.4} topBorder>
              <Grid container spacing={0.6}>
                <Grid item xs={12}>
                  {length ? (
                    <MDBadge
                      badgeContent={length}
                      circular
                      size="xs"
                      color="success"
                      variant="outlined"
                      paddingLeft={20}
                      border
                    >
                      <MDTypography variant="h5">
                        {i18n('common.links')}
                      </MDTypography>
                    </MDBadge>
                  ) : (
                    <MDTypography variant="h5">
                      {i18n('common.links')}
                    </MDTypography>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <MDBox
                    display="flex"
                    flexWrap="wrap"
                    alignItems="center"
                  >
                    <HorizontalAccordion
                      title={i18n(
                        'entities.risk.fields.vendors',
                      )}
                      badgeColor={sidenavColor}
                      length={record.vendors.length}
                    >
                      <VendorViewItem
                        label={i18n(
                          'entities.risk.fields.vendors',
                        )}
                        value={record.vendors}
                        hiddenLabel
                      />
                    </HorizontalAccordion>
                    <HorizontalAccordion
                      title={i18n(
                        'entities.risk.fields.clients',
                      )}
                      badgeColor={sidenavColor}
                      length={record.clients.length}
                    >
                      <ClientViewItem
                        label={i18n(
                          'entities.risk.fields.clients',
                        )}
                        value={record.clients}
                        hiddenLabel
                      />
                    </HorizontalAccordion>
                    <HorizontalAccordion
                      title={i18n(
                        'entities.risk.fields.newsArticles',
                      )}
                      badgeColor={sidenavColor}
                      length={record.newsArticles.length}
                    >
                      <NewsArticleViewItem
                        label={i18n(
                          'entities.risk.fields.newsArticles',
                        )}
                        value={record.newsArticles}
                        hiddenLabel
                      />
                    </HorizontalAccordion>
                    <HorizontalAccordion
                      title={i18n(
                        'entities.risk.fields.controls',
                      )}
                      badgeColor={sidenavColor}
                      length={record.controls.length}
                    >
                      <ProgramControlViewItem
                        label={i18n(
                          'entities.risk.fields.controls',
                        )}
                        value={record.controls}
                        hiddenLabel
                      />
                    </HorizontalAccordion>
                    <HorizontalAccordion
                      title={i18n(
                        'entities.risk.fields.requirements',
                      )}
                      badgeColor={sidenavColor}
                      length={record.requirements.length}
                    >
                      <ProgramRequirementViewItem
                        label={i18n(
                          'entities.risk.fields.requirements',
                        )}
                        value={record.requirements}
                        hiddenLabel
                      />
                    </HorizontalAccordion>
                    <HorizontalAccordion
                      title={i18n(
                        'entities.risk.fields.highlights',
                      )}
                      badgeColor={sidenavColor}
                      length={record.highlights.length}
                    >
                      <HighlightViewItem
                        label={i18n(
                          'entities.risk.fields.highlights',
                        )}
                        value={record.highlights}
                        hiddenLabel
                      />
                    </HorizontalAccordion>
                    <HorizontalAccordion
                      title={i18n(
                        'entities.risk.fields.products',
                      )}
                      badgeColor={sidenavColor}
                      length={record.products.length}
                    >
                      <ProductViewItem
                        label={i18n(
                          'entities.risk.fields.products',
                        )}
                        value={record.products}
                        hiddenLabel
                      />
                    </HorizontalAccordion>
                    <HorizontalAccordion
                      title={i18n(
                        'entities.risk.fields.policies',
                      )}
                      badgeColor={sidenavColor}
                      length={record.policies.length}
                    >
                      <PolicyViewItem
                        label={i18n(
                          'entities.risk.fields.policies',
                        )}
                        value={record.policies}
                        hiddenLabel
                      />
                    </HorizontalAccordion>
                    <HorizontalAccordion
                      title={i18n(
                        'entities.risk.fields.policyTemplates',
                      )}
                      badgeColor={sidenavColor}
                      length={record.policyTemplates.length}
                    >
                      <PolicyTemplateViewItem
                        label={i18n(
                          'entities.risk.fields.policyTemplates',
                        )}
                        value={record.policyTemplates}
                        hiddenLabel
                      />
                    </HorizontalAccordion>
                    <HorizontalAccordion
                      title={i18n(
                        'entities.risk.fields.projects',
                      )}
                      badgeColor={sidenavColor}
                      length={record.projects.length}
                    >
                      <ProjectViewItem
                        label={i18n(
                          'entities.risk.fields.projects',
                        )}
                        value={record.projects}
                        hiddenLabel
                      />
                    </HorizontalAccordion>
                  </MDBox>
                </Grid>
              </Grid>
            </MDBox>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <MDBox p={2.4} topBorder>
              <Grid spacing={1.6} container>
                <Grid item xs={12}>
                  <MDTypography variant="h5">
                    {i18n(
                      'entities.risk.fields.attachments',
                    )}
                  </MDTypography>
                </Grid>
                <Grid item xs={12}>
                  <FilesViewItem
                    label={i18n(
                      'entities.risk.fields.attachments',
                    )}
                    value={record.attachments}
                    hiddenLabel
                  />
                </Grid>
              </Grid>
            </MDBox>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card id="tasks-on-risk">
            <TaskViewItem value={record.tasks} />
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

export default RiskView;

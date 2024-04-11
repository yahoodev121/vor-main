import { Card, Grid } from '@mui/material';
import { DEFAULT_MOMENT_FORMAT } from 'src/config/common';
import { getAbsoluteDateTimeByHour } from 'src/modules/utils';
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
import moment from 'moment';
import NewsArticleViewItem from 'src/view/newsArticle/view/NewsArticleViewItem';
import NoteViewItem from 'src/view/note/view/NoteViewItem';
import PolicyTemplateViewItem from 'src/view/policyTemplate/view/PolicyTemplateViewItem';
import PolicyViewItem from 'src/view/policy/view/PolicyViewItem';
import ProductViewItem from 'src/view/product/view/ProductViewItem';
import ProgramControlViewItem from 'src/view/programControl/view/ProgramControlViewItem';
import RiskViewItem from 'src/view/risk/view/RiskViewItem';
import Spinner from 'src/view/shared/Spinner';
import TagAutocompleteForm from 'src/view/tag/autocomplete/TagAutocompleteForm';
import TaskInstanceService from 'src/modules/taskInstance/taskInstanceService';
import TaskListViewItem from 'src/view/taskList/view/TaskListViewItem';
import TaskPriorityViewItem from 'src/view/taskPriority/view/TaskPriorityViewItem';
import TaskService from 'src/modules/task/taskService';
import TaskStatusViewItem from 'src/view/task/view/TaskStatusViewItem';
import TextViewItem from 'src/view/shared/view/TextViewItem';
import UserViewItem from 'src/view/user/view/UserViewItem';
import VendorViewItem from 'src/view/vendor/view/VendorViewItem';

function TaskView(props) {
  const renderView = () => {
    const { record, isInstance } = props;
    const { sidenavColor } = selectMuiSettings();
    const length =
      record.risks?.length +
        record.vendors?.length +
        record.clients?.length +
        record.newsArticles?.length +
        record.controls?.length +
        record.highlights?.length +
        record.products?.length +
        record.policies?.length +
        record.policyTemplates?.length +
        record.projects?.length || 0;

    return (
      <Grid container spacing={1}>
        <Grid item lg={8} md={8} sm={12} xs={12}>
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
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <MDTypography variant="h5">
                    {record.title}
                  </MDTypography>
                </Grid>

                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <TaskListViewItem
                    label={i18n(
                      'entities.task.fields.taskList',
                    )}
                    value={record.taskList}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextViewItem
                    label={i18n(
                      'entities.task.fields.description',
                    )}
                    value={record.description}
                    multiline
                  />
                </Grid>

                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <CustomViewItem
                    label={i18n(
                      'entities.task.fields.status',
                    )}
                    value={[record.status]}
                    render={(values) =>
                      values.map((value) => (
                        <TaskStatusViewItem
                          key={value}
                          value={value}
                        />
                      ))
                    }
                  />
                </Grid>

                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <TaskPriorityViewItem
                    label={i18n(
                      'entities.task.fields.priority',
                    )}
                    value={record.priority}
                  />
                </Grid>

                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <UserViewItem
                    label={i18n(
                      'entities.task.fields.owner',
                    )}
                    value={record.owner}
                  />
                </Grid>

                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <UserViewItem
                    label={i18n(
                      'entities.task.fields.approver',
                    )}
                    value={record.approver}
                  />
                </Grid>

                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <TextViewItem
                    label={i18n(
                      'entities.task.fields.dueDate',
                    )}
                    value={moment(
                      getAbsoluteDateTimeByHour(
                        record.dueDate,
                      ),
                    ).format(DEFAULT_MOMENT_FORMAT)}
                  />
                </Grid>

                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <CustomViewItem
                    label={i18n(
                      'entities.task.fields.repeat',
                    )}
                    value={[record.repeat]}
                    render={(values) =>
                      values.map((value) => (
                        <MDTypography
                          key={value}
                          variant="button"
                          fontWeight={
                            record.repeat === 'Never'
                              ? 'regular'
                              : 'bold'
                          }
                        >
                          {record.repeat &&
                            i18n(
                              `entities.task.enumerators.repeat.${record.repeat}`,
                            )}
                        </MDTypography>
                      ))
                    }
                  />
                </Grid>

                {record.status === 'Complete' && (
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <TextViewItem
                      label={i18n(
                        'entities.task.fields.completedDate',
                      )}
                      value={moment(
                        record.completedDate,
                      ).format(DEFAULT_MOMENT_FORMAT)}
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
        <Grid item lg={4} md={4} sm={12} xs={12}>
          <Grid height="100%" container>
            <Grid item xs={12} pb={1.6}>
              <Card sx={{ height: '100%' }}>
                <MDBox p={2.4} topBorder>
                  <Grid container spacing={1.6}>
                    <Grid item xs={12}>
                      <MDTypography variant="h5">
                        {i18n('entities.task.fields.tags')}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12}>
                      <TagAutocompleteForm
                        name="tags"
                        id={record.id}
                        handleService={
                          isInstance
                            ? TaskInstanceService.tags
                            : TaskService.tags
                        }
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
                        {i18n('entities.task.fields.notes')}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12}>
                      <NoteViewItem
                        label={i18n(
                          'entities.task.fields.notes',
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
                        'entities.task.fields.risks',
                      )}
                      badgeColor={sidenavColor}
                      length={record.risks.length}
                    >
                      <RiskViewItem
                        label={i18n(
                          'entities.task.fields.risks',
                        )}
                        value={record.risks}
                        hiddenLabel
                      />
                    </HorizontalAccordion>
                    <HorizontalAccordion
                      title={i18n(
                        'entities.task.fields.vendors',
                      )}
                      badgeColor={sidenavColor}
                      length={record.vendors.length}
                    >
                      <VendorViewItem
                        label={i18n(
                          'entities.task.fields.vendors',
                        )}
                        value={record.vendors}
                        hiddenLabel
                      />
                    </HorizontalAccordion>
                    <HorizontalAccordion
                      title={i18n(
                        'entities.task.fields.clients',
                      )}
                      badgeColor={sidenavColor}
                      length={record.clients.length}
                    >
                      <ClientViewItem
                        label={i18n(
                          'entities.task.fields.clients',
                        )}
                        value={record.clients}
                        hiddenLabel
                      />
                    </HorizontalAccordion>
                    <HorizontalAccordion
                      title={i18n(
                        'entities.task.fields.newsArticles',
                      )}
                      badgeColor={sidenavColor}
                      length={record.newsArticles.length}
                    >
                      <NewsArticleViewItem
                        label={i18n(
                          'entities.task.fields.newsArticles',
                        )}
                        value={record.newsArticles}
                        hiddenLabel
                      />
                    </HorizontalAccordion>
                    <HorizontalAccordion
                      title={i18n(
                        'entities.task.fields.controls',
                      )}
                      badgeColor={sidenavColor}
                      length={record.controls.length}
                    >
                      <ProgramControlViewItem
                        label={i18n(
                          'entities.task.fields.controls',
                        )}
                        value={record.controls}
                        hiddenLabel
                      />
                    </HorizontalAccordion>
                    <HorizontalAccordion
                      title={i18n(
                        'entities.task.fields.highlights',
                      )}
                      badgeColor={sidenavColor}
                      length={record.highlights.length}
                    >
                      <HighlightViewItem
                        label={i18n(
                          'entities.task.fields.highlights',
                        )}
                        value={record.highlights}
                        hiddenLabel
                      />
                    </HorizontalAccordion>
                    <HorizontalAccordion
                      title={i18n(
                        'entities.task.fields.products',
                      )}
                      badgeColor={sidenavColor}
                      length={record.products.length}
                    >
                      <ProductViewItem
                        label={i18n(
                          'entities.task.fields.products',
                        )}
                        value={record.products}
                        hiddenLabel
                      />
                    </HorizontalAccordion>
                    <HorizontalAccordion
                      title={i18n(
                        'entities.task.fields.policies',
                      )}
                      badgeColor={sidenavColor}
                      length={record.policies.length}
                    >
                      <PolicyViewItem
                        label={i18n(
                          'entities.task.fields.policies',
                        )}
                        value={record.policies}
                        hiddenLabel
                      />
                    </HorizontalAccordion>
                    <HorizontalAccordion
                      title={i18n(
                        'entities.task.fields.policyTemplates',
                      )}
                      badgeColor={sidenavColor}
                      length={record.policyTemplates.length}
                    >
                      <PolicyTemplateViewItem
                        label={i18n(
                          'entities.task.fields.policyTemplates',
                        )}
                        value={record.policyTemplates}
                        hiddenLabel
                      />
                    </HorizontalAccordion>
                    <HorizontalAccordion
                      title={i18n(
                        'entities.task.fields.projects',
                      )}
                      badgeColor={sidenavColor}
                      length={record.projects.length}
                    >
                      <PolicyTemplateViewItem
                        label={i18n(
                          'entities.task.fields.projects',
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
                      'entities.task.fields.attachments',
                    )}
                  </MDTypography>
                </Grid>
                <Grid item xs={12}>
                  <FilesViewItem
                    label={i18n(
                      'entities.task.fields.attachments',
                    )}
                    value={record.attachments}
                    hiddenLabel
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

export default TaskView;

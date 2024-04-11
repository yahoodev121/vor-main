import { getAbsoluteDateTimeByHour } from 'src/modules/utils';
import { Grid, Card } from '@mui/material';
import { i18n } from 'src/i18n';
import { useFormContext } from 'react-hook-form';
import { useState } from 'react';
import AccordionButton from 'src/view/shared/AccordionButton';
import ClientAutocompleteFormItem from 'src/view/client/autocomplete/ClientAutocompleteFormItem';
import ColorBadgeSelectFormItem, {
  generateColorBadgeSelectOptions,
} from 'src/view/shared/form/items/ColorBadgeSelectFormItem';
import CustomStyledSelectFormItem from 'src/view/shared/form/items/CustomStyledSelectFormItem';
import DatePickerFormItem from 'src/view/shared/form/items/DatePickerFormItem';
import FilesFormItem from 'src/view/shared/form/items/FilesFormItem';
import HighlightAutocompleteFormItem from 'src/view/highlight/autocomplete/HighlightAutocompleteFormItem';
import HorizontalAccordion from 'src/view/shared/HorizontalAccordion';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import MDBadge from 'src/mui/components/MDBadge';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import NewsArticleAutocompleteFormItem from 'src/view/newsArticle/autocomplete/NewsArticleAutocompleteFormItem';
import NoteAutocompleteFormItem from 'src/view/note/autocomplete/NoteAutocompleteFormItem';
import PolicyAutocompleteFormItem from 'src/view/policy/autocomplete/PolicyAutocompleteFormItem';
import PolicyTemplateAutocompleteFormItem from 'src/view/policyTemplate/autocomplete/PolicyTemplateAutocompleteFormItem';
import ProductAutocompleteFormItem from 'src/view/product/autocomplete/ProductAutocompleteFormItem';
import ProgramControlAutocompleteFormItem from 'src/view/programControl/autocomplete/ProgramControlAutocompleteFormItem';
import ProjectAutocompleteFormItem from 'src/view/project/autocomplete/ProjectAutocompleteFormItem';
import RiskAutocompleteFormItem from 'src/view/risk/autocomplete/RiskAutocompleteFormItem';
import Storage from 'src/security/storage';
import TagAutocompleteFormItem from 'src/view/tag/autocomplete/TagAutocompleteFormItem';
import taskEnumerators from 'src/modules/task/taskEnumerators';
import TaskListAutocompleteFormItem from 'src/view/taskList/autocomplete/TaskListAutocompleteFormItem';
import TaskPriorityAutocompleteFormItem from 'src/view/taskPriority/autocomplete/TaskPriorityAutocompleteFormItem';
import TextAreaFormItem from 'src/view/shared/form/items/TextAreaFormItem';
import UserAutocompleteFormItem from 'src/view/user/autocomplete/UserAutocompleteFormItem';
import VendorAutocompleteFormItem from 'src/view/vendor/autocomplete/VendorAutocompleteFormItem';

function EditTaskLayout(props) {
  const { initialValues } = props;
  const [visibleCompletedDate, setVisibleCompletedDate] =
    useState(initialValues.status === 'Complete');
  const onChangeStatus = (repeatVal) => {
    setVisibleCompletedDate(repeatVal === 'Complete');
  };
  const { setValue } = useFormContext();
  const [dueDate, setDueDate] = useState(
    props.record?.dueDate || null,
  );

  const isExpanded = Boolean(
    initialValues.risks?.length +
      initialValues.vendors?.length +
      initialValues.clients?.length +
      initialValues.newsArticles?.length +
      initialValues.controls?.length +
      initialValues.highlights?.length +
      initialValues.products?.length +
      initialValues.policies?.length +
      initialValues.policyTemplates?.length,
  );

  return (
    <Grid container spacing={1.6}>
      <Grid item md={8} xs={12}>
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
                    {i18n('entities.task.info')}
                  </MDTypography>
                  <MDTypography
                    variant="button"
                    color="text"
                    fontWeight="bold"
                  >
                    {`# ${initialValues.reference}`}
                  </MDTypography>
                </MDBox>
              </Grid>
              <Grid item md={6} xs={12}>
                <InputFormItem
                  name="title"
                  label={i18n('entities.task.fields.title')}
                  required={true}
                  variant="standard"
                  autoFocus
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TaskListAutocompleteFormItem
                  name="taskList"
                  label={i18n(
                    'entities.task.fields.taskList',
                  )}
                  required={true}
                  showCreate={true}
                  variant="standard"
                  mode="multiple"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextAreaFormItem
                  name="description"
                  label={i18n(
                    'entities.task.fields.description',
                  )}
                  variant="standard"
                  fullWidth
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <ColorBadgeSelectFormItem
                  name="status"
                  label={i18n(
                    'entities.task.fields.status',
                  )}
                  options={generateColorBadgeSelectOptions(
                    taskEnumerators.status,
                    taskEnumerators.statusColor,
                    'entities.task.enumerators.status',
                  )}
                  required={true}
                  variant="standard"
                  onChange={onChangeStatus}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TaskPriorityAutocompleteFormItem
                  name="priority"
                  label={i18n(
                    'entities.task.fields.priority',
                  )}
                  required={true}
                  showCreate={true}
                  variant="standard"
                  fullWidth
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <UserAutocompleteFormItem
                  name="owner"
                  label={i18n('entities.task.fields.owner')}
                  required={false}
                  showSelect={true}
                  variant="standard"
                  fullWidth
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <UserAutocompleteFormItem
                  name="approver"
                  label={i18n(
                    'entities.task.fields.approver',
                  )}
                  required={false}
                  showSelect={true}
                  variant="standard"
                  fullWidth
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <DatePickerFormItem
                  name="dueDate"
                  label={i18n(
                    'entities.task.fields.dueDate',
                  )}
                  required={false}
                  variant="standard"
                  onAccept={(value) => {
                    const newValue =
                      getAbsoluteDateTimeByHour(value);
                    setDueDate(
                      newValue?.toISOString() || null,
                    );
                    setValue('dueDate', newValue, {
                      shouldValidate: false,
                      shouldDirty: true,
                    });
                  }}
                  value={dueDate}
                  forceValue
                  showTime
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <CustomStyledSelectFormItem
                  name="repeat"
                  value={initialValues.repeat}
                  label={i18n(
                    'entities.task.fields.repeat',
                  )}
                  options={taskEnumerators.repeat.map(
                    (value) => ({
                      value,
                      label: i18n(
                        `entities.task.enumerators.repeat.${value}`,
                      ),
                      style:
                        value === 'Never'
                          ? null
                          : {
                              fontWeight: 'bold',
                            },
                    }),
                  )}
                  required={true}
                  variant="standard"
                />
              </Grid>
              {visibleCompletedDate && (
                <Grid item md={6} xs={12}>
                  <DatePickerFormItem
                    name="completedDate"
                    label={i18n(
                      'entities.task.fields.completedDate',
                    )}
                    required={false}
                    variant="standard"
                    showTime
                  />
                </Grid>
              )}
            </Grid>
          </MDBox>
        </Card>
      </Grid>
      <Grid item md={4} xs={12}>
        <MDBox position="relative" height="100%">
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
                      <TagAutocompleteFormItem name="tags" />
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
                      <NoteAutocompleteFormItem
                        name="notes"
                        label={i18n(
                          'entities.task.fields.notes',
                        )}
                        required={false}
                        showCreate={true}
                        mode="multiple"
                        variant="standard"
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
      </Grid>
      <Grid item xs={12}>
        <AccordionButton
          isExpanded={isExpanded}
          bgWhite={true}
        >
          <Grid spacing={1.6} container>
            <Grid item md={6} xs={12}>
              <Card>
                <MDBox p={2.4} topBorder>
                  <Grid container spacing={1.6}>
                    <Grid item xs={12}>
                      <MDTypography variant="h5">
                        {i18n('entities.task.fields.risks')}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12}>
                      <RiskAutocompleteFormItem
                        name="risks"
                        label={i18n(
                          'entities.task.fields.risks',
                        )}
                        mode="multiple"
                        variant="standard"
                      />
                    </Grid>
                  </Grid>
                </MDBox>
              </Card>
            </Grid>
            <Grid item md={6} xs={12}>
              <Card>
                <MDBox p={2.4} topBorder>
                  <Grid container spacing={1.6}>
                    <Grid item xs={12}>
                      <MDTypography variant="h5">
                        {i18n(
                          'entities.task.fields.vendors',
                        )}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12}>
                      <VendorAutocompleteFormItem
                        name="vendors"
                        label={i18n(
                          'entities.task.fields.vendors',
                        )}
                        mode="multiple"
                        variant="standard"
                      />
                    </Grid>
                  </Grid>
                </MDBox>
              </Card>
            </Grid>
            <Grid item md={6} xs={12}>
              <Card>
                <MDBox p={2.4} topBorder>
                  <Grid container spacing={1.6}>
                    <Grid item xs={12}>
                      <MDTypography variant="h5">
                        {i18n(
                          'entities.task.fields.clients',
                        )}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12}>
                      <ClientAutocompleteFormItem
                        name="clients"
                        label={i18n(
                          'entities.task.fields.clients',
                        )}
                        mode="multiple"
                        variant="standard"
                      />
                    </Grid>
                  </Grid>
                </MDBox>
              </Card>
            </Grid>
            <Grid item md={6} xs={12}>
              <Card>
                <MDBox p={2.4} topBorder>
                  <Grid container spacing={1.6}>
                    <Grid item xs={12}>
                      <MDTypography variant="h5">
                        {i18n(
                          'entities.task.fields.newsArticles',
                        )}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12}>
                      <NewsArticleAutocompleteFormItem
                        name="newsArticles"
                        label={i18n(
                          'entities.task.fields.newsArticles',
                        )}
                        mode="multiple"
                        variant="standard"
                      />
                    </Grid>
                  </Grid>
                </MDBox>
              </Card>
            </Grid>
            <Grid item md={6} xs={12}>
              <Card>
                <MDBox p={2.4} topBorder>
                  <Grid container spacing={1.6}>
                    <Grid item xs={12}>
                      <MDTypography variant="h5">
                        {i18n(
                          'entities.task.fields.controls',
                        )}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12}>
                      <ProgramControlAutocompleteFormItem
                        name="controls"
                        label={i18n(
                          'entities.task.fields.controls',
                        )}
                        mode="multiple"
                        variant="standard"
                      />
                    </Grid>
                  </Grid>
                </MDBox>
              </Card>
            </Grid>
            <Grid item md={6} xs={12}>
              <Card>
                <MDBox p={2.4} topBorder>
                  <Grid container spacing={1.6}>
                    <Grid item xs={12}>
                      <MDTypography variant="h5">
                        {i18n(
                          'entities.task.fields.highlights',
                        )}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12}>
                      <HighlightAutocompleteFormItem
                        name="highlights"
                        label={i18n(
                          'entities.task.fields.highlights',
                        )}
                        mode="multiple"
                        variant="standard"
                      />
                    </Grid>
                  </Grid>
                </MDBox>
              </Card>
            </Grid>
            <Grid item md={6} xs={12}>
              <Card>
                <MDBox p={2.4} topBorder>
                  <Grid container spacing={1.6}>
                    <Grid item xs={12}>
                      <MDTypography variant="h5">
                        {i18n(
                          'entities.task.fields.products',
                        )}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12}>
                      <ProductAutocompleteFormItem
                        name="products"
                        label={i18n(
                          'entities.task.fields.products',
                        )}
                        mode="multiple"
                        variant="standard"
                      />
                    </Grid>
                  </Grid>
                </MDBox>
              </Card>
            </Grid>
            <Grid item md={6} xs={12}>
              <Card>
                <MDBox p={2.4} topBorder>
                  <Grid container spacing={1.6}>
                    <Grid item xs={12}>
                      <MDTypography variant="h5">
                        {i18n(
                          'entities.task.fields.policies',
                        )}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12}>
                      <PolicyAutocompleteFormItem
                        name="policies"
                        label={i18n(
                          'entities.task.fields.policies',
                        )}
                        mode="multiple"
                        variant="standard"
                      />
                    </Grid>
                  </Grid>
                </MDBox>
              </Card>
            </Grid>
            <Grid item md={6} xs={12}>
              <Card>
                <MDBox p={2.4} topBorder>
                  <Grid container spacing={1.6}>
                    <Grid item xs={12}>
                      <MDTypography variant="h5">
                        {i18n(
                          'entities.task.fields.policyTemplates',
                        )}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12}>
                      <PolicyTemplateAutocompleteFormItem
                        name="policyTemplates"
                        label={i18n(
                          'entities.task.fields.policyTemplates',
                        )}
                        mode="multiple"
                        variant="standard"
                      />
                    </Grid>
                  </Grid>
                </MDBox>
              </Card>
            </Grid>
            <Grid item md={6} xs={12}>
              <Card>
                <MDBox p={2.4} topBorder>
                  <Grid container spacing={1.6}>
                    <Grid item xs={12}>
                      <MDTypography variant="h5">
                        {i18n(
                          'entities.task.fields.projects',
                        )}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12}>
                      <ProjectAutocompleteFormItem
                        name="projects"
                        label={i18n(
                          'entities.task.fields.projects',
                        )}
                        mode="multiple"
                        variant="standard"
                      />
                    </Grid>
                  </Grid>
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </AccordionButton>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <MDBox p={2.4} topBorder>
            <Grid container spacing={1.6}>
              <Grid item xs={12}>
                <MDTypography variant="h5">
                  {i18n('entities.task.fields.attachments')}
                </MDTypography>
              </Grid>
              <Grid item xs={12}>
                <FilesFormItem
                  name="attachments"
                  required={false}
                  storage={Storage.values.taskAttachments}
                  max={undefined}
                />
              </Grid>
            </Grid>
          </MDBox>
        </Card>
      </Grid>
    </Grid>
  );
}

export default EditTaskLayout;

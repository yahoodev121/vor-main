import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Grid,
} from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CheckboxFormItem from 'src/view/shared/form/items/CheckboxFormItem';
import EmailTemplateAutocompleteFormItem from 'src/view/emailTemplate/autocomplete/EmailTemplateAutocompleteFormItem';
import FieldSetViewItem from 'src/view/shared/view/FieldSetViewItem';
import FormWrapper from 'src/view/shared/styles/FormWrapper';
import InputNumberFormItem from 'src/view/shared/form/items/InputNumberFormItem';
import MDBox from 'src/mui/components/MDBox';
import MDButton from 'src/mui/components/MDButton';
import MDTypography from 'src/mui/components/MDTypography';
import moment from 'moment';
import ReactDOM from 'react-dom';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';

const schema = ({
  totalDaysBetweenCurrentAndDue,
  useReminderEmailAfterCampaignEnrollment,
  daysAfterCampaignEnrollment,
  useRepeatReminderEmail,
  useReminderEmailComingDue,
  useReminderEmailOverdue,
}) =>
  yup.object().shape({
    useReminderEmailAfterCampaignEnrollment:
      yupFormSchemas.boolean(
        i18n(
          'entities.campaign.fields.useReminderEmailAfterCampaignEnrollment',
        ),
      ),
    campaignEnrollmentEmailTemplate:
      yupFormSchemas.relationToOne(
        i18n(
          'entities.campaign.fields.campaignEnrollmentEmailTemplate',
        ),
        {
          required: useReminderEmailAfterCampaignEnrollment,
        },
      ),
    daysAfterCampaignEnrollment: yupFormSchemas.integer(
      i18n(
        'entities.campaign.fields.daysAfterCampaignEnrollment',
      ),
      {
        required: useReminderEmailAfterCampaignEnrollment,
        min: 1,
        max: totalDaysBetweenCurrentAndDue,
      },
    ),

    useRepeatReminderEmail: yupFormSchemas.boolean(
      i18n(
        'entities.campaign.fields.useRepeatReminderEmail',
      ),
    ),
    repeatReminderEmailTemplate:
      yupFormSchemas.relationToOne(
        i18n(
          'entities.campaign.fields.repeatReminderEmailTemplate',
        ),
        {
          required:
            useReminderEmailAfterCampaignEnrollment &&
            useRepeatReminderEmail,
        },
      ),
    intervalDaysForRepeatReminderEmail:
      yupFormSchemas.integer(
        i18n(
          'entities.campaign.fields.intervalDaysForRepeatReminderEmail',
        ),
        {
          required:
            useReminderEmailAfterCampaignEnrollment &&
            useRepeatReminderEmail,
          min: 1,
          max:
            totalDaysBetweenCurrentAndDue -
            daysAfterCampaignEnrollment,
        },
      ),

    useReminderEmailComingDue: yupFormSchemas.boolean(
      i18n(
        'entities.campaign.fields.useReminderEmailComingDue',
      ),
    ),
    emailTemplateComingDue: yupFormSchemas.relationToOne(
      i18n(
        'entities.campaign.fields.emailTemplateComingDue',
      ),
      {
        required: useReminderEmailComingDue,
      },
    ),
    daysBeforeComingDue: yupFormSchemas.integer(
      i18n('entities.campaign.fields.daysBeforeComingDue'),
      {
        required: useReminderEmailComingDue,
        min: 1,
        max: totalDaysBetweenCurrentAndDue,
      },
    ),

    useReminderEmailOverdue: yupFormSchemas.boolean(
      i18n(
        'entities.campaign.fields.useReminderEmailOverdue',
      ),
    ),
    emailTemplateOverdue: yupFormSchemas.relationToOne(
      i18n('entities.campaign.fields.emailTemplateOverdue'),
      {
        required: useReminderEmailOverdue,
      },
    ),
    daysAfterOverdue: yupFormSchemas.integer(
      i18n('entities.campaign.fields.daysAfterOverdue'),
      {
        required: useReminderEmailOverdue,
        min: 1,
        max: 90,
      },
    ),
  });

function ReminderEmailSettingsModal(props) {
  const { onClose, onConfirm, record, review } = props;
  const { sidenavColor } = selectMuiSettings();
  const [initialValues] = useState({
    useReminderEmailAfterCampaignEnrollment:
      record.useReminderEmailAfterCampaignEnrollment,
    campaignEnrollmentEmailTemplate:
      record.campaignEnrollmentEmailTemplate,
    daysAfterCampaignEnrollment:
      record.daysAfterCampaignEnrollment,

    useRepeatReminderEmail: record.useRepeatReminderEmail,
    repeatReminderEmailTemplate:
      record.repeatReminderEmailTemplate,
    intervalDaysForRepeatReminderEmail:
      record.intervalDaysForRepeatReminderEmail,

    useReminderEmailComingDue:
      record.useReminderEmailComingDue,
    emailTemplateComingDue: record.emailTemplateComingDue,
    daysBeforeComingDue: record.daysBeforeComingDue,

    useReminderEmailOverdue: record.useReminderEmailOverdue,
    emailTemplateOverdue: record.emailTemplateOverdue,
    daysAfterOverdue: record.daysAfterOverdue,
  });
  const [
    useReminderEmailAfterCampaignEnrollment,
    setUseReminderEmailAfterCampaignEnrollment,
  ] = useState(
    record.useReminderEmailAfterCampaignEnrollment ?? false,
  );
  const [
    daysAfterCampaignEnrollment,
    setDaysAfterCampaignEnrollment,
  ] = useState(record.daysAfterCampaignEnrollment ?? 0);
  const [
    useRepeatReminderEmail,
    setUseRepeatReminderEmail,
  ] = useState(record.useRepeatReminderEmail ?? false);
  const [
    useReminderEmailComingDue,
    setUseReminderEmailComingDue,
  ] = useState(record.useReminderEmailComingDue ?? false);
  const [
    useReminderEmailOverdue,
    setUseReminderEmailOverdue,
  ] = useState(record.useReminderEmailOverdue ?? false);
  const totalDaysBetweenCurrentAndDue = moment(
    review.dueDate,
  ).diff(moment(review.currentDate), 'day');
  const form = useForm({
    resolver: yupResolver(
      schema({
        totalDaysBetweenCurrentAndDue,
        useReminderEmailAfterCampaignEnrollment,
        daysAfterCampaignEnrollment,
        useRepeatReminderEmail,
        useReminderEmailComingDue,
        useReminderEmailOverdue,
      }),
    ),
    mode: 'onSubmit',
    defaultValues: initialValues,
  });
  const onSubmit = (values) => {
    onConfirm && onConfirm(form.getValues());
    onClose && onClose();
  };
  return ReactDOM.createPortal(
    <Dialog
      fullWidth={true}
      maxWidth="sm"
      onClose={onClose}
      open={true}
    >
      <DialogTitle>
        <MDTypography>
          {i18n(
            'entities.campaign.labels.reminderEmailSettings',
          )}
        </MDTypography>
      </DialogTitle>
      <DialogContent>
        <FormWrapper>
          <FormProvider {...form}>
            <form
              autoComplete="off"
              noValidate={true}
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <MDBox px={2.4}>
                <Grid container spacing={1.6}>
                  <Grid item xs={12}>
                    <CheckboxFormItem
                      name="useReminderEmailAfterCampaignEnrollment"
                      label={i18n(
                        'entities.campaign.fields.useReminderEmailAfterCampaignEnrollment',
                      )}
                      onChange={
                        setUseReminderEmailAfterCampaignEnrollment
                      }
                    />
                    {useReminderEmailAfterCampaignEnrollment && (
                      <FieldSetViewItem>
                        <Grid container spacing={1.6}>
                          <Grid item xs={6}>
                            <EmailTemplateAutocompleteFormItem
                              name="campaignEnrollmentEmailTemplate"
                              label={i18n(
                                'entities.campaign.fields.selectEmailTemplate',
                              )}
                              variant="standard"
                              required={true}
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <InputNumberFormItem
                              name="daysAfterCampaignEnrollment"
                              label={i18n(
                                'entities.campaign.fields.daysAfterCampaignEnrollment',
                              )}
                              onChange={(newValue) =>
                                setDaysAfterCampaignEnrollment(
                                  Number(newValue ?? 0),
                                )
                              }
                              variant="standard"
                              required={true}
                              min={1}
                              max={90}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <CheckboxFormItem
                              name="useRepeatReminderEmail"
                              label={i18n(
                                'entities.campaign.fields.useRepeatReminderEmail',
                              )}
                              onChange={
                                setUseRepeatReminderEmail
                              }
                            />
                            {useRepeatReminderEmail && (
                              <FieldSetViewItem>
                                <Grid
                                  container
                                  spacing={1.6}
                                >
                                  <Grid item xs={6}>
                                    <EmailTemplateAutocompleteFormItem
                                      name="repeatReminderEmailTemplate"
                                      label={i18n(
                                        'entities.campaign.fields.selectEmailTemplate',
                                      )}
                                      variant="standard"
                                      required={true}
                                    />
                                  </Grid>
                                  <Grid item xs={6}>
                                    <InputNumberFormItem
                                      name="intervalDaysForRepeatReminderEmail"
                                      label={i18n(
                                        'entities.campaign.fields.intervalDaysForRepeatReminderEmail',
                                      )}
                                      variant="standard"
                                      required={true}
                                      min={1}
                                      max={90}
                                    />
                                  </Grid>
                                </Grid>
                              </FieldSetViewItem>
                            )}
                          </Grid>
                        </Grid>
                      </FieldSetViewItem>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <CheckboxFormItem
                      name="useReminderEmailComingDue"
                      label={i18n(
                        'entities.campaign.fields.useReminderEmailComingDue',
                      )}
                      onChange={
                        setUseReminderEmailComingDue
                      }
                    />
                    {useReminderEmailComingDue && (
                      <FieldSetViewItem>
                        <Grid container spacing={1.6}>
                          <Grid item xs={6}>
                            <EmailTemplateAutocompleteFormItem
                              name="emailTemplateComingDue"
                              label={i18n(
                                'entities.campaign.fields.selectEmailTemplate',
                              )}
                              variant="standard"
                              required={true}
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <InputNumberFormItem
                              name="daysBeforeComingDue"
                              label={i18n(
                                'entities.campaign.fields.daysBeforeComingDue',
                              )}
                              variant="standard"
                              required={true}
                              min={1}
                              max={90}
                            />
                          </Grid>
                        </Grid>
                      </FieldSetViewItem>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <CheckboxFormItem
                      name="useReminderEmailOverdue"
                      label={i18n(
                        'entities.campaign.fields.useReminderEmailOverdue',
                      )}
                      onChange={setUseReminderEmailOverdue}
                    />
                    {useReminderEmailOverdue && (
                      <FieldSetViewItem>
                        <Grid container spacing={1.6}>
                          <Grid item xs={6}>
                            <EmailTemplateAutocompleteFormItem
                              name="emailTemplateOverdue"
                              label={i18n(
                                'entities.campaign.fields.selectEmailTemplate',
                              )}
                              variant="standard"
                              required={true}
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <InputNumberFormItem
                              name="daysAfterOverdue"
                              label={i18n(
                                'entities.campaign.fields.daysAfterOverdue',
                              )}
                              variant="standard"
                              required={true}
                              min={1}
                              max={90}
                            />
                          </Grid>
                        </Grid>
                      </FieldSetViewItem>
                    )}
                  </Grid>
                </Grid>
              </MDBox>
            </form>
          </FormProvider>
        </FormWrapper>
      </DialogContent>
      <DialogActions>
        <MDButton
          color={sidenavColor}
          onClick={onClose}
          size="small"
          variant="outlined"
        >
          {i18n('common.cancel')}
        </MDButton>
        <MDButton
          color={sidenavColor}
          onClick={form.handleSubmit(onSubmit)}
          size="small"
          variant="gradient"
        >
          {i18n('common.ok')}
        </MDButton>
      </DialogActions>
    </Dialog>,
    (document as any).getElementById('modal-root'),
  );
}

export default ReminderEmailSettingsModal;

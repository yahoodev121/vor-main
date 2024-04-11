import { Card, Grid } from '@mui/material';
import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useDispatch } from 'react-redux';
import { useForm, FormProvider } from 'react-hook-form';
import { useRef, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import actions from 'src/modules/campaignInstance/form/campaignInstanceFormActions';
import CloseIcon from '@mui/icons-material/Close';
import ConfirmModal from 'src/view/shared/modals/ConfirmModal';
import FormWrapper from 'src/view/shared/styles/FormWrapper';
import GradientTitle from 'src/view/shared/components/GradientTitle';
import MDBox from 'src/mui/components/MDBox';
import MDButton from 'src/mui/components/MDButton';
import MiniStatisticsCard from 'src/mui/shared/Cards/StatisticsCards/MiniStatisticsCard';
import Questionnaire from 'src/view/Questionnaire';
import SaveIcon from '@mui/icons-material/Save';
import SendIcon from '@mui/icons-material/Send';
import Spinner from 'src/view/shared/Spinner';
import StorefrontIcon from '@mui/icons-material/Storefront';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';

const schema = yup.object().shape({
  questionnaire: yupFormSchemas.generic(
    i18n('entities.campaignInstance.fields.questionnaire'),
  ),
});

function CampaignInstanceView(props) {
  const dispatch = useDispatch();

  const {
    onCancel,
    onSubmit: doSubmit,
    record,
    saveLoading,
    submitLoading,
  } = props;

  const readOnly =
    !record.answerMode || record.status === 'Completed';
  const isVendor = record.campaign.audience === 'Vendors';

  const { sidenavColor } = selectMuiSettings();

  const [visibleConfirm, setVisibleConfirm] =
    useState(false);

  const [initialValues] = useState(() => {
    const record = props.record || {};

    return {
      questionnaire: record.questionnaire,
    };
  });

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    defaultValues: initialValues as any,
  });

  const questionnaireRef = useRef(null);

  const onSave = (values) => {
    doSubmit &&
      doSubmit(
        record.id,
        {
          questionnaire:
            questionnaireRef?.current?.getQuestionnaire(),
        },
        false,
      );
  };

  const onSubmit = (values) => {
    if (!questionnaireRef?.current?.isValid()) {
      setVisibleConfirm(false);
      return;
    }
    dispatch(
      actions.doSubmit(record.id, {
        questionnaire:
          questionnaireRef?.current?.getQuestionnaire(),
      }),
    );
  };

  return (
    <>
      <FormWrapper>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Card sx={{ height: '100%' }}>
              <MDBox position="relative" topBorder>
                <GradientTitle>
                  {i18n(
                    `entities.campaignInstance.${
                      readOnly ? 'view' : 'edit'
                    }.title`,
                  )}
                </GradientTitle>
              </MDBox>
              <MDBox p={2.4}>
                {readOnly && (
                  <Grid container spacing={2.4} mb={2.4}>
                    <Grid item md={4} xs={12}>
                      <MiniStatisticsCard
                        title={{
                          text: i18n(
                            `entities.campaignInstance.fields.${
                              isVendor ? 'vendor' : 'client'
                            }`,
                          ),
                        }}
                        count={
                          isVendor
                            ? record.vendor?.name
                            : record.client?.name
                        }
                        icon={{
                          color: sidenavColor,
                          component: isVendor ? (
                            <StorefrontIcon />
                          ) : (
                            'people_alt'
                          ),
                        }}
                        direction="left"
                      />
                    </Grid>
                    <Grid item md={4} xs={12}>
                      <MiniStatisticsCard
                        title={{
                          text: i18n(
                            `entities.campaignInstance.fields.campaign`,
                          ),
                        }}
                        count={record.campaign.name}
                        icon={{
                          color: sidenavColor,
                          component: 'campaign',
                        }}
                        direction="left"
                      />
                    </Grid>
                    <Grid item md={4} xs={12}>
                      <MiniStatisticsCard
                        title={{
                          text: i18n(
                            `entities.campaignInstance.fields.score`,
                          ),
                        }}
                        count={`${record.score} %`}
                        icon={{
                          color: sidenavColor,
                          component: 'sports_score',
                        }}
                        direction="left"
                      />
                    </Grid>
                  </Grid>
                )}
                <Questionnaire
                  ref={questionnaireRef}
                  name="questionnaire"
                  preview={true}
                  readOnly={readOnly}
                  visibleExportButton={false}
                  visibleImportButton={false}
                />
                <MDBox
                  mt={1.6}
                  width="100%"
                  display="flex"
                  justifyContent="space-between"
                >
                  <MDBox
                    display="inline-flex"
                    flexWrap="wrap"
                    gap={0.8}
                  >
                    <MDButton
                      type="button"
                      variant="outlined"
                      color={sidenavColor}
                      onClick={() =>
                        onCancel
                          ? onCancel()
                          : getHistory().push(
                              '/campaign-instance',
                            )
                      }
                      startIcon={<CloseIcon />}
                    >
                      {i18n('common.cancel')}
                    </MDButton>
                  </MDBox>
                  <MDBox
                    display="inline-flex"
                    flexWrap="wrap"
                    gap={0.8}
                  >
                    {record.answerMode &&
                      record.status !== 'Completed' && (
                        <>
                          <MDButton
                            type="button"
                            variant="gradient"
                            color={sidenavColor}
                            startIcon={<SaveIcon />}
                            onClick={form.handleSubmit(
                              onSave,
                            )}
                          >
                            {i18n(`common.save`)}
                          </MDButton>
                          <MDButton
                            type="button"
                            variant="gradient"
                            color={sidenavColor}
                            endIcon={<SendIcon />}
                            onClick={() =>
                              setVisibleConfirm(true)
                            }
                          >
                            {i18n(`common.submit`)}
                          </MDButton>
                        </>
                      )}
                  </MDBox>
                </MDBox>
                {(saveLoading || submitLoading) && (
                  <MDBox
                    display="flex"
                    position="absolute"
                    left="0"
                    top="0"
                    right="0"
                    bottom="0"
                  >
                    <Spinner />
                  </MDBox>
                )}
              </MDBox>
            </Card>
          </form>
        </FormProvider>
      </FormWrapper>
      {visibleConfirm && (
        <ConfirmModal
          title={i18n('common.areYouSure')}
          onConfirm={form.handleSubmit(onSubmit)}
          onClose={() => setVisibleConfirm(false)}
          okText={i18n('common.yes')}
          cancelText={i18n('common.no')}
        />
      )}
    </>
  );
}

export default CampaignInstanceView;

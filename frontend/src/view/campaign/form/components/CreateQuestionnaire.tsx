import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import actions from 'src/modules/questionnaireTemplate/list/questionnaireTemplateListActions';
import BorderedCardButton from 'src/view/shared/components/BorderedCardButton';
import Grid2 from '@mui/material/Unstable_Grid2';
import MDBox from 'src/mui/components/MDBox';
import MDButton from 'src/mui/components/MDButton';
import MDTypography from 'src/mui/components/MDTypography';
import Pagination from 'src/view/shared/table/Pagination';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import Questionnaire from 'src/view/Questionnaire';
import selectors from 'src/modules/questionnaireTemplate/list/questionnaireTemplateListSelectors';
import StepContent from 'src/view/shared/components/StepContent';

const CreateQuestionnaire = ({ visible = false }) => {
  const dispatch = useDispatch();
  const { sidenavColor } = selectMuiSettings();
  const { getValues, setValue, register } =
    useFormContext();
  const isExistingQuestionnaire = getValues(
    'existingQuestionnaire',
  );
  const questionnaireId = getValues('questionnaireId');
  const loading = useSelector(selectors.selectLoading);
  const rows = useSelector(selectors.selectRows);
  const pagination = useSelector(
    selectors.selectPagination,
  );
  const hasRows = useSelector(selectors.selectHasRows);
  const doChangePagination = (pagination) => {
    dispatch(actions.doChangePagination(pagination));
  };
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    if (!Boolean(questionnaireId)) {
      dispatch(actions.doFetch({ export: 1 }, {}, false));
    }
  }, [dispatch, questionnaireId]);

  const questionnaire = useRef(null);

  const doExportToJSON = () =>
    questionnaire?.current?.doExportToJSON();

  const doImportFromJSON = () =>
    questionnaire?.current?.doImportFromJSON();

  return (
    <StepContent
      title={
        <MDBox
          alignItems="center"
          color="inherit"
          display="flex"
          justifyContent="space-between"
        >
          {i18n(
            isExistingQuestionnaire
              ? !!questionnaireId
                ? 'entities.campaign.sections.editQuestionnaire'
                : 'entities.campaign.placeholders.selectExistingQuestionnaireTemplate'
              : 'entities.campaign.sections.createQuestionnaire',
          )}
          {(!isExistingQuestionnaire ||
            !!questionnaireId) && (
            <MDBox display="flex" gap={0.8}>
              <MDButton
                variant="contained"
                color={sidenavColor}
                onClick={() => doImportFromJSON()}
              >
                {i18n(`common.import`)}
              </MDButton>
              <MDButton
                variant="contained"
                color={sidenavColor}
                onClick={() => doExportToJSON()}
              >
                {i18n(`common.exportToJSON`)}
              </MDButton>
            </MDBox>
          )}
        </MDBox>
      }
      visible={visible}
    >
      {isExistingQuestionnaire &&
      !Boolean(questionnaireId) ? (
        <>
          <Grid2 container spacing={1.6} columns={5}>
            {!loading && !hasRows && (
              <Grid2 xs={5}>
                <MDTypography
                  variant="body2"
                  fontWeight="regular"
                  align="center"
                >
                  {i18n('table.noData')}
                </MDTypography>
              </Grid2>
            )}
            {!loading &&
              rows.map((row) => (
                <Grid2 key={row.id} xs={1}>
                  <BorderedCardButton
                    onClick={() => {
                      register('questionnaire');
                      setValue(
                        'questionnaire',
                        row.questionnaire,
                        {
                          shouldValidate: false,
                          shouldDirty: true,
                        },
                      );
                      register('questionnaireId');
                      setValue('questionnaireId', row.id, {
                        shouldValidate: false,
                        shouldDirty: true,
                      });
                      setRefresh(!refresh);
                    }}
                    content={
                      <QuestionAnswerIcon fontSize="large" />
                    }
                    title={
                      <>
                        {row.name}
                        <br />
                        {i18n(
                          'entities.questionnaireTemplate.labels.questions',
                          row.totalQuestions,
                        )}
                      </>
                    }
                    innerTitle
                  />
                </Grid2>
              ))}
          </Grid2>
          <Pagination
            onChange={doChangePagination}
            disabled={loading}
            pagination={pagination}
            entriesPerPage
            showTotalEntries
          />
        </>
      ) : (
        <Questionnaire
          name="questionnaire"
          ref={questionnaire}
          visibleExportButton={false}
          visibleImportButton={false}
        />
      )}
    </StepContent>
  );
};

export default CreateQuestionnaire;

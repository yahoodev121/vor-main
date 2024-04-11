import { Card } from '@mui/material';
import { i18n } from 'src/i18n';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import actions from 'src/modules/questionnaireTemplate/view/questionnaireTemplateViewActions';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import QuestionnaireTemplateView from 'src/view/questionnaireTemplate/view/QuestionnaireTemplateView';
import QuestionnaireTemplateViewToolbar from 'src/view/questionnaireTemplate/view/QuestionnaireTemplateViewToolbar';
import selectors from 'src/modules/questionnaireTemplate/view/questionnaireTemplateViewSelectors';

function QuestionnaireTemplatePage() {
  const dispatch = useDispatch();
  const match = useRouteMatch();

  const loading = useSelector(selectors.selectLoading);
  const record = useSelector(selectors.selectRecord);

  useEffect(() => {
    dispatch(actions.doFind(match.params.id));
  }, [dispatch, match.params.id]);

  return (
    <Card>
      <MDBox py={2.4} px={2.4} topBorder>
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <MDTypography variant="h3" mb={2.4}>
            {i18n(
              'entities.questionnaireTemplate.view.title',
            )}
          </MDTypography>
          <QuestionnaireTemplateViewToolbar match={match} />
        </MDBox>
        <QuestionnaireTemplateView
          loading={loading}
          record={record}
        />
      </MDBox>
    </Card>
  );
}

export default QuestionnaireTemplatePage;

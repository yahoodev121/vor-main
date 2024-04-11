import { getHistory } from 'src/modules/store';
import { Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import actions from 'src/modules/questionnaireTemplate/form/questionnaireTemplateFormActions';
import QuestionnaireTemplateForm from 'src/view/questionnaireTemplate/form/QuestionnaireTemplateForm';
import selectors from 'src/modules/questionnaireTemplate/form/questionnaireTemplateFormSelectors';
import Spinner from 'src/view/shared/Spinner';

function QuestionnaireTemplateFormPage(props) {
  const [dispatched, setDispatched] = useState(false);
  const dispatch = useDispatch();
  const match = useRouteMatch();

  const initLoading = useSelector(
    selectors.selectInitLoading,
  );
  const saveLoading = useSelector(
    selectors.selectSaveLoading,
  );
  const record = useSelector(selectors.selectRecord);

  const isEditing = Boolean(match.params.id);
  const title = isEditing
    ? i18n('entities.questionnaireTemplate.edit.title')
    : i18n('entities.questionnaireTemplate.new.title');

  useEffect(() => {
    dispatch(actions.doInit(match.params.id));
    setDispatched(true);
  }, [dispatch, match.params.id]);

  const doSubmit = (id, data) => {
    if (isEditing) {
      dispatch(actions.doUpdate(id, data));
    } else {
      dispatch(actions.doCreate(data));
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={12}>
        {initLoading && <Spinner />}

        {dispatched && !initLoading && (
          <QuestionnaireTemplateForm
            saveLoading={saveLoading}
            initLoading={initLoading}
            record={record}
            isEditing={isEditing}
            hiddenImpossibleFields={!isEditing}
            onSubmit={doSubmit}
            onCancel={() =>
              isEditing
                ? getHistory().push(
                    `/questionnaire-template/${match.params.id}`,
                  )
                : getHistory().push(
                    '/questionnaire-template',
                  )
            }
          />
        )}
      </Grid>
    </Grid>
  );
}

export default QuestionnaireTemplateFormPage;

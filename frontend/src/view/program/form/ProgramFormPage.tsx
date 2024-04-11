import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import actions from 'src/modules/program/form/programFormActions';
import ProgramForm from 'src/view/program/form/ProgramForm';
import ProgramWizard from 'src/view/program/form/ProgramWizard';
import selectors from 'src/modules/program/form/programFormSelectors';
import Spinner from 'src/view/shared/Spinner';

function ProgramFormPage(props) {
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
    ? i18n('entities.program.edit.title')
    : i18n('entities.program.new.title');

  useEffect(() => {
    dispatch(actions.doInit(match.params.id));
    setDispatched(true);
  }, [dispatch, match.params.id]);

  const doSubmit = (id, data) => {
    if (isEditing) {
      dispatch(
        actions.doUpdate(id, {
          ...data,
          requirements: record.requirements,
        }),
      );
    } else {
      dispatch(actions.doCreate(data));
    }
  };

  const formProps = {
    initLoading,
    isEditing,
    onCancel: () =>
      isEditing
        ? getHistory().push(`/program/${match.params.id}`)
        : getHistory().push('/program'),
    onSubmit: doSubmit,
    record,
    saveLoading,
    title,
  };

  return (
    <>
      {initLoading && <Spinner />}

      {dispatched &&
        !initLoading &&
        (isEditing ? (
          <ProgramForm {...formProps} />
        ) : (
          <ProgramWizard {...formProps} />
        ))}
    </>
  );
}

export default ProgramFormPage;

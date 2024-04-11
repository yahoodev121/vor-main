import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import actions from 'src/modules/programControl/form/programControlFormActions';
import ProgramControlForm from 'src/view/programControl/form/ProgramControlForm';
import selectors from 'src/modules/programControl/form/programControlFormSelectors';
import Spinner from 'src/view/shared/Spinner';

function ProgramControlFormPage(props) {
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
    ? i18n('entities.programControl.edit.title')
    : i18n('entities.programControl.new.title');

  useEffect(() => {
    dispatch(actions.doInit(match.params.id));
    setDispatched(true);
  }, [dispatch, match.params.id]);

  const doSubmit = (id, data) => {
    if (isEditing) {
      dispatch(
        actions.doUpdate(id, {
          ...data,
          tasks: record.tasks,
        }),
      );
    } else {
      dispatch(actions.doCreate(data));
    }
  };

  return (
    <>
      {initLoading && <Spinner />}

      {dispatched && !initLoading && (
        <ProgramControlForm
          saveLoading={saveLoading}
          initLoading={initLoading}
          record={record}
          isEditing={isEditing}
          onSubmit={doSubmit}
          onCancel={() =>
            isEditing
              ? getHistory().push(
                  `/program-control/${match.params.id}`,
                )
              : getHistory().push('/program-control')
          }
        />
      )}
    </>
  );
}

export default ProgramControlFormPage;

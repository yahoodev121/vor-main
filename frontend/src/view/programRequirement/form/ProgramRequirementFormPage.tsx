import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import actions from 'src/modules/programRequirement/form/programRequirementFormActions';
import ProgramRequirementForm from 'src/view/programRequirement/form/ProgramRequirementForm';
import selectors from 'src/modules/programRequirement/form/programRequirementFormSelectors';
import Spinner from 'src/view/shared/Spinner';

function ProgramRequirementFormPage(props) {
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
    ? i18n('entities.programRequirement.edit.title')
    : i18n('entities.programRequirement.new.title');

  useEffect(() => {
    dispatch(actions.doInit(match.params.id));
    setDispatched(true);
  }, [dispatch, match.params.id]);

  const doSubmit = (id, data) => {
    if (isEditing) {
      dispatch(
        actions.doUpdate(id, {
          ...data,
          controls: record.controls,
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
        <ProgramRequirementForm
          saveLoading={saveLoading}
          initLoading={initLoading}
          record={record}
          isEditing={isEditing}
          onSubmit={doSubmit}
          onCancel={() =>
            isEditing
              ? getHistory().push(
                  `/program-requirement/${match.params.id}`,
                )
              : getHistory().push('/program-requirement')
          }
        />
      )}
    </>
  );
}

export default ProgramRequirementFormPage;

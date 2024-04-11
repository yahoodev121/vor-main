import { getHistory } from 'src/modules/store';
import { Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import actions from 'src/modules/userGroup/form/userGroupFormActions';
import selectors from 'src/modules/userGroup/form/userGroupFormSelectors';
import Spinner from 'src/view/shared/Spinner';
import EditUserGroupForm from 'src/view/userGroup/form/EditUserGroupForm';

function EditUserGroupFormPage(props) {
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

  useEffect(() => {
    dispatch(actions.doInit(match.params.id));
    setDispatched(true);
  }, [dispatch, match.params.id]);

  const doSubmit = (id, data) => {
    dispatch(actions.doUpdate(id, data));
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
          <EditUserGroupForm
            saveLoading={saveLoading}
            initLoading={initLoading}
            record={record}
            onSubmit={doSubmit}
            onCancel={() =>
              getHistory().push(
                `/user-group/${match.params.id}`,
              )
            }
          />
        )}
      </Grid>
    </Grid>
  );
}

export default EditUserGroupFormPage;

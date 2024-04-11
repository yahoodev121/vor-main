import { getHistory } from 'src/modules/store';
import { Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import actions from 'src/modules/client/form/clientFormActions';
import EditClientForm from 'src/view/client/form/EditClientForm';
import MDTypography from 'src/mui/components/MDTypography';
import NewClientForm from 'src/view/client/form/NewClientForm';
import selectors from 'src/modules/client/form/clientFormSelectors';
import Spinner from 'src/view/shared/Spinner';

function ClientFormPage(props) {
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
    ? i18n('entities.client.edit.title')
    : i18n('entities.client.new.title');

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
    <>
      <Grid container>
        {!isEditing && (
          <Grid item xs={12}>
            <MDTypography
              variant="h3"
              textAlign="center"
              mb={4}
            >
              {title}
            </MDTypography>
          </Grid>
        )}
        <Grid
          item
          container
          xs={12}
          justifyContent="center"
          alignItems="center"
        >
          {initLoading && <Spinner />}

          {dispatched &&
            !initLoading &&
            (isEditing ? (
              <EditClientForm
                saveLoading={saveLoading}
                initLoading={initLoading}
                record={record}
                isEditing={isEditing}
                onSubmit={doSubmit}
                onCancel={() =>
                  getHistory().push(
                    `/client/${match.params.id}`,
                  )
                }
              />
            ) : (
              <NewClientForm
                saveLoading={saveLoading}
                initLoading={initLoading}
                record={record}
                isEditing={isEditing}
                onSubmit={doSubmit}
                onCancel={() =>
                  getHistory().push('/client')
                }
              />
            ))}
        </Grid>
      </Grid>
    </>
  );
}

export default ClientFormPage;

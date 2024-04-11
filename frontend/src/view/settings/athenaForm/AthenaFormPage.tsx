import { Card, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import Spinner from 'src/view/shared/Spinner';
import AthenaForm from 'src/view/settings/athenaForm/AthenaForm';
import vorAISettingActions from 'src/modules/vorAI/setting/vorAISettingActions';
import vorAISettingSelectors from 'src/modules/vorAI/setting/vorAISettingSelectors';
import vorAIImporterActions from 'src/modules/vorAI/importer/vorAIImporterActions';
import { useEffect } from 'react';

const AthenaFormPage = (props) => {
  const dispatch = useDispatch();

  const status = useSelector(
    vorAISettingSelectors.selectStatus,
  );

  const initLoading = useSelector(
    vorAISettingSelectors.selectInitLoading,
  );

  const saveLoading = useSelector(
    vorAISettingSelectors.selectSaveLoading,
  );

  const submitLoading = useSelector(
    vorAISettingSelectors.selectSubmitLoading,
  );

  const record = useSelector(
    vorAISettingSelectors.selectRecord,
  );

  const onDownloadExcelTemplate = () => {
    dispatch(vorAIImporterActions.doDownloadTemplate());
  };

  const onStatus = (values) => {
    dispatch(vorAISettingActions.doStatus(values));
  };

  const onSubmit = (values) => {
    const attachments = values.attachments.map((attachment) => attachment.id);
    dispatch(vorAISettingActions.doSave({ ...values, attachments }));
  };

  const onUploadAndTrain = (values) => {
    dispatch(vorAISettingActions.doUploadAndTrain(values));
  };

  useEffect(() => {
    dispatch(vorAISettingActions.doInit());
  }, [dispatch]);

  return (
    <MDBox id={props.id}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12}>
          <MDBox position="relative" mt={2.4} topBorder>
            <Card>
              {initLoading && <Spinner />}
              {
                !initLoading && (
                  <AthenaForm
                    onDownloadExcelTemplate={
                      onDownloadExcelTemplate
                    }
                    onStatus={onStatus}
                    onSubmit={onSubmit}
                    onUploadAndTrain={onUploadAndTrain}
                    initLoading={initLoading}
                    saveLoading={saveLoading}
                    submitLoading={submitLoading}
                    record={record}
                  />
                )
              }
              {submitLoading && (
                <MDBox
                  display="flex"
                  position="absolute"
                  left="0"
                  top="0"
                  right="0"
                  bottom="0"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Card sx={{ p: 2.4 }}>
                    <MDTypography
                      variant="body2"
                      textAlign="center"
                    >
                      {status}
                    </MDTypography>
                    <Spinner />
                  </Card>
                </MDBox>
              )}
            </Card>
          </MDBox>
        </Grid>
      </Grid>
    </MDBox>
  );
};

export default AthenaFormPage;

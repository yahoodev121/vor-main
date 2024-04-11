import { Card, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import Spinner from 'src/view/shared/Spinner';
import VORAIForm from 'src/view/vorAI/form/VORAIForm';
import vorAIFormActions from 'src/modules/vorAI/form/vorAIFormActions';
import vorAIFormSelectors from 'src/modules/vorAI/form/vorAIFormSelectors';
import vorAIImporterActions from 'src/modules/vorAI/importer/vorAIImporterActions';

const VORAIFormPage = () => {
  const dispatch = useDispatch();

  const status = useSelector(
    vorAIFormSelectors.selectStatus,
  );

  const submitLoading = useSelector(
    vorAIFormSelectors.selectSubmitLoading,
  );

  const responseFromAPIService = useSelector(
    vorAIFormSelectors.selectResponseFromAPIService,
  );

  const onDownloadExcelTemplate = () => {
    dispatch(vorAIImporterActions.doDownloadTemplate());
  };

  const onStatus = (values) => {
    dispatch(vorAIFormActions.doStatus(values));
  };

  const onSubmit = (values) => {
    dispatch(vorAIFormActions.doSubmit(values));
  };

  const onUploadAndTrain = (values) => {
    dispatch(vorAIFormActions.doUploadAndTrain(values));
  };

  const doSubmitExtraction = (values) => {
    dispatch(
      vorAIFormActions.doSubmitExtraction(values),
    );
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={12}>
        <MDBox position="relative" mt={2.4}>
          <VORAIForm
            onDownloadExcelTemplate={
              onDownloadExcelTemplate
            }
            onStatus={onStatus}
            onSubmit={onSubmit}
            onSubmitExtraction={doSubmitExtraction}
            onUploadAndTrain={onUploadAndTrain}
            responseFromAPIService={responseFromAPIService}
            submitLoading={submitLoading} 
          />
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
        </MDBox>
      </Grid>
    </Grid>
  );
};

export default VORAIFormPage;

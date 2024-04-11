import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { i18n } from 'src/i18n';
import actions from 'src/modules/qaLibrary/view/qaLibraryViewActions';
import selectors from 'src/modules/qaLibrary/view/qaLibraryViewSelectors';
import QALibraryView from 'src/view/qaLibrary/view/QALibraryView';
import QALibraryViewToolbar from 'src/view/qaLibrary/view/QALibraryViewToolbar';
import { Card } from '@mui/material';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

function QALibraryViewPage() {
  const dispatch = useDispatch();
  const match = useRouteMatch();

  const loading = useSelector(selectors.selectLoading);
  const record = useSelector(selectors.selectRecord);

  useEffect(() => {
    dispatch(actions.doFind(match.params.id));
  }, [dispatch, match.params.id]);

  return (
    <>
      <Card>
        <MDBox py={2.4} px={2.4} topBorder>
          <MDBox
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <MDTypography variant="h3" mb={2.4}>
              {i18n('entities.qaLibrary.view.title')}
            </MDTypography>
            <QALibraryViewToolbar match={match} />
          </MDBox>
          <QALibraryView loading={loading} record={record} />
        </MDBox>
      </Card>
    </>
  );
}

export default QALibraryViewPage;

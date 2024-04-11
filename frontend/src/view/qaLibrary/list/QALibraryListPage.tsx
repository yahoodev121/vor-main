import React from 'react';
import { i18n } from 'src/i18n';
import QALibraryListFilter from 'src/view/qaLibrary/list/QALibraryListFilter';
import QALibraryListTable from 'src/view/qaLibrary/list/QALibraryListTable';
import QALibraryListToolbar from 'src/view/qaLibrary/list/QALibraryListToolbar';
import { Card } from '@mui/material';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

function QALibraryListPage(props) {
  return (
    <>
      <Card>
        <MDBox pt={2.4} px={2.4} topBorder>
          <MDBox
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
            pb={2.4}
          >
            <MDTypography variant="h3">
              {i18n('entities.qaLibrary.list.title')}
            </MDTypography>
            <QALibraryListToolbar />
          </MDBox>
          <QALibraryListFilter />
        </MDBox>
        <QALibraryListTable />
      </Card>
    </>
  );
}

export default QALibraryListPage;

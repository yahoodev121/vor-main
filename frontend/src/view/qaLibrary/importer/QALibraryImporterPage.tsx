import { Card } from '@mui/material';
import React from 'react';
import { i18n } from 'src/i18n';
import actions from 'src/modules/qaLibrary/importer/qaLibraryImporterActions';
import fields from 'src/modules/qaLibrary/importer/qaLibraryImporterFields';
import selectors from 'src/modules/qaLibrary/importer/qaLibraryImporterSelectors';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import importerHoc from 'src/view/shared/importer/Importer';

function QALibraryImporterPage() {
  const Importer = importerHoc(
    selectors,
    actions,
    fields,
    i18n('entities.qaLibrary.importer.hint'),
  );

  return (
    <>
      <Card>
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
          p={2.4}
          topBorder
        >
          <MDTypography variant="h3">
            {i18n('entities.qaLibrary.importer.title')}
          </MDTypography>
        </MDBox>
        <Importer />
      </Card>
    </>
  );
}

export default QALibraryImporterPage;

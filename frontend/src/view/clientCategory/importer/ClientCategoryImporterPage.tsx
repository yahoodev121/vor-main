import { Card } from '@mui/material';
import { i18n } from 'src/i18n';
import actions from 'src/modules/clientCategory/importer/clientCategoryImporterActions';
import fields from 'src/modules/clientCategory/importer/clientCategoryImporterFields';
import importerHoc from 'src/view/shared/importer/Importer';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import selectors from 'src/modules/clientCategory/importer/clientCategoryImporterSelectors';

function ClientCategoryImportPage() {
  const Importer = importerHoc(
    selectors,
    actions,
    fields,
    i18n('entities.clientCategory.importer.hint'),
  );

  return (
    <Card>
      <MDBox
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
        p={2.4}
        topBorder
      >
        <MDTypography variant="h3">
          {i18n('entities.clientCategory.importer.title')}
        </MDTypography>
      </MDBox>
      <Importer />
    </Card>
  );
}

export default ClientCategoryImportPage;

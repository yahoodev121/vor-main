import importerActions from 'src/modules/shared/importer/importerActions';
import selectors from 'src/modules/clientCategory/importer/clientCategoryImporterSelectors';
import ClientCategoryService from 'src/modules/clientCategory/clientCategoryService';
import fields from 'src/modules/clientCategory/importer/clientCategoryImporterFields';
import { i18n } from 'src/i18n';

const clientCategoryImporterActions = importerActions(
  'CLIENTCATEGORY_IMPORTER',
  selectors,
  ClientCategoryService.import,
  fields,
  i18n('entities.clientCategory.importer.fileName'),
);

export default clientCategoryImporterActions;

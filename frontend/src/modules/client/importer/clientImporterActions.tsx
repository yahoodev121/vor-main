import importerActions from 'src/modules/shared/importer/importerActions';
import selectors from 'src/modules/client/importer/clientImporterSelectors';
import ClientService from 'src/modules/client/clientService';
import fields from 'src/modules/client/importer/clientImporterFields';
import { i18n } from 'src/i18n';

const clientImporterActions = importerActions(
  'CLIENT_IMPORTER',
  selectors,
  ClientService.import,
  fields,
  i18n('entities.client.importer.fileName'),
);

export default clientImporterActions;

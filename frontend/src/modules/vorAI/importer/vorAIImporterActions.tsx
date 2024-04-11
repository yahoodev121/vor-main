import { i18n } from 'src/i18n';
import fields from 'src/modules/vorAI/importer/vorAIImporterFields';
import importerActions from 'src/modules/shared/importer/importerActions';
import selectors from 'src/modules/vorAI/importer/vorAIImporterSelectors';
import VORAIService from 'src/modules/vorAI/vorAIService';

const vorAIImporterActions = importerActions(
  'VENDORCATEGORY_IMPORTER',
  selectors,
  VORAIService.import,
  fields,
  i18n('entities.vorAI.importer.fileName'),
);

export default vorAIImporterActions;

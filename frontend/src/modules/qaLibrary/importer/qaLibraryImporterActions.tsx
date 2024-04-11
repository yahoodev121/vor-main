import importerActions from 'src/modules/shared/importer/importerActions';
import selectors from 'src/modules/qaLibrary/importer/qaLibraryImporterSelectors';
import QALibraryService from 'src/modules/qaLibrary/qaLibraryService';
import fields from 'src/modules/qaLibrary/importer/qaLibraryImporterFields';
import { i18n } from 'src/i18n';

const qaLibraryImporterActions = importerActions(
  'QALIBRARY_IMPORTER',
  selectors,
  QALibraryService.import,
  fields,
  i18n('entities.qaLibrary.importer.fileName'),
);

export default qaLibraryImporterActions;

import { i18n } from 'src/i18n';
import fields from 'src/modules/highlight/importer/highlightImporterFields';
import HighlightService from 'src/modules/highlight/highlightService';
import importerActions from 'src/modules/shared/importer/importerActions';
import selectors from 'src/modules/highlight/importer/highlightImporterSelectors';

const highlightImporterActions = importerActions(
  'HIGHLIGHT_IMPORTER',
  selectors,
  HighlightService.import,
  fields,
  i18n('entities.highlight.importer.fileName'),
);

export default highlightImporterActions;

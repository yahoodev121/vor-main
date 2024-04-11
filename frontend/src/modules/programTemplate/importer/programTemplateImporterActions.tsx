import { i18n } from 'src/i18n';
import fields from 'src/modules/programTemplate/importer/programTemplateImporterFields';
import importerActions from 'src/modules/shared/importer/importerActions';
import ProgramTemplateService from 'src/modules/programTemplate/programTemplateService';
import selectors from 'src/modules/programTemplate/importer/programTemplateImporterSelectors';

const programTemplateImporterActions = importerActions(
  'PROGRAMTEMPLATE_IMPORTER',
  selectors,
  ProgramTemplateService.import,
  fields,
  i18n('entities.programTemplate.importer.fileName'),
);

export default programTemplateImporterActions;

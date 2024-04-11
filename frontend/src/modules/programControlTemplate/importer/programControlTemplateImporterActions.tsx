import { i18n } from 'src/i18n';
import fields from 'src/modules/programControlTemplate/importer/programControlTemplateImporterFields';
import importerActions from 'src/modules/shared/importer/importerActions';
import ProgramControlTemplateService from 'src/modules/programControlTemplate/programControlTemplateService';
import selectors from 'src/modules/programControlTemplate/importer/programControlTemplateImporterSelectors';

const programControlTemplateImporterActions =
  importerActions(
    'PROGRAMCONTROLTEMPLATE_IMPORTER',
    selectors,
    ProgramControlTemplateService.import,
    fields,
    i18n(
      'entities.programControlTemplate.importer.fileName',
    ),
  );

export default programControlTemplateImporterActions;

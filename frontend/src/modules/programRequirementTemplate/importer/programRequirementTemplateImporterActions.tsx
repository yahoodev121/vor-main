import { i18n } from 'src/i18n';
import fields from 'src/modules/programRequirementTemplate/importer/programRequirementTemplateImporterFields';
import importerActions from 'src/modules/shared/importer/importerActions';
import ProgramRequirementTemplateService from 'src/modules/programRequirementTemplate/programRequirementTemplateService';
import selectors from 'src/modules/programRequirementTemplate/importer/programRequirementTemplateImporterSelectors';

const programRequirementTemplateImporterActions =
  importerActions(
    'PROGRAMREQUIREMENTTEMPLATE_IMPORTER',
    selectors,
    ProgramRequirementTemplateService.import,
    fields,
    i18n(
      'entities.programRequirementTemplate.importer.fileName',
    ),
  );

export default programRequirementTemplateImporterActions;

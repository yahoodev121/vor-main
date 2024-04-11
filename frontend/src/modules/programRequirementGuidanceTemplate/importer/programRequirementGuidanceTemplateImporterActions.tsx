import { i18n } from 'src/i18n';
import fields from 'src/modules/programRequirementGuidanceTemplate/importer/programRequirementGuidanceTemplateImporterFields';
import importerActions from 'src/modules/shared/importer/importerActions';
import ProgramRequirementGuidanceTemplateService from 'src/modules/programRequirementGuidanceTemplate/programRequirementGuidanceTemplateService';
import selectors from 'src/modules/programRequirementGuidanceTemplate/importer/programRequirementGuidanceTemplateImporterSelectors';

const programRequirementGuidanceTemplateImporterActions =
  importerActions(
    'PROGRAMREQUIREMENTGUIDANCETEMPLATE_IMPORTER',
    selectors,
    ProgramRequirementGuidanceTemplateService.import,
    fields,
    i18n(
      'entities.programRequirementGuidanceTemplate.importer.fileName',
    ),
  );

export default programRequirementGuidanceTemplateImporterActions;

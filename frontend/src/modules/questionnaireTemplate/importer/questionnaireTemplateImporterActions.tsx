import importerActions from 'src/modules/shared/importer/importerActions';
import selectors from 'src/modules/questionnaireTemplate/importer/questionnaireTemplateImporterSelectors';
import QuestionnaireTemplateService from 'src/modules/questionnaireTemplate/questionnaireTemplateService';
import fields from 'src/modules/questionnaireTemplate/importer/questionnaireTemplateImporterFields';
import { i18n } from 'src/i18n';

const questionnaireTemplateImporterActions =
  importerActions(
    'QUESTIONNAIRETEMPLATE_IMPORTER',
    selectors,
    QuestionnaireTemplateService.import,
    fields,
    i18n(
      'entities.questionnaireTemplate.importer.fileName',
    ),
  );

export default questionnaireTemplateImporterActions;

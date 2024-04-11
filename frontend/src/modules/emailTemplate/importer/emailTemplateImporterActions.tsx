import importerActions from 'src/modules/shared/importer/importerActions';
import selectors from 'src/modules/emailTemplate/importer/emailTemplateImporterSelectors';
import EmailTemplateService from 'src/modules/emailTemplate/emailTemplateService';
import fields from 'src/modules/emailTemplate/importer/emailTemplateImporterFields';
import { i18n } from 'src/i18n';

const emailTemplateImporterActions = importerActions(
  'EMAILTEMPLATE_IMPORTER',
  selectors,
  EmailTemplateService.import,
  fields,
  i18n('entities.emailTemplate.importer.fileName'),
);

export default emailTemplateImporterActions;

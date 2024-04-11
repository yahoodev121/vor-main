import importerActions from 'src/modules/shared/importer/importerActions';
import selectors from 'src/modules/projectPriority/importer/projectPriorityImporterSelectors';
import ProjectPriorityService from 'src/modules/projectPriority/projectPriorityService';
import fields from 'src/modules/projectPriority/importer/projectPriorityImporterFields';
import { i18n } from 'src/i18n';

const projectPriorityImporterActions = importerActions(
  'PROJECTPRIORITY_IMPORTER',
  selectors,
  ProjectPriorityService.import,
  fields,
  i18n('entities.projectPriority.importer.fileName'),
);

export default projectPriorityImporterActions;

import importerActions from 'src/modules/shared/importer/importerActions';
import selectors from 'src/modules/project/importer/projectImporterSelectors';
import ProjectService from 'src/modules/project/projectService';
import fields from 'src/modules/project/importer/projectImporterFields';
import { i18n } from 'src/i18n';

const projectImporterActions = importerActions(
  'PROJECT_IMPORTER',
  selectors,
  ProjectService.import,
  fields,
  i18n('entities.project.importer.fileName'),
);

export default projectImporterActions;

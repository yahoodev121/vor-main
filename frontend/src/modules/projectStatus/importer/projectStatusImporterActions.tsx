import importerActions from 'src/modules/shared/importer/importerActions';
import selectors from 'src/modules/projectStatus/importer/projectStatusImporterSelectors';
import ProjectStatusService from 'src/modules/projectStatus/projectStatusService';
import fields from 'src/modules/projectStatus/importer/projectStatusImporterFields';
import { i18n } from 'src/i18n';

const projectStatusImporterActions = importerActions(
  'PROJECTSTATUS_IMPORTER',
  selectors,
  ProjectStatusService.import,
  fields,
  i18n('entities.projectStatus.importer.fileName'),
);

export default projectStatusImporterActions;

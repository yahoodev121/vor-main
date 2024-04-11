import importerActions from 'src/modules/shared/importer/importerActions';
import selectors from 'src/modules/projectType/importer/projectTypeImporterSelectors';
import ProjectTypeService from 'src/modules/projectType/projectTypeService';
import fields from 'src/modules/projectType/importer/projectTypeImporterFields';
import { i18n } from 'src/i18n';

const projectTypeImporterActions = importerActions(
  'PROJECTTYPE_IMPORTER',
  selectors,
  ProjectTypeService.import,
  fields,
  i18n('entities.projectType.importer.fileName'),
);

export default projectTypeImporterActions;

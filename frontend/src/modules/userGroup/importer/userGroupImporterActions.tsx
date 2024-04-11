import importerActions from 'src/modules/shared/importer/importerActions';
import selectors from 'src/modules/userGroup/importer/userGroupImporterSelectors';
import UserGroupService from 'src/modules/userGroup/userGroupService';
import fields from 'src/modules/userGroup/importer/userGroupImporterFields';
import { i18n } from 'src/i18n';

const userGroupImporterActions = importerActions(
  'USERGROUP_IMPORTER',
  selectors,
  UserGroupService.import,
  fields,
  i18n('entities.userGroup.importer.fileName'),
);

export default userGroupImporterActions;

import { i18n } from 'src/i18n';
import fields from 'src/modules/programControl/importer/programControlImporterFields';
import importerActions from 'src/modules/shared/importer/importerActions';
import ProgramControlService from 'src/modules/programControl/programControlService';
import selectors from 'src/modules/programControl/importer/programControlImporterSelectors';

const programControlImporterActions = importerActions(
  'PROGRAMCONTROL_IMPORTER',
  selectors,
  ProgramControlService.import,
  fields,
  i18n('entities.programControl.importer.fileName'),
);

export default programControlImporterActions;

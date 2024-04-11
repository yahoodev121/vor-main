import { i18n } from 'src/i18n';
import fields from 'src/modules/program/importer/programImporterFields';
import importerActions from 'src/modules/shared/importer/importerActions';
import ProgramService from 'src/modules/program/programService';
import selectors from 'src/modules/program/importer/programImporterSelectors';

const programImporterActions = importerActions(
  'PROGRAM_IMPORTER',
  selectors,
  ProgramService.import,
  fields,
  i18n('entities.program.importer.fileName'),
);

export default programImporterActions;

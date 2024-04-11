import { i18n } from 'src/i18n';
import fields from 'src/modules/programRequirement/importer/programRequirementImporterFields';
import importerActions from 'src/modules/shared/importer/importerActions';
import ProgramRequirementService from 'src/modules/programRequirement/programRequirementService';
import selectors from 'src/modules/programRequirement/importer/programRequirementImporterSelectors';

const programRequirementImporterActions = importerActions(
  'PROGRAMREQUIREMENT_IMPORTER',
  selectors,
  ProgramRequirementService.import,
  fields,
  i18n('entities.programRequirement.importer.fileName'),
);

export default programRequirementImporterActions;

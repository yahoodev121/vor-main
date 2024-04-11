import importerActions from 'src/modules/shared/importer/importerActions';
import selectors from 'src/modules/campaign/importer/campaignImporterSelectors';
import CampaignService from 'src/modules/campaign/campaignService';
import fields from 'src/modules/campaign/importer/campaignImporterFields';
import { i18n } from 'src/i18n';

const campaignImporterActions = importerActions(
  'CAMPAIGN_IMPORTER',
  selectors,
  CampaignService.import,
  fields,
  i18n('entities.campaign.importer.fileName'),
);

export default campaignImporterActions;

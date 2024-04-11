import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'name',
    label: i18n('entities.campaign.fields.name'),
  },
  {
    name: 'description',
    label: i18n('entities.campaign.fields.description'),
  },
  {
    name: 'status',
    label: i18n('entities.campaign.fields.status'),
  },
  {
    name: 'type',
    label: i18n('entities.campaign.fields.type'),
  },
  {
    name: 'audience',
    label: i18n('entities.campaign.fields.audience'),
  },
  {
    name: 'dueDate',
    label: i18n('entities.campaign.fields.dueDate'),
    render: exporterRenders.datetime(),
  },
  {
    name: 'progress',
    label: i18n('entities.campaign.fields.progress'),
  },
  {
    name: 'totalRecipients',
    label: i18n('entities.campaign.fields.totalRecipients'),
  },
  {
    name: 'createdAt',
    label: i18n('entities.campaign.fields.createdAt'),
    render: exporterRenders.datetime(),
  },
  {
    name: 'updatedAt',
    label: i18n('entities.campaign.fields.updatedAt'),
    render: exporterRenders.datetime(),
  },
];

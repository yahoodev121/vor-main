import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'name',
    label: i18n('entities.emailTemplate.fields.name'),
  },
  {
    name: 'fromEmailAddress',
    label: i18n(
      'entities.emailTemplate.fields.fromEmailAddress',
    ),
  },
  {
    name: 'subject',
    label: i18n('entities.emailTemplate.fields.subject'),
  },
  {
    name: 'body',
    label: i18n('entities.emailTemplate.fields.body'),
  },
  {
    name: 'createdAt',
    label: i18n('entities.emailTemplate.fields.createdAt'),
    render: exporterRenders.datetime(),
  },
  {
    name: 'updatedAt',
    label: i18n('entities.emailTemplate.fields.updatedAt'),
    render: exporterRenders.datetime(),
  },
];

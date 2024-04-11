import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  // {
  //   name: 'id',
  //   label: i18n('entities.qaLibrary.fields.id'),
  // },
  {
    name: 'question',
    label: i18n('entities.qaLibrary.fields.question'),
  },
  {
    name: 'answer',
    label: i18n('entities.qaLibrary.fields.answer'),
  },
  {
    name: 'aiKnowledgebase',
    label: i18n('entities.qaLibrary.fields.aiKnowledgebase'),
    render: exporterRenders.boolean(),
  },
  {
    name: 'expirationDate',
    label: i18n('entities.qaLibrary.fields.expirationDate'),
    render: exporterRenders.datetime(),
  },
  {
    name: 'createdAt',
    label: i18n('entities.qaLibrary.fields.createdAt'),
    render: exporterRenders.datetime(),
  },
  {
    name: 'updatedAt',
    label: i18n('entities.qaLibrary.fields.updatedAt'),
    render: exporterRenders.datetime(),
  },
];

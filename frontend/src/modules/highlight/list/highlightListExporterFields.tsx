import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'title',
    label: i18n('entities.highlight.fields.title'),
  },
  {
    name: 'source',
    label: i18n('entities.highlight.fields.source'),
  },
  {
    name: 'description',
    label: i18n('entities.highlight.fields.description'),
  },
  {
    name: 'tags',
    label: i18n('entities.highlight.fields.tags'),
    render: exporterRenders.relationToMany('tag'),
  },
  {
    name: 'createdAt',
    label: i18n('entities.highlight.fields.createdAt'),
    render: exporterRenders.datetime(),
  },
  {
    name: 'updatedAt',
    label: i18n('entities.highlight.fields.updatedAt'),
    render: exporterRenders.datetime(),
  },
];

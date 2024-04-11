import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'id',
    label: i18n('entities.programTemplate.fields.id'),
  },
  {
    name: 'name',
    label: i18n('entities.programTemplate.fields.name'),
  },
  {
    name: 'description',
    label: i18n(
      'entities.programTemplate.fields.description',
    ),
  },
  {
    name: 'createdAt',
    label: i18n(
      'entities.programTemplate.fields.createdAt',
    ),
    render: exporterRenders.datetime(),
  },
  {
    name: 'updatedAt',
    label: i18n(
      'entities.programTemplate.fields.updatedAt',
    ),
    render: exporterRenders.datetime(),
  },
];

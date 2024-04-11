import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  // {
  //   name: 'id',
  //   label: i18n('entities.projectType.fields.id'),
  // },
  {
    name: 'type',
    label: i18n('entities.projectType.fields.type'),
  },
  {
    name: 'createdAt',
    label: i18n('entities.projectType.fields.createdAt'),
    render: exporterRenders.datetime(),
  },
  {
    name: 'updatedAt',
    label: i18n('entities.projectType.fields.updatedAt'),
    render: exporterRenders.datetime(),
  },
];

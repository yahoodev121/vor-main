import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  // {
  //   name: 'id',
  //   label: i18n('entities.projectStatus.fields.id'),
  // },
  {
    name: 'status',
    label: i18n('entities.projectStatus.fields.status'),
  },
  {
    name: 'createdAt',
    label: i18n('entities.projectStatus.fields.createdAt'),
    render: exporterRenders.datetime(),
  },
  {
    name: 'updatedAt',
    label: i18n('entities.projectStatus.fields.updatedAt'),
    render: exporterRenders.datetime(),
  },
];

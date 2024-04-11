import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  // {
  //   name: 'id',
  //   label: i18n('entities.userGroup.fields.id'),
  // },
  {
    name: 'name',
    label: i18n('entities.userGroup.fields.name'),
  },
  {
    name: 'description',
    label: i18n('entities.userGroup.fields.description'),
  },
  {
    name: 'type',
    label: i18n('entities.userGroup.fields.type'),
  },
  {
    name: 'totalUsers',
    label: i18n('entities.userGroup.fields.totalUsers'),
  },
  {
    name: 'users',
    label: i18n('entities.userGroup.fields.users'),
    render: exporterRenders.relationToManyUser(),
  },
  {
    name: 'createdAt',
    label: i18n('entities.userGroup.fields.createdAt'),
    render: exporterRenders.datetime(),
  },
  {
    name: 'updatedAt',
    label: i18n('entities.userGroup.fields.updatedAt'),
    render: exporterRenders.datetime(),
  },
];

import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'id',
    label: i18n('entities.program.fields.id'),
  },
  {
    name: 'name',
    label: i18n('entities.program.fields.name'),
  },
  {
    name: 'description',
    label: i18n('entities.program.fields.description'),
  },
  {
    name: 'status',
    label: i18n('entities.program.fields.status'),
  },
  {
    name: 'totalRequirements',
    label: i18n(
      'entities.program.fields.totalRequirements',
    ),
  },
  {
    name: 'totalControls',
    label: i18n('entities.program.fields.totalControls'),
  },
  {
    name: 'totalControlHealth',
    label: i18n(
      'entities.program.fields.totalControlHealth',
    ),
  },
  {
    name: 'createdAt',
    label: i18n('entities.program.fields.createdAt'),
    render: exporterRenders.datetime(),
  },
  {
    name: 'updatedAt',
    label: i18n('entities.program.fields.updatedAt'),
    render: exporterRenders.datetime(),
  },
];

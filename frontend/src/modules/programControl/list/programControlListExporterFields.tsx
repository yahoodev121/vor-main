import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'id',
    label: i18n('entities.programControl.fields.id'),
  },
  {
    name: 'name',
    label: i18n('entities.programControl.fields.name'),
  },
  {
    name: 'description',
    label: i18n(
      'entities.programControl.fields.description',
    ),
  },
  {
    name: 'tasks',
    label: i18n('entities.programControl.fields.tasks'),
    render: exporterRenders.relationToMany(),
  },
  {
    name: 'requirementIDs',
    label: i18n(
      'entities.programControl.fields.requirementIDs',
    ),
    render: exporterRenders.stringArray(),
  },
  {
    name: 'requirementNames',
    label: i18n(
      'entities.programControl.fields.requirementNames',
    ),
    render: exporterRenders.stringArray(),
  },
  {
    name: 'createdAt',
    label: i18n('entities.programControl.fields.createdAt'),
    render: exporterRenders.datetime(),
  },
  {
    name: 'updatedAt',
    label: i18n('entities.programControl.fields.updatedAt'),
    render: exporterRenders.datetime(),
  },
];

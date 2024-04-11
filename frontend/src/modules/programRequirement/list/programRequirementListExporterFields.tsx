import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'id',
    label: i18n('entities.programRequirement.fields.id'),
  },
  {
    name: 'programs',
    label: i18n(
      'entities.programRequirement.fields.programs',
    ),
    render: exporterRenders.relationToMany('name'),
  },
  {
    name: 'requirementID',
    label: i18n(
      'entities.programRequirement.fields.requirementID',
    ),
  },
  {
    name: 'name',
    label: i18n('entities.programRequirement.fields.name'),
  },
  {
    name: 'description',
    label: i18n(
      'entities.programRequirement.fields.description',
    ),
  },
  {
    name: 'totalControls',
    label: i18n(
      'entities.programRequirement.fields.totalControls',
    ),
  },
  {
    name: 'totalControlHealth',
    label: i18n(
      'entities.programRequirement.fields.totalControlHealth',
    ),
  },
  {
    name: 'createdAt',
    label: i18n(
      'entities.programRequirement.fields.createdAt',
    ),
    render: exporterRenders.datetime(),
  },
  {
    name: 'updatedAt',
    label: i18n(
      'entities.programRequirement.fields.updatedAt',
    ),
    render: exporterRenders.datetime(),
  },
];

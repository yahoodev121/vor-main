import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'id',
    label: i18n(
      'entities.programRequirementTemplate.fields.id',
    ),
  },
  {
    name: 'programTemplate',
    label: i18n(
      'entities.programRequirementTemplate.fields.programTemplate',
    ),
    render: exporterRenders.relationToMany(),
  },
  {
    name: 'requirementID',
    label: i18n(
      'entities.programRequirementTemplate.fields.requirementID',
    ),
  },
  {
    name: 'name',
    label: i18n(
      'entities.programRequirementTemplate.fields.name',
    ),
  },
  {
    name: 'description',
    label: i18n(
      'entities.programRequirementTemplate.fields.description',
    ),
  },
  {
    name: 'guidanceTemplates',
    label: i18n(
      'entities.programRequirementTemplate.fields.guidanceTemplates',
    ),
    render: exporterRenders.relationToMany(),
  },
  {
    name: 'totalControlTemplates',
    label: i18n(
      'entities.programRequirementTemplate.fields.totalControlTemplates',
    ),
  },
  {
    name: 'controlTemplates',
    label: i18n(
      'entities.programRequirementTemplate.fields.controlTemplates',
    ),
    render: exporterRenders.relationToMany(),
  },
  {
    name: 'createdAt',
    label: i18n(
      'entities.programRequirementTemplate.fields.createdAt',
    ),
    render: exporterRenders.datetime(),
  },
  {
    name: 'updatedAt',
    label: i18n(
      'entities.programRequirementTemplate.fields.updatedAt',
    ),
    render: exporterRenders.datetime(),
  },
];

import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'id',
    label: i18n(
      'entities.programRequirementGuidanceTemplate.fields.id',
    ),
  },
  {
    name: 'name',
    label: i18n(
      'entities.programRequirementGuidanceTemplate.fields.name',
    ),
  },
  {
    name: 'description',
    label: i18n(
      'entities.programRequirementGuidanceTemplate.fields.description',
    ),
  },
  {
    name: 'programRequirementTemplate',
    label: i18n(
      'entities.programRequirementGuidanceTemplate.fields.programRequirementTemplate',
    ),
    render: exporterRenders.relationToMany(),
  },
  {
    name: 'productCategories',
    label: i18n(
      'entities.programRequirementGuidanceTemplate.fields.productCategories',
    ),
    render: exporterRenders.relationToMany(),
  },
  {
    name: 'createdAt',
    label: i18n(
      'entities.programRequirementGuidanceTemplate.fields.createdAt',
    ),
    render: exporterRenders.datetime(),
  },
  {
    name: 'updatedAt',
    label: i18n(
      'entities.programRequirementGuidanceTemplate.fields.updatedAt',
    ),
    render: exporterRenders.datetime(),
  },
];

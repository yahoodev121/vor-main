import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'id',
    label: i18n(
      'entities.programControlTemplate.fields.id',
    ),
  },
  {
    name: 'name',
    label: i18n(
      'entities.programControlTemplate.fields.name',
    ),
  },
  {
    name: 'description',
    label: i18n(
      'entities.programControlTemplate.fields.description',
    ),
  },
  {
    name: 'requirementTemplateIDs',
    label: i18n(
      'entities.programControlTemplate.fields.requirementTemplateIDs',
    ),
    render: exporterRenders.stringArray(),
  },
  {
    name: 'requirementTemplateNames',
    label: i18n(
      'entities.programControlTemplate.fields.requirementTemplateNames',
    ),
    render: exporterRenders.stringArray(),
  },
  {
    name: 'createdAt',
    label: i18n(
      'entities.programControlTemplate.fields.createdAt',
    ),
    render: exporterRenders.datetime(),
  },
  {
    name: 'updatedAt',
    label: i18n(
      'entities.programControlTemplate.fields.updatedAt',
    ),
    render: exporterRenders.datetime(),
  },
];

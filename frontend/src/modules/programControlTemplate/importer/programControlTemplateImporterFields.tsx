import { i18n } from 'src/i18n';
import schemas from 'src/modules/shared/yup/yupImporterSchemas';

export default [
  {
    name: 'name',
    label: i18n(
      'entities.programControlTemplate.fields.name',
    ),
    schema: schemas.string(
      i18n('entities.programControlTemplate.fields.name'),
      {
        required: true,
        min: 1,
        max: 100,
      },
    ),
  },
  {
    name: 'description',
    label: i18n(
      'entities.programControlTemplate.fields.description',
    ),
    schema: schemas.string(
      i18n(
        'entities.programControlTemplate.fields.description',
      ),
      {
        required: true,
        min: 1,
        max: 250,
      },
    ),
  },
  {
    name: 'requirementTemplates',
    label: i18n(
      'entities.programControlTemplate.fields.requirementTemplates',
    ),
    schema: schemas.relationToMany(
      i18n(
        'entities.programControlTemplate.fields.requirementTemplates',
      ),
      {},
    ),
  },
];

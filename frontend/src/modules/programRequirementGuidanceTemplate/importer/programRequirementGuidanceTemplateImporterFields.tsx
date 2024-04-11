import { i18n } from 'src/i18n';
import schemas from 'src/modules/shared/yup/yupImporterSchemas';

export default [
  {
    name: 'name',
    label: i18n(
      'entities.programRequirementGuidanceTemplate.fields.name',
    ),
    schema: schemas.string(
      i18n(
        'entities.programRequirementGuidanceTemplate.fields.name',
      ),
      {
        required: true,
        max: 100,
        min: 1,
      },
    ),
  },
  {
    name: 'description',
    label: i18n(
      'entities.programRequirementGuidanceTemplate.fields.description',
    ),
    schema: schemas.string(
      i18n(
        'entities.programRequirementGuidanceTemplate.fields.description',
      ),
      {
        required: true,
        max: 500,
        min: 1,
      },
    ),
  },
  {
    name: 'programRequirementTemplate',
    label: i18n(
      'entities.programRequirementGuidanceTemplate.fields.programRequirementTemplate',
    ),
    schema: schemas.relationToMany(
      i18n(
        'entities.programRequirementGuidanceTemplate.fields.programRequirementTemplate',
      ),
      {
        required: true,
      },
    ),
  },
  {
    name: 'productCategories',
    label: i18n(
      'entities.programRequirementGuidanceTemplate.fields.productCategories',
    ),
    schema: schemas.relationToMany(
      i18n(
        'entities.programRequirementGuidanceTemplate.fields.productCategories',
      ),
      {},
    ),
  },
];

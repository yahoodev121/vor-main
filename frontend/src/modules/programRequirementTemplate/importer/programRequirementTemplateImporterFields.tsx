import { i18n } from 'src/i18n';
import schemas from 'src/modules/shared/yup/yupImporterSchemas';

export default [
  {
    name: 'programTemplate',
    label: i18n(
      'entities.programRequirementTemplate.fields.programTemplate',
    ),
    schema: schemas.relationToMany(
      i18n(
        'entities.programRequirementTemplate.fields.programTemplate',
      ),
      {
        required: true,
      },
    ),
  },
  {
    name: 'name',
    label: i18n(
      'entities.programRequirementTemplate.fields.name',
    ),
    schema: schemas.string(
      i18n(
        'entities.programRequirementTemplate.fields.name',
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
      'entities.programRequirementTemplate.fields.description',
    ),
    schema: schemas.string(
      i18n(
        'entities.programRequirementTemplate.fields.description',
      ),
      {
        max: 250,
      },
    ),
  },
  {
    name: 'requirementID',
    label: i18n(
      'entities.programRequirementTemplate.fields.requirementID',
    ),
    schema: schemas.string(
      i18n(
        'entities.programRequirementTemplate.fields.requirementID',
      ),
      {
        required: true,
        max: 15,
        min: 1,
      },
    ),
  },
];

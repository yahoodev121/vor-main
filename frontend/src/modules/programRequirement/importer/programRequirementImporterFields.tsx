import { i18n } from 'src/i18n';
import schemas from 'src/modules/shared/yup/yupImporterSchemas';

export default [
  {
    name: 'programs',
    label: i18n(
      'entities.programRequirement.fields.programs',
    ),
    schema: schemas.relationToMany(
      i18n('entities.programRequirement.fields.programs'),
      {
        required: true,
      },
    ),
  },
  {
    name: 'requirementID',
    label: i18n(
      'entities.programRequirement.fields.requirementID',
    ),
    schema: schemas.string(
      i18n(
        'entities.programRequirement.fields.requirementID',
      ),
      {
        required: true,
        max: 15,
        min: 1,
      },
    ),
  },
  {
    name: 'name',
    label: i18n('entities.programRequirement.fields.name'),
    schema: schemas.string(
      i18n('entities.programRequirement.fields.name'),
      {
        required: true,
        max: 300,
        min: 1,
      },
    ),
  },
  {
    name: 'description',
    label: i18n(
      'entities.programRequirement.fields.description',
    ),
    schema: schemas.string(
      i18n(
        'entities.programRequirement.fields.description',
      ),
      {
        max: 1000,
      },
    ),
  },
];

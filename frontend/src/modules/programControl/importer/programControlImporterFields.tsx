import { i18n } from 'src/i18n';
import schemas from 'src/modules/shared/yup/yupImporterSchemas';

export default [
  {
    name: 'name',
    label: i18n('entities.programControl.fields.name'),
    schema: schemas.string(
      i18n('entities.programControl.fields.name'),
      {
        required: true,
        min: 1,
        max: 300,
      },
    ),
  },
  {
    name: 'description',
    label: i18n(
      'entities.programControl.fields.description',
    ),
    schema: schemas.string(
      i18n('entities.programControl.fields.description'),
      {
        required: true,
        min: 1,
        max: 1000,
      },
    ),
  },
  {
    name: 'tasks',
    label: i18n('entities.programControl.fields.tasks'),
    schema: schemas.relationToMany(
      i18n('entities.programControl.fields.tasks'),
      {},
    ),
  },
  {
    name: 'requirements',
    label: i18n(
      'entities.programControl.fields.requirements',
    ),
    schema: schemas.relationToMany(
      i18n('entities.programControl.fields.requirements'),
      {},
    ),
  },
];

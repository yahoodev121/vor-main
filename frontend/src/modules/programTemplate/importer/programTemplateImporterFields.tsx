import { i18n } from 'src/i18n';
import schemas from 'src/modules/shared/yup/yupImporterSchemas';

export default [
  {
    name: 'name',
    label: i18n('entities.programTemplate.fields.name'),
    schema: schemas.string(
      i18n('entities.programTemplate.fields.name'),
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
      'entities.programTemplate.fields.description',
    ),
    schema: schemas.string(
      i18n('entities.programTemplate.fields.description'),
      {
        max: 250,
      },
    ),
  },
];

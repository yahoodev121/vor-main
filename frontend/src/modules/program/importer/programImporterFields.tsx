import { i18n } from 'src/i18n';
import programEnumerators from 'src/modules/program/programEnumerators';
import schemas from 'src/modules/shared/yup/yupImporterSchemas';

export default [
  {
    name: 'name',
    label: i18n('entities.program.fields.name'),
    schema: schemas.string(
      i18n('entities.program.fields.name'),
      {
        required: true,
        max: 100,
        min: 1,
      },
    ),
  },
  {
    name: 'description',
    label: i18n('entities.program.fields.description'),
    schema: schemas.string(
      i18n('entities.program.fields.description'),
      {
        max: 250,
      },
    ),
  },
  {
    name: 'status',
    label: i18n('entities.program.fields.status'),
    schema: schemas.enumerator(
      i18n('entities.program.fields.status'),
      {
        required: true,
        options: programEnumerators.status,
      },
    ),
  },
];

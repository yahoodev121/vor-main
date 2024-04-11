import schemas from 'src/modules/shared/yup/yupImporterSchemas';
import { i18n } from 'src/i18n';

export default [
  {
    name: 'type',
    label: i18n('entities.projectType.fields.type'),
    schema: schemas.string(
      i18n('entities.projectType.fields.type'),
      {
        required: true,
        min: 1,
        max: 50,
      },
    ),
  },
];

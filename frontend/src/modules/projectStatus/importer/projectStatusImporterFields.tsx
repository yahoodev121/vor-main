import schemas from 'src/modules/shared/yup/yupImporterSchemas';
import { i18n } from 'src/i18n';

export default [
  {
    name: 'status',
    label: i18n('entities.projectStatus.fields.status'),
    schema: schemas.string(
      i18n('entities.projectStatus.fields.status'),
      {
        required: true,
        min: 1,
        max: 50,
      },
    ),
  },
];

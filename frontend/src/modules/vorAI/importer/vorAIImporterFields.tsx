import { i18n } from 'src/i18n';
import schemas from 'src/modules/shared/yup/yupImporterSchemas';

export default [
  {
    name: 'question',
    label: i18n('entities.vorAI.fields.question'),
    schema: schemas.string(
      i18n('entities.vorAI.fields.question'),
      {
        required: true,
        min: 1,
      },
    ),
  },
];

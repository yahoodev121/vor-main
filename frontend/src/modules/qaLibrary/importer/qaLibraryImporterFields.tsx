import schemas from 'src/modules/shared/yup/yupImporterSchemas';
import { i18n } from 'src/i18n';

export default [
  {
    name: 'question',
    label: i18n('entities.qaLibrary.fields.question'),
    schema: schemas.string(
      i18n('entities.qaLibrary.fields.question'),
      {
        required: true,
        min: 1,
        max: 255,
      },
    ),
  },
  {
    name: 'answer',
    label: i18n(
      'entities.qaLibrary.fields.answer',
    ),
    schema: schemas.string(
      i18n('entities.qaLibrary.fields.answer'),
      {
        required: true,
        min: 1,
        max: 255,
      },
    ),
  },
  {
    name: 'aiKnowledgebase',
    label: i18n(
      'entities.qaLibrary.fields.aiKnowledgebase',
    ),
    schema: schemas.boolean(
      i18n('entities.qaLibrary.fields.aiKnowledgebase'),
      {
        required: true,
      },
    ),
  },
  {
    name: 'expirationDate',
    label: i18n(
      'entities.qaLibrary.fields.expirationDate',
    ),
    schema: schemas.datetime(
      i18n('entities.qaLibrary.fields.expirationDate'),
      {
        required: true,
      },
    ),
  },
];

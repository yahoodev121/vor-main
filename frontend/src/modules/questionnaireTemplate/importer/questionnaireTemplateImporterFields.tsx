import schemas from 'src/modules/shared/yup/yupImporterSchemas';
import { i18n } from 'src/i18n';

export default [
  {
    name: 'name',
    label: i18n(
      'entities.questionnaireTemplate.fields.name',
    ),
    schema: schemas.string(
      i18n('entities.questionnaireTemplate.fields.name'),
      {
        required: true,
        min: 1,
        max: 100,
      },
    ),
  },
  {
    name: 'questionnaire',
    label: i18n(
      'entities.questionnaireTemplate.fields.questionnaire',
    ),
    schema: schemas.json(
      i18n(
        'entities.questionnaireTemplate.fields.questionnaire',
      ),
    ),
  },
];

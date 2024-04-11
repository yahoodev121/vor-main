import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'name',
    label: i18n(
      'entities.questionnaireTemplate.fields.name',
    ),
  },
  {
    name: 'questionnaire',
    label: i18n(
      'entities.questionnaireTemplate.fields.questionnaire',
    ),
    render: exporterRenders.json(),
  },
  {
    name: 'totalQuestions',
    label: i18n(
      'entities.questionnaireTemplate.fields.totalQuestions',
    ),
  },
  {
    name: 'createdAt',
    label: i18n(
      'entities.questionnaireTemplate.fields.createdAt',
    ),
    render: exporterRenders.datetime(),
  },
  {
    name: 'updatedAt',
    label: i18n(
      'entities.questionnaireTemplate.fields.updatedAt',
    ),
    render: exporterRenders.datetime(),
  },
];

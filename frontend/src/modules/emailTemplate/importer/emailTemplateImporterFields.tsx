import schemas from 'src/modules/shared/yup/yupImporterSchemas';
import { i18n } from 'src/i18n';
import HtmlViewItem from 'src/view/shared/view/HtmlViewItem';

export default [
  {
    name: 'name',
    label: i18n('entities.emailTemplate.fields.name'),
    schema: schemas.string(
      i18n('entities.emailTemplate.fields.name'),
      {
        required: true,
        min: 1,
        max: 100,
      },
    ),
  },
  {
    name: 'fromEmailAddress',
    label: i18n(
      'entities.emailTemplate.fields.fromEmailAddress',
    ),
    schema: schemas.email(
      i18n(
        'entities.emailTemplate.fields.fromEmailAddress',
      ),
      {
        required: true,
        min: 1,
        max: 100,
      },
    ),
  },
  {
    name: 'subject',
    label: i18n('entities.emailTemplate.fields.subject'),
    schema: schemas.string(
      i18n('entities.emailTemplate.fields.subject'),
      {
        required: true,
        min: 1,
        max: 200,
      },
    ),
  },
  {
    name: 'body',
    label: i18n('entities.emailTemplate.fields.body'),
    schema: schemas.string(
      i18n('entities.emailTemplate.fields.body'),
      {
        required: true,
        min: 1,
        // max: 5000,
      },
    ),
    render: (value) => <HtmlViewItem value={value} />,
  },
];

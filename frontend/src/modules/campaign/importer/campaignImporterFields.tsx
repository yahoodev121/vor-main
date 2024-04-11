import schemas from 'src/modules/shared/yup/yupImporterSchemas';
import { i18n } from 'src/i18n';
import campaignEnumerators from 'src/modules/campaign/campaignEnumerators';
import moment from 'moment';

export default [
  {
    name: 'name',
    label: i18n('entities.campaign.fields.name'),
    schema: schemas.string(
      i18n('entities.campaign.fields.name'),
      {
        required: true,
        min: 1,
        max: 100,
      },
    ),
  },
  {
    name: 'description',
    label: i18n('entities.campaign.fields.description'),
    schema: schemas.string(
      i18n('entities.campaign.fields.description'),
      {
        min: 0,
        max: 500,
      },
    ),
  },
  {
    name: 'status',
    label: i18n('entities.campaign.fields.status'),
    schema: schemas.enumerator(
      i18n('entities.campaign.fields.status'),
      {
        required: true,
        options: campaignEnumerators.status,
      },
    ),
  },
  {
    name: 'type',
    label: i18n('entities.campaign.fields.type'),
    schema: schemas.enumerator(
      i18n('entities.campaign.fields.type'),
      {
        required: true,
        options: campaignEnumerators.type,
      },
    ),
  },
  {
    name: 'audience',
    label: i18n('entities.campaign.fields.audience'),
    schema: schemas.enumerator(
      i18n('entities.campaign.fields.audience'),
      {
        required: true,
        options: campaignEnumerators.audience,
      },
    ),
  },
  {
    name: 'dueDate',
    label: i18n('entities.campaign.fields.dueDate'),
    schema: schemas.datetime(
      i18n('entities.campaign.fields.dueDate'),
      {},
    ),
    render: (value) =>
      value && value instanceof Date
        ? moment(value).format('YYYY-MM-DD HH:mm')
        : value,
  },
  {
    name: 'progress',
    label: i18n('entities.campaign.fields.progress'),
    schema: schemas.integer(
      i18n('entities.campaign.fields.progress'),
      {
        min: 0,
        max: 100,
      },
    ),
  },
  {
    name: 'totalRecipients',
    label: i18n('entities.campaign.fields.totalRecipients'),
    schema: schemas.integer(
      i18n('entities.campaign.fields.totalRecipients'),
      {
        min: 1,
      },
    ),
  },
];

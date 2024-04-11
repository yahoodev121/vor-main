import schemas from 'src/modules/shared/yup/yupImporterSchemas';
import { i18n } from 'src/i18n';
import moment from 'moment';

export default [
  {
    name: 'reference',
    label: i18n('entities.project.fields.reference'),
    schema: schemas.integer(
      i18n('entities.project.fields.reference'),
      {
        required: true,
      },
    ),
  },
  {
    name: 'name',
    label: i18n('entities.project.fields.name'),
    schema: schemas.string(
      i18n('entities.project.fields.name'),
      {
        required: true,
        min: 1,
        max: 200,
      },
    ),
  },
  {
    name: 'owner',
    label: i18n('entities.project.fields.owner'),
    schema: schemas.relationToOne(
      i18n('entities.project.fields.owner'),
      {
        required: true,
      },
    ),
  },
  {
    name: 'description',
    label: i18n('entities.project.fields.description'),
    schema: schemas.string(
      i18n('entities.project.fields.description'),
      {
        max: 1000,
      },
    ),
  },
  {
    name: 'status',
    label: i18n('entities.project.fields.status'),
    schema: schemas.relationToOne(
      i18n('entities.project.fields.status'),
      {
        required: true,
      },
    ),
  },
  {
    name: 'type',
    label: i18n('entities.project.fields.type'),
    schema: schemas.relationToOne(
      i18n('entities.project.fields.type'),
      {
        required: true,
      },
    ),
  },
  {
    name: 'priority',
    label: i18n('entities.project.fields.priority'),
    schema: schemas.relationToOne(
      i18n('entities.project.fields.priority'),
      {
        required: true,
      },
    ),
  },
  {
    name: 'dueDate',
    label: i18n('entities.project.fields.dueDate'),
    schema: schemas.datetime(
      i18n('entities.project.fields.dueDate'),
      {
        required: true,
      },
    ),
    render: (value) =>
      value && value instanceof Date
        ? moment(value).format('YYYY-MM-DD HH:mm')
        : value,
  },
  {
    name: 'completedDate',
    label: i18n('entities.project.fields.completedDate'),
    schema: schemas.datetime(
      i18n('entities.project.fields.completedDate'),
      {},
    ),
    render: (value) =>
      value && value instanceof Date
        ? moment(value).format('YYYY-MM-DD HH:mm')
        : value,
  },
  {
    name: 'teamMembers',
    label: i18n('entities.project.fields.teamMembers'),
    schema: schemas.relationToMany(
      i18n('entities.project.fields.teamMembers'),
      {},
    ),
  },
  {
    name: 'teamGroups',
    label: i18n('entities.project.fields.teamGroups'),
    schema: schemas.relationToMany(
      i18n('entities.project.fields.teamGroups'),
      {
        max: 5,
      },
    ),
  },
  {
    name: 'tasks',
    label: i18n('entities.project.fields.tasks'),
    schema: schemas.relationToMany(
      i18n('entities.project.fields.tasks'),
      {},
    ),
  },
  {
    name: 'risks',
    label: i18n('entities.project.fields.risks'),
    schema: schemas.relationToMany(
      i18n('entities.project.fields.risks'),
      {},
    ),
  },
  {
    name: 'notes',
    label: i18n('entities.project.fields.notes'),
    schema: schemas.relationToMany(
      i18n('entities.project.fields.notes'),
      {
        max: 1000,
      },
    ),
  },
  {
    name: 'attachments',
    label: i18n('entities.project.fields.attachments'),
    schema: schemas.files(
      i18n('entities.project.fields.attachments'),
      {},
    ),
  },
];

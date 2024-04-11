import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';

export default [
  // {
  //   name: 'id',
  //   label: i18n('entities.project.fields.id'),
  // },
  {
    name: 'reference',
    label: i18n('entities.project.fields.reference'),
  },
  {
    name: 'name',
    label: i18n('entities.project.fields.name'),
  },
  {
    name: 'owner',
    label: i18n('entities.project.fields.owner'),
    render: exporterRenders.relationToOneUser(),
  },
  {
    name: 'description',
    label: i18n('entities.project.fields.description'),
  },
  {
    name: 'status',
    label: i18n('entities.project.fields.status'),
    render: exporterRenders.relationToOne('status'),
  },
  {
    name: 'type',
    label: i18n('entities.project.fields.type'),
    render: exporterRenders.relationToOne('type'),
  },
  {
    name: 'priority',
    label: i18n('entities.project.fields.priority'),
    render: exporterRenders.relationToOne('priority'),
  },
  {
    name: 'dueDate',
    label: i18n('entities.project.fields.dueDate'),
    render: exporterRenders.datetime(),
  },
  {
    name: 'completedDate',
    label: i18n('entities.project.fields.completedDate'),
    render: exporterRenders.datetime(),
  },
  {
    name: 'teamMembers',
    label: i18n('entities.project.fields.teamMembers'),
    render: exporterRenders.relationToManyUser(),
  },
  {
    name: 'teamGroups',
    label: i18n('entities.project.fields.teamGroups'),
    render: exporterRenders.relationToMany('name'),
  },
  {
    name: 'tasks',
    label: i18n('entities.project.fields.tasks'),
    render: exporterRenders.relationToMany('title'),
  },
  {
    name: 'risks',
    label: i18n('entities.project.fields.risks'),
    render: exporterRenders.relationToMany('title'),
  },
  {
    name: 'notes',
    label: i18n('entities.project.fields.notes'),
    render: exporterRenders.relationToMany('message'),
  },
  {
    name: 'attachments',
    label: i18n('entities.project.fields.attachments'),
    render: exporterRenders.filesOrImages(),
  },
  {
    name: 'createdAt',
    label: i18n('entities.project.fields.createdAt'),
    render: exporterRenders.datetime(),
  },
  {
    name: 'updatedAt',
    label: i18n('entities.project.fields.updatedAt'),
    render: exporterRenders.datetime(),
  },
];

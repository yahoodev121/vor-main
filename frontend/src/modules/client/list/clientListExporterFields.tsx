import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  // {
  //   name: 'id',
  //   label: i18n('entities.client.fields.id'),
  // },
  {
    name: 'reference',
    label: i18n('entities.client.fields.reference'),
  },
  {
    name: 'name',
    label: i18n('entities.client.fields.name'),
  },
  {
    name: 'status',
    label: i18n('entities.client.fields.status'),
  },
  {
    name: 'rating',
    label: i18n('entities.client.fields.rating'),
  },
  {
    name: 'category',
    label: i18n('entities.client.fields.category'),
    render: exporterRenders.relationToOne('name'),
  },
  {
    name: 'dataProcessed',
    label: i18n('entities.client.fields.dataProcessed'),
    render: exporterRenders.stringArray(),
  },
  {
    name: 'tags',
    label: i18n('entities.vendor.fields.tags'),
    render: exporterRenders.relationToMany('tag'),
  },
  {
    name: 'industry',
    label: i18n('entities.client.fields.industry'),
  },
  {
    name: 'dateOnboarded',
    label: i18n('entities.client.fields.dateOnboarded'),
  },
  {
    name: 'dateOffboarded',
    label: i18n('entities.client.fields.dateOffboarded'),
  },
  {
    name: 'infoSecEmail',
    label: i18n('entities.client.fields.infoSecEmail'),
  },
  {
    name: 'infoSecPhoneNumber',
    label: i18n(
      'entities.client.fields.infoSecPhoneNumber',
    ),
  },
  {
    name: 'privacyEmail',
    label: i18n('entities.client.fields.privacyEmail'),
  },
  {
    name: 'privacyPhoneNumber',
    label: i18n(
      'entities.client.fields.privacyPhoneNumber',
    ),
  },
  {
    name: 'address',
    label: i18n('entities.client.fields.address'),
  },
  {
    name: 'website',
    label: i18n('entities.client.fields.website'),
  },
  {
    name: 'location',
    label: i18n('entities.client.fields.location'),
  },
  {
    name: 'contract',
    label: i18n('entities.client.fields.contract'),
    render: exporterRenders.filesOrImages(),
  },
  {
    name: 'documentation',
    label: i18n('entities.client.fields.documentation'),
    render: exporterRenders.filesOrImages(),
  },
  {
    name: 'gdprRopa',
    label: i18n('entities.client.fields.gdprRopa'),
  },
  {
    name: 'risks',
    label: i18n('entities.client.fields.risks'),
    render: exporterRenders.relationToMany('title'),
  },
  {
    name: 'tasks',
    label: i18n('entities.client.fields.tasks'),
    render: exporterRenders.relationToMany('title'),
  },
  {
    name: 'createdAt',
    label: i18n('entities.client.fields.createdAt'),
    render: exporterRenders.datetime(),
  },
  {
    name: 'updatedAt',
    label: i18n('entities.client.fields.updatedAt'),
    render: exporterRenders.datetime(),
  },
];

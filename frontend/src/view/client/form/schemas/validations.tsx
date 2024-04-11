import * as yup from 'yup';
import { i18n } from 'src/i18n';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import clientEnumerators from 'src/modules/client/clientEnumerators';

const validations = [
  yup.object().shape({
    name: yupFormSchemas.string(
      i18n('entities.client.fields.name'),
      {
        required: true,
        min: 1,
        max: 250,
      },
    ),
    description: yupFormSchemas.string(
      i18n('entities.client.fields.description'),
      {
        min: 1,
        max: 250,
      },
    ),
    logo: yupFormSchemas.images(
      i18n('entities.client.fields.logo'),
      {},
    ),
    status: yupFormSchemas.enumerator(
      i18n('entities.client.fields.status'),
      {
        required: true,
        options: clientEnumerators.status,
      },
    ),
    category: yupFormSchemas.relationToOne(
      i18n('entities.client.fields.category'),
      {
        required: true,
      },
    ),
    rating: yupFormSchemas.enumerator(
      i18n('entities.client.fields.rating'),
      {
        required: true,
        options: clientEnumerators.rating,
      },
    ),
    industry: yupFormSchemas.enumerator(
      i18n('entities.client.fields.industry'),
      {
        required: true,
        options: clientEnumerators.industry,
      },
    ),
    dataProcessed: yupFormSchemas.stringArray(
      i18n('entities.client.fields.dataProcessed'),
      {
        required: true,
        options: clientEnumerators.dataProcessed,
      },
    ),
    dateOnboarded: yupFormSchemas.date(
      i18n('entities.client.fields.dateOnboarded'),
      {},
    ),
    dateOffboarded: yupFormSchemas.date(
      i18n('entities.client.fields.dateOffboarded'),
      {},
    ),
    tags: yupFormSchemas.relationToMany(
      i18n('entities.client.fields.tags'),
      {},
    ),
  }),
  yup.object().shape({
    users: yupFormSchemas.relationToMany(
      i18n('entities.client.fields.users'),
      {
        required: true,
        min: 1,
      },
    ),
    infoSecEmail: yupFormSchemas.email(
      i18n('entities.client.fields.infoSecEmail'),
      {
        min: 1,
        max: 100,
      },
    ),
    infoSecPhoneNumber: yupFormSchemas.string(
      i18n('entities.client.fields.infoSecPhoneNumber'),
      {
        min: 1,
        max: 50,
      },
    ),
    address: yupFormSchemas.string(
      i18n('entities.client.fields.address'),
      {
        min: 1,
        max: 500,
      },
    ),
    website: yupFormSchemas.string(
      i18n('entities.client.fields.website'),
      {
        min: 1,
        max: 100,
      },
    ),
  }),
  yup.object().shape({
    location: yupFormSchemas.enumerator(
      i18n('entities.client.fields.location'),
      {
        required: true,
        options: clientEnumerators.location,
      },
    ),
    contract: yupFormSchemas.files(
      i18n('entities.client.fields.contract'),
      {},
    ),
  }),
  yup.object().shape({
    documentation: yupFormSchemas.files(
      i18n('entities.client.fields.documentation'),
      {},
    ),
    gdprRopa: yupFormSchemas.enumerator(
      i18n('entities.client.fields.gdprRopa'),
      {
        required: true,
        options: clientEnumerators.gdprRopa,
      },
    ),
  }),
  yup.object().shape({
    risks: yupFormSchemas.relationToMany(
      i18n('entities.client.fields.risks'),
      {},
    ),
  }),
  yup.object().shape({
    tasks: yupFormSchemas.relationToMany(
      i18n('entities.client.fields.tasks'),
      {},
    ),
  }),
];

export default validations;

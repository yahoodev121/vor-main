import { i18n } from 'src/i18n';
import * as yup from 'yup';
import policyEnumerators from 'src/modules/policy/policyEnumerators';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';

const common = {
  name: yupFormSchemas.string(
    i18n('entities.policy.fields.name'),
    {
      required: true,
      min: 1,
      max: 100,
    },
  ),
  type: yupFormSchemas.enumerator(
    i18n('entities.policy.fields.type'),
    {
      required: true,
      options: policyEnumerators.type,
    },
  ),
  description: yupFormSchemas.string(
    i18n('entities.policy.fields.description'),
    {
      max: 2500,
    },
  ),
  notes: yupFormSchemas.relationToMany(
    i18n('entities.policy.fields.notes'),
    {
      max: 50,
    },
  ),
  tags: yupFormSchemas.relationToMany(
    i18n('entities.policy.fields.tags'),
    {},
  ),
};

const schema = [
  yup.object().shape({
    ...common,
    attachment: yupFormSchemas.files(
      i18n('entities.policy.fields.attachment'),
      {
        required: true,
        max: 1,
      },
    ),
  }),
  yup.object().shape({
    ...common,
    link: yupFormSchemas.string(
      i18n('entities.policy.fields.link'),
      {
        required: true,
        min: 1,
        max: 500,
      },
    ),
  }),
];

export default schema;

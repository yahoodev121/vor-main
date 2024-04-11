import schemas from 'src/modules/shared/yup/yupImporterSchemas';
import { i18n } from 'src/i18n';
import userGroupEnumerators from 'src/modules/userGroup/userGroupEnumerators';

export default [
  {
    name: 'name',
    label: i18n('entities.userGroup.fields.name'),
    schema: schemas.string(
      i18n('entities.userGroup.fields.name'),
      {
        required: true,
        min: 1,
        max: 200,
      },
    ),
  },
  {
    name: 'description',
    label: i18n('entities.userGroup.fields.description'),
    schema: schemas.string(
      i18n('entities.userGroup.fields.description'),
      {
        max: 250,
      },
    ),
  },
  {
    name: 'type',
    label: i18n('entities.userGroup.fields.type'),
    schema: schemas.enumerator(
      i18n('entities.userGroup.fields.type'),
      {
        required: true,
        options: userGroupEnumerators.type,
      },
    ),
  },
  {
    name: 'users',
    label: i18n('entities.userGroup.fields.users'),
    schema: schemas.relationToMany(
      i18n('entities.userGroup.fields.users'),
      {
        required: true,
      },
    ),
  },
];

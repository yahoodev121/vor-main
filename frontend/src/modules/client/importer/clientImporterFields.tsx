import { DEFAULT_MOMENT_FORMAT_DATE_ONLY } from 'src/config/common';
import { i18n } from 'src/i18n';
import clientEnumerators from 'src/modules/client/clientEnumerators';
import ClientRatingViewItem from 'src/view/client/view/ClientRatingViewItem';
import ClientStatusViewItem from 'src/view/client/view/ClientStatusViewItem';
import ColorBadge from 'src/view/shared/components/ColorBadge';
import MDBadgeDot from 'src/mui/components/MDBadgeDot';
import moment from 'moment';
import schemas from 'src/modules/shared/yup/yupImporterSchemas';
import TagViewItem from 'src/view/tag/view/TagViewItem';

export default [
  {
    name: 'name',
    label: i18n('entities.client.fields.name'),
    schema: schemas.string(
      i18n('entities.client.fields.name'),
      {
        required: true,
        min: 1,
        max: 250,
      },
    ),
  },
  {
    name: 'status',
    label: i18n('entities.client.fields.status'),
    schema: schemas.enumerator(
      i18n('entities.client.fields.status'),
      {
        required: true,
        options: clientEnumerators.status,
      },
    ),
    render: (value) => (
      <ClientStatusViewItem value={value} />
    ),
  },
  {
    name: 'rating',
    label: i18n('entities.client.fields.rating'),
    schema: schemas.enumerator(
      i18n('entities.client.fields.rating'),
      {
        required: true,
        options: clientEnumerators.rating,
      },
    ),
    render: (value) => (
      <ClientRatingViewItem value={value} />
    ),
  },
  {
    name: 'category',
    label: i18n('entities.client.fields.category'),
    schema: schemas.relationToOne(
      i18n('entities.client.fields.category'),
      {
        required: true,
      },
    ),
    render: (value) => <ColorBadge label={value} />,
  },
  {
    name: 'dataProcessed',
    label: i18n('entities.client.fields.dataProcessed'),
    schema: schemas.stringArray(
      i18n('entities.client.fields.dataProcessed'),
      {
        required: true,
        options: clientEnumerators.dataProcessed,
      },
    ),
    render: (value) =>
      (value || '')
        .split(/[ ]*,[ ]*/)
        .map((v) => (
          <MDBadgeDot
            key={v}
            width="max-content"
            badgeContent={
              v
                ? i18n(
                    `entities.client.enumerators.dataProcessed.${v}`,
                  )
                : null
            }
            variant="contained"
          />
        )),
  },
  {
    name: 'tags',
    label: i18n('entities.client.fields.tags'),
    schema: schemas.relationToMany(
      i18n('entities.client.fields.tags'),
      {},
    ),
    render: (value) => (
      <TagViewItem
        value={
          value
            ? value
                .split(/[ ]*,[ ]*/)
                .map((v) => ({ id: v, tag: v }))
            : null
        }
        hideNoViewItem
      />
    ),
  },

  {
    name: 'industry',
    label: i18n('entities.client.fields.industry'),
    schema: schemas.enumerator(
      i18n('entities.client.fields.industry'),
      {
        required: true,
        options: clientEnumerators.industry,
      },
    ),
  },
  {
    name: 'dateOnboarded',
    label: i18n('entities.client.fields.dateOnboarded'),
    schema: schemas.date(
      i18n('entities.client.fields.dateOnboarded'),
      {},
    ),
    render: (value) =>
      value && value instanceof Date
        ? moment(value).format(
            DEFAULT_MOMENT_FORMAT_DATE_ONLY,
          )
        : value,
  },
  {
    name: 'dateOffboarded',
    label: i18n('entities.client.fields.dateOffboarded'),
    schema: schemas.date(
      i18n('entities.client.fields.dateOffboarded'),
      {},
    ),
    render: (value) =>
      value && value instanceof Date
        ? moment(value).format(
            DEFAULT_MOMENT_FORMAT_DATE_ONLY,
          )
        : value,
  },
  {
    name: 'infoSecEmail',
    label: i18n('entities.client.fields.infoSecEmail'),
    schema: schemas.email(
      i18n('entities.client.fields.infoSecEmail'),
      {
        min: 1,
        max: 100,
      },
    ),
  },
  {
    name: 'infoSecPhoneNumber',
    label: i18n(
      'entities.client.fields.infoSecPhoneNumber',
    ),
    schema: schemas.string(
      i18n('entities.client.fields.infoSecPhoneNumber'),
      {
        min: 1,
        max: 50,
      },
    ),
  },
  {
    name: 'privacyEmail',
    label: i18n('entities.client.fields.privacyEmail'),
    schema: schemas.email(
      i18n('entities.client.fields.privacyEmail'),
      {
        min: 1,
        max: 100,
      },
    ),
  },
  {
    name: 'privacyPhoneNumber',
    label: i18n(
      'entities.client.fields.privacyPhoneNumber',
    ),
    schema: schemas.string(
      i18n('entities.client.fields.privacyPhoneNumber'),
      {
        min: 1,
        max: 50,
      },
    ),
  },
  {
    name: 'address',
    label: i18n('entities.client.fields.address'),
    schema: schemas.string(
      i18n('entities.client.fields.address'),
      {
        min: 1,
        max: 500,
      },
    ),
  },
  {
    name: 'website',
    label: i18n('entities.client.fields.website'),
    schema: schemas.string(
      i18n('entities.client.fields.website'),
      {
        min: 1,
        max: 100,
      },
    ),
  },
  {
    name: 'location',
    label: i18n('entities.client.fields.location'),
    schema: schemas.enumerator(
      i18n('entities.client.fields.location'),
      {
        required: true,
        options: clientEnumerators.location,
      },
    ),
  },
  {
    name: 'contract',
    label: i18n('entities.client.fields.contract'),
    schema: schemas.files(
      i18n('entities.client.fields.contract'),
      {},
    ),
  },
  {
    name: 'documentation',
    label: i18n('entities.client.fields.documentation'),
    schema: schemas.files(
      i18n('entities.client.fields.documentation'),
      {},
    ),
  },
  {
    name: 'gdprRopa',
    label: i18n('entities.client.fields.gdprRopa'),
    schema: schemas.enumerator(
      i18n('entities.client.fields.gdprRopa'),
      {
        required: true,
        options: clientEnumerators.gdprRopa,
      },
    ),
  },
  {
    name: 'risks',
    label: i18n('entities.client.fields.risks'),
    schema: schemas.relationToMany(
      i18n('entities.client.fields.risks'),
      {},
    ),
  },
  {
    name: 'tasks',
    label: i18n('entities.client.fields.tasks'),
    schema: schemas.relationToMany(
      i18n('entities.client.fields.tasks'),
      {},
    ),
  },
];

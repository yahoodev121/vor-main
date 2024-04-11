import { i18n } from 'src/i18n';
import schemas from 'src/modules/shared/yup/yupImporterSchemas';
import TagViewItem from 'src/view/tag/view/TagViewItem';

export default [
  {
    name: 'title',
    label: i18n('entities.highlight.fields.title'),
    schema: schemas.string(
      i18n('entities.highlight.fields.title'),
      {
        required: true,
        min: 1,
        max: 500,
      },
    ),
  },
  {
    name: 'source',
    label: i18n('entities.highlight.fields.source'),
    schema: schemas.string(
      i18n('entities.highlight.fields.source'),
      {
        required: true,
        min: 1,
        max: 1000,
      },
    ),
  },
  {
    name: 'description',
    label: i18n('entities.highlight.fields.description'),
    schema: schemas.string(
      i18n('entities.highlight.fields.description'),
      {
        required: true,
        min: 1,
        max: 2500,
      },
    ),
  },
  {
    name: 'tags',
    label: i18n('entities.highlight.fields.tags'),
    schema: schemas.relationToMany(
      i18n('entities.highlight.fields.tags'),
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
];

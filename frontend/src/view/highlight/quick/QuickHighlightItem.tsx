import { Card, Grid, IconButton } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import {
  forwardRef,
  useImperativeHandle,
  useState,
} from 'react';
import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import DeleteIcon from '@mui/icons-material/Delete';
import FormWrapper from 'src/view/shared/styles/FormWrapper';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import MDBox from 'src/mui/components/MDBox';
import PropTypes from 'prop-types';
import TagAutocompleteFormItem from 'src/view/tag/autocomplete/TagAutocompleteFormItem';
import TextAreaFormItem from 'src/view/shared/form/items/TextAreaFormItem';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';

const schema = yup.object().shape({
  title: yupFormSchemas.string(
    i18n('entities.highlight.fields.title'),
    {
      required: true,
      min: 1,
      max: 500,
    },
  ),
  description: yupFormSchemas.string(
    i18n('entities.highlight.fields.description'),
    {
      required: true,
      min: 1,
      max: 2500,
    },
  ),
  tags: yupFormSchemas.relationToMany(
    i18n('entities.highlight.fields.tags'),
    {},
  ),
});

const QuickHighlightItem = forwardRef((props: any, ref) => {
  const { index, value, onClick, onDelete } = props;

  const { sidenavColor } = selectMuiSettings();

  const [initialValues] = useState(() => {
    return {
      title: value.title,
      description: value.description,
      tags: value.tags || [],
    };
  });

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    defaultValues: initialValues as any,
  });

  const onSubmit = (values) => {};

  useImperativeHandle(ref, () => ({
    getValues: async () => {
      await form.handleSubmit(onSubmit)();
      const valid = await form.trigger();
      return (
        valid && {
          id: value.id,
          annotations: value.annotations,
          ...schema.cast(form.getValues()),
        }
      );
    },
  }));

  const doDelete = (evt) => {
    evt.stopPropagation();
    onDelete && onDelete(index);
  };

  const doClick = () => {
    onClick && onClick(value.annotations);
  };

  return (
    <Card onClick={doClick}>
      <MDBox p={1.6}>
        <FormWrapper>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Grid spacing={1.6} container>
                <Grid xs={12} item>
                  <MDBox display="flex" gap={0.8}>
                    <MDBox flexGrow={1}>
                      <InputFormItem
                        name="title"
                        label={i18n(
                          'entities.highlight.fields.title',
                        )}
                        required={true}
                        variant="standard"
                      />
                    </MDBox>
                    <MDBox flexShrink={0}>
                      <IconButton
                        color={sidenavColor}
                        onClick={doDelete}
                        size="small"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </MDBox>
                  </MDBox>
                </Grid>
                <Grid xs={12} item>
                  <TextAreaFormItem
                    name="description"
                    label={i18n(
                      'entities.highlight.fields.description',
                    )}
                    required={true}
                    variant="standard"
                  />
                </Grid>
                <Grid xs={12} item>
                  <TagAutocompleteFormItem
                    name="tags"
                    label={i18n(
                      'entities.highlight.fields.tags',
                    )}
                  />
                </Grid>
              </Grid>
            </form>
          </FormProvider>
        </FormWrapper>
      </MDBox>
    </Card>
  );
});

QuickHighlightItem.propTypes = {
  index: PropTypes.number.isRequired,
  onClick: PropTypes.func,
  onDelete: PropTypes.func,
  value: PropTypes.any.isRequired,
};

export default QuickHighlightItem;

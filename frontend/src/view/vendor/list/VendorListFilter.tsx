import {
  AccordionDetails,
  AccordionSummary,
  Grid,
} from '@mui/material';
import {
  FormProvider,
  useForm,
  useFormContext,
} from 'react-hook-form';
import { i18n } from 'src/i18n';
import {
  renameAllKeysWithPrefix,
  renameAllKeysWithoutPrefix,
} from 'src/modules/utils';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import actions from 'src/modules/vendor/list/vendorListActions';
import ColorBadgeSelectFormItem, {
  generateColorBadgeSelectOptions,
} from 'src/view/shared/form/items/ColorBadgeSelectFormItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FilterAccordion from 'src/view/shared/filter/FilterAccordion';
import FilterPreview from 'src/view/shared/filter/FilterPreview';
import filterRenders from 'src/modules/shared/filter/filterRenders';
import FilterWrapper, {
  FilterButtons,
} from 'src/view/shared/styles/FilterWrapper';
import formActions from 'src/modules/form/formActions';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import InputNumberRangeFormItem from 'src/view/shared/form/items/InputNumberRangeFormItem';
import MDButton from 'src/mui/components/MDButton';
import SearchIcon from '@mui/icons-material/Search';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';
import selectors from 'src/modules/vendor/list/vendorListSelectors';
import TagAutocompleteFormItem from 'src/view/tag/autocomplete/TagAutocompleteFormItem';
import UndoIcon from '@mui/icons-material/Undo';
import VendorCategoryAutocompleteFormItem from 'src/view/vendorCategory/autocomplete/VendorCategoryAutocompleteFormItem';
import vendorEnumerators from 'src/modules/vendor/vendorEnumerators';
import yupFilterSchemas from 'src/modules/shared/yup/yupFilterSchemas';

const schema = yup.object().shape({
  referenceRange: yupFilterSchemas.integerRange(
    i18n('entities.vendor.fields.referenceRange'),
  ),
  name: yupFilterSchemas.string(
    i18n('entities.vendor.fields.name'),
  ),
  status: yupFilterSchemas.enumerator(
    i18n('entities.vendor.fields.status'),
  ),
  category: yupFilterSchemas.relationToOne(
    i18n('entities.vendor.fields.category'),
  ),
  rating: yupFilterSchemas.enumerator(
    i18n('entities.vendor.fields.rating'),
  ),
  countryOfIncorporation: yupFilterSchemas.enumerator(
    i18n('entities.vendor.fields.countryOfIncorporation'),
  ),
  dataProcessed: yupFilterSchemas.stringArray(
    i18n('entities.vendor.fields.dataProcessed'),
  ),
  industry: yupFilterSchemas.enumerator(
    i18n('entities.vendor.fields.industry'),
  ),
  internalBusinessSponsor: yupFilterSchemas.string(
    i18n('entities.vendor.fields.internalBusinessSponsor'),
  ),
  website: yupFilterSchemas.string(
    i18n('entities.vendor.fields.website'),
  ),
  tags: yupFilterSchemas.relationToMany(
    i18n('entities.vendor.fields.tags'),
  ),
});

const emptyValues = {
  referenceRange: [],
  name: '',
  status: '',
  category: '',
  rating: '',
  countryOfIncorporation: '',
  dataProcessed: [],
  industry: '',
  internalBusinessSponsor: '',
  website: '',
  tags: [],
};

const previewRenders = {
  referenceRange: {
    label: i18n('entities.vendor.fields.referenceRange'),
    render: filterRenders.range(),
  },
  name: {
    label: i18n('entities.vendor.fields.name'),
    render: filterRenders.generic(),
  },
  status: {
    label: i18n('entities.vendor.fields.status'),
    render: filterRenders.enumerator(
      'entities.vendor.enumerators.status',
    ),
  },
  category: {
    label: i18n('entities.vendor.fields.category'),
    render: filterRenders.relationToOne(),
  },
  rating: {
    label: i18n('entities.vendor.fields.rating'),
    render: filterRenders.enumerator(
      'entities.vendor.enumerators.rating',
    ),
  },
  countryOfIncorporation: {
    label: i18n(
      'entities.vendor.fields.countryOfIncorporation',
    ),
    render: filterRenders.enumerator(
      'entities.vendor.enumerators.countryOfIncorporation',
    ),
  },
  dataProcessed: {
    label: i18n('entities.vendor.fields.dataProcessed'),
    render: filterRenders.enumeratorMultiple(
      'entities.vendor.enumerators.dataProcessed',
    ),
  },
  industry: {
    label: i18n('entities.vendor.fields.industry'),
    render: filterRenders.enumerator(
      'entities.vendor.enumerators.industry',
    ),
  },
  internalBusinessSponsor: {
    label: i18n(
      'entities.vendor.fields.internalBusinessSponsor',
    ),
    render: filterRenders.generic(),
  },
  website: {
    label: i18n('entities.vendor.fields.website'),
    render: filterRenders.generic(),
  },
  tags: {
    label: i18n('entities.vendor.fields.tags'),
    render: filterRenders.relationToMany('tag'),
  },
};

function VendorListFilter(props) {
  const withoutFormWrapper = props.withoutFormWrapper;
  const filterNamePrefix = props.prefix ?? '';
  const filterKeys = Object.keys(emptyValues);

  const { getValues, setValue } = useFormContext() ?? {};
  const { sidenavColor } = selectMuiSettings();
  const rawFilter = useSelector(selectors.selectRawFilter);
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);

  const [initialValues] = useState(() => {
    return {
      ...emptyValues,
      ...rawFilter,
    };
  });

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: renameAllKeysWithPrefix(
      initialValues,
      filterNamePrefix,
      filterKeys,
    ),
    mode: 'onSubmit',
  });

  useEffect(() => {
    dispatch(
      actions.doFetch(
        schema.cast(initialValues),
        initialValues,
      ),
    );
    // eslint-disable-next-line
  }, [dispatch]);

  const onSubmit = (values) => {
    const rawValues = form.getValues();
    const replacedValues = renameAllKeysWithoutPrefix(
      values,
      filterNamePrefix,
      filterKeys,
    );
    dispatch(
      actions.doFetch(
        withoutFormWrapper
          ? schema.cast(replacedValues)
          : replacedValues,
        withoutFormWrapper ? replacedValues : rawValues,
        false,
      ),
    );
    setExpanded(false);
    dispatch(formActions.doRefresh());
  };

  const fnSetValue = withoutFormWrapper
    ? setValue
    : form.setValue;

  const onReset = () => {
    Object.keys(emptyValues).forEach((key) => {
      fnSetValue(
        `${filterNamePrefix}${key}`,
        emptyValues[key],
      );
    });
    dispatch(actions.doReset());
    setExpanded(false);
    dispatch(formActions.doRefresh());
  };

  const onRemove = (key) => {
    fnSetValue(
      `${filterNamePrefix}${key}`,
      emptyValues[key],
    );
    dispatch(formActions.doRefresh());
    return withoutFormWrapper
      ? onSubmit(getValues())
      : form.handleSubmit(onSubmit)();
  };

  const FilterContent = () => (
    <>
      <Grid container spacing={1.6}>
        <Grid item md={6} xs={12}>
          <InputNumberRangeFormItem
            name={`${filterNamePrefix}referenceRange`}
            label={i18n(
              'entities.vendor.fields.referenceRange',
            )}
            variant="standard"
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <InputFormItem
            name={`${filterNamePrefix}name`}
            label={i18n('entities.vendor.fields.name')}
            variant="standard"
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <ColorBadgeSelectFormItem
            name={`${filterNamePrefix}status`}
            label={i18n('entities.vendor.fields.status')}
            options={generateColorBadgeSelectOptions(
              vendorEnumerators.status,
              vendorEnumerators.statusColor,
              'entities.vendor.enumerators.status',
            )}
            variant="standard"
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <VendorCategoryAutocompleteFormItem
            name={`${filterNamePrefix}category`}
            label={i18n('entities.vendor.fields.category')}
            variant="standard"
            fullWidth
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <ColorBadgeSelectFormItem
            name={`${filterNamePrefix}rating`}
            label={i18n('entities.vendor.fields.rating')}
            options={generateColorBadgeSelectOptions(
              vendorEnumerators.rating,
              vendorEnumerators.ratingColor,
              'entities.vendor.enumerators.rating',
            )}
            variant="standard"
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <SelectFormItem
            name={`${filterNamePrefix}countryOfIncorporation`}
            label={i18n(
              'entities.vendor.fields.countryOfIncorporation',
            )}
            options={vendorEnumerators.countryOfIncorporation.map(
              (value) => ({
                value,
                label: i18n(
                  `entities.vendor.enumerators.countryOfIncorporation.${value}`,
                ),
              }),
            )}
            variant="standard"
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <SelectFormItem
            name={`${filterNamePrefix}dataProcessed`}
            label={i18n(
              'entities.vendor.fields.dataProcessed',
            )}
            options={vendorEnumerators.dataProcessed.map(
              (value) => ({
                value,
                label: i18n(
                  `entities.vendor.enumerators.dataProcessed.${value}`,
                ),
              }),
            )}
            variant="standard"
            mode="multiple"
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <SelectFormItem
            name={`${filterNamePrefix}industry`}
            label={i18n('entities.vendor.fields.industry')}
            options={vendorEnumerators.industry.map(
              (value) => ({
                value,
                label: i18n(
                  `entities.vendor.enumerators.industry.${value}`,
                ),
              }),
            )}
            variant="standard"
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <InputFormItem
            name={`${filterNamePrefix}internalBusinessSponsor`}
            label={i18n(
              'entities.vendor.fields.internalBusinessSponsor',
            )}
            variant="standard"
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <InputFormItem
            name={`${filterNamePrefix}website`}
            label={i18n('entities.vendor.fields.website')}
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TagAutocompleteFormItem
            name={`${filterNamePrefix}tags`}
            label={i18n('entities.vendor.fields.tags')}
          />
        </Grid>
      </Grid>

      <FilterButtons>
        <MDButton
          variant="gradient"
          color={sidenavColor}
          onClick={() =>
            withoutFormWrapper
              ? onSubmit(getValues())
              : form.handleSubmit(onSubmit)
          }
          type={withoutFormWrapper ? 'button' : 'submit'}
          disabled={props.loading}
          startIcon={<SearchIcon />}
          size="small"
        >
          {i18n('common.search')}
        </MDButton>

        <MDButton
          variant="outlined"
          color={sidenavColor}
          type="button"
          onClick={onReset}
          disabled={props.loading}
          startIcon={<UndoIcon />}
          size="small"
        >
          {i18n('common.reset')}
        </MDButton>
      </FilterButtons>
    </>
  );

  const FilterFormWrapper = ({ children }) => (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  );

  return (
    <FilterWrapper>
      <FilterAccordion
        expanded={expanded}
        onChange={(event, isExpanded) =>
          setExpanded(isExpanded)
        }
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon color="secondary" />}
        >
          <FilterPreview
            values={rawFilter}
            renders={previewRenders}
            expanded={expanded}
            onRemove={onRemove}
          />
        </AccordionSummary>
        <AccordionDetails>
          {withoutFormWrapper ? (
            <FilterContent />
          ) : (
            <FilterFormWrapper>
              <FilterContent />
            </FilterFormWrapper>
          )}
        </AccordionDetails>
      </FilterAccordion>
    </FilterWrapper>
  );
}

export default VendorListFilter;

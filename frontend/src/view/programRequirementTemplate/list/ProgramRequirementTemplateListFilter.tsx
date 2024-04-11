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
import actions from 'src/modules/programRequirementTemplate/list/programRequirementTemplateListActions';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FilterAccordion from 'src/view/shared/filter/FilterAccordion';
import FilterPreview from 'src/view/shared/filter/FilterPreview';
import filterRenders from 'src/modules/shared/filter/filterRenders';
import FilterWrapper, {
  FilterButtons,
} from 'src/view/shared/styles/FilterWrapper';
import formActions from 'src/modules/form/formActions';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import MDButton from 'src/mui/components/MDButton';
import QueryString from 'qs';
import SearchIcon from '@mui/icons-material/Search';
import selectors from 'src/modules/programRequirementTemplate/list/programRequirementTemplateListSelectors';
import UndoIcon from '@mui/icons-material/Undo';
import yupFilterSchemas from 'src/modules/shared/yup/yupFilterSchemas';

const schema = yup.object().shape({
  name: yupFilterSchemas.string(
    i18n('entities.programRequirementTemplate.fields.name'),
  ),
  description: yupFilterSchemas.string(
    i18n(
      'entities.programRequirementTemplate.fields.description',
    ),
  ),
  requirementID: yupFilterSchemas.string(
    i18n(
      'entities.programRequirementTemplate.fields.requirementID',
    ),
  ),
});

const emptyValues = {
  name: '',
  description: '',
  requirementID: '',
};

const previewRenders = {
  name: {
    label: i18n(
      'entities.programRequirementTemplate.fields.name',
    ),
    render: filterRenders.generic(),
  },
  description: {
    label: i18n(
      'entities.programRequirementTemplate.fields.description',
    ),
    render: filterRenders.generic(),
  },
  requirementID: {
    label: i18n(
      'entities.programRequirementTemplate.fields.requirementID',
    ),
    render: filterRenders.generic(),
  },
};

function ProgramRequirementTemplateListFilter(props) {
  const withoutFormWrapper = props.withoutFormWrapper;
  const filterNamePrefix = props.prefix ?? '';
  const filterKeys = Object.keys(emptyValues);

  const { getValues, setValue } = useFormContext() ?? {};
  const { sidenavColor } = selectMuiSettings();
  const { loading, additionalFilters } = props;
  const rawFilter = useSelector(selectors.selectRawFilter);
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);

  const [initialValues] = useState(() => {
    const initialValues = {
      ...emptyValues,
      ...rawFilter,
      ...additionalFilters,
    };

    const queryFilters = QueryString.parse(
      location.search,
      {
        ignoreQueryPrefix: true,
        allowDots: true,
      },
    );

    for (const key of Object.keys(queryFilters)) {
      initialValues[key] =
        queryFilters[key] || initialValues[key];
    }

    return initialValues;
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
      { ...values, ...additionalFilters },
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
    dispatch(actions.doReset(additionalFilters));
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
        <Grid item lg={6} xs={12}>
          <InputFormItem
            name={`${filterNamePrefix}requirementID`}
            label={i18n(
              'entities.programRequirementTemplate.fields.requirementID',
            )}
            variant="standard"
          />
        </Grid>
        <Grid item lg={6} xs={12}>
          <InputFormItem
            name={`${filterNamePrefix}name`}
            label={i18n(
              'entities.programRequirementTemplate.fields.name',
            )}
            variant="standard"
          />
        </Grid>
        <Grid item lg={6} xs={12}>
          <InputFormItem
            name={`${filterNamePrefix}description`}
            label={i18n(
              'entities.programRequirementTemplate.fields.description',
            )}
            variant="standard"
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
          disabled={loading}
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
          disabled={loading}
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

export default ProgramRequirementTemplateListFilter;

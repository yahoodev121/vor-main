import {
  AccordionDetails,
  AccordionSummary,
  Grid,
} from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import actions from 'src/modules/qaLibrary/list/qaLibraryListActions';
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
import SearchIcon from '@mui/icons-material/Search';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';
import selectors from 'src/modules/qaLibrary/list/qaLibraryListSelectors';
import UndoIcon from '@mui/icons-material/Undo';
import yupFilterSchemas from 'src/modules/shared/yup/yupFilterSchemas';
import SwitchFormItem from 'src/view/shared/form/items/SwitchFormItem';
import DatePickerRangeFormItem from 'src/view/shared/form/items/DatePickerRangeFormItem';

const schema = yup.object().shape({
  question: yupFilterSchemas.string(
    i18n('entities.qaLibrary.fields.question'),
  ),
  answer: yupFilterSchemas.string(
    i18n('entities.qaLibrary.fields.answer'),
  ),
  aiKnowledgebase: yupFilterSchemas.boolean(
    i18n('entities.qaLibrary.fields.aiKnowledgebase'),
  ),
  expirationDate: yupFilterSchemas.datetimeRange(
    i18n('entities.qaLibrary.fields.expirationDate'),
  ),
});

const emptyValues = {
  question: '',
  answer: '',
  aiKnowledgebase: null,
  expirationDate: null,
};

const previewRenders = {
  question: {
    label: i18n('entities.qaLibrary.fields.question'),
    render: filterRenders.generic(),
  },
  answer: {
    label: i18n('entities.qaLibrary.fields.answer'),
    render: filterRenders.generic(),
  },
  aiKnowledgebase: {
    label: i18n('entities.qaLibrary.fields.aiKnowledgebase'),
    render: filterRenders.generic(),
  },
  expirationDate: {
    label: i18n('entities.qaLibrary.fields.expirationDate'),
    render: filterRenders.generic(),
  },
};

function QALibraryListFilter(props) {
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
    defaultValues: initialValues,
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
    dispatch(actions.doFetch(values, rawValues, false));
    setExpanded(false);
    dispatch(formActions.doRefresh());
  };

  const onReset = () => {
    Object.keys(emptyValues).forEach((key) => {
      form.setValue(key, emptyValues[key]);
    });
    dispatch(actions.doReset());
    setExpanded(false);
    dispatch(formActions.doRefresh());
  };

  const onRemove = (key) => {
    form.setValue(key, emptyValues[key]);
    dispatch(formActions.doRefresh());
    return form.handleSubmit(onSubmit)();
  };

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
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Grid container spacing={1.6}>
                <Grid item lg={6} xs={12}>
                  <InputFormItem
                    name="question"
                    label={i18n(
                      'entities.qaLibrary.fields.question',
                    )}
                    variant="standard"
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <InputFormItem
                    name="answer"
                    label={i18n(
                      'entities.qaLibrary.fields.answer',
                    )}
                    variant="standard"
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <SelectFormItem
                    name="aiKnowledgebase"
                    label={i18n('entities.qaLibrary.fields.aiKnowledgebase')}
                    options={[{value: null, label: ''}, {value: true, label: 'True'}, {value: false, label: 'False'}]}
                    variant="standard"
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <DatePickerRangeFormItem
                    name="expirationDate"
                    label={i18n(
                      'entities.qaLibrary.fields.expirationDate',
                    )}
                    variant="standard"
                    showTime
                  />
                </Grid>
              </Grid>

              <FilterButtons>
                <MDButton
                  variant="gradient"
                  color={sidenavColor}
                  type="submit"
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
            </form>
          </FormProvider>
        </AccordionDetails>
      </FilterAccordion>
    </FilterWrapper>
  );
}

export default QALibraryListFilter;

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
import { useLocation } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import actions from 'src/modules/auditLog/auditLogActions';
import DatePickerRangeFormItem from 'src/view/shared/form/items/DatePickerRangeFormItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FilterAccordion from 'src/view/shared/filter/FilterAccordion';
import FilterPreview from 'src/view/shared/filter/FilterPreview';
import filterRenders from 'src/modules/shared/filter/filterRenders';
import FilterWrapper, {
  FilterButtons,
} from 'src/view/shared/styles/FilterWrapper';
import formActions from 'src/modules/form/formActions';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import MDBox from 'src/mui/components/MDBox';
import MDButton from 'src/mui/components/MDButton';
import queryString from 'query-string';
import SearchIcon from '@mui/icons-material/Search';
import selectors from 'src/modules/auditLog/auditLogSelectors';
import TagsFormItem from 'src/view/shared/form/items/TagsFormItem';
import UndoIcon from '@mui/icons-material/Undo';
import yupFilterSchemas from 'src/modules/shared/yup/yupFilterSchemas';

const schema = yup.object().shape({
  timestampRange: yupFilterSchemas.datetimeRange(
    i18n('auditLog.fields.timestampRange'),
  ),
  entityNames: yupFilterSchemas.stringArray(
    i18n('auditLog.fields.entityNames'),
  ),
  entityId: yupFilterSchemas.string(
    i18n('auditLog.fields.entityId'),
  ),
  action: yupFilterSchemas.string(
    i18n('auditLog.fields.action'),
  ),
  createdByEmail: yupFilterSchemas.email(
    i18n('auditLog.fields.createdByEmail'),
  ),
});

const previewRenders = {
  timestampRange: {
    label: i18n('auditLog.fields.timestampRange'),
    render: filterRenders.datetimeRange(),
  },
  entityNames: {
    label: i18n('auditLog.fields.entityNames'),
    render: filterRenders.stringArray(),
  },
  entityId: {
    label: i18n('auditLog.fields.entityId'),
    render: filterRenders.generic(),
  },
  action: {
    label: i18n('auditLog.fields.action'),
    render: filterRenders.generic(),
  },
  createdByEmail: {
    label: i18n('auditLog.fields.createdByEmail'),
    render: filterRenders.generic(),
  },
};

const emptyValues = {
  timestampRange: [],
  entityNames: [],
  entityId: '',
  action: '',
  createdByEmail: '',
};

function AuditLogFilter(props) {
  const { sidenavColor } = selectMuiSettings();
  const rawFilter = useSelector(selectors.selectRawFilter);
  const dispatch = useDispatch();
  const location = useLocation();
  const [expanded, setExpanded] = useState(false);

  const [initialValues] = useState(() => {
    const initialValues = {
      ...emptyValues,
      ...rawFilter,
    };

    const queryFilters = queryString.parse(location.search);

    initialValues.entityNames =
      queryFilters.entityNames || initialValues.entityNames;
    if (
      initialValues.entityNames &&
      !Array.isArray(initialValues.entityNames)
    ) {
      initialValues.entityNames = [
        initialValues.entityNames,
      ];
    }

    initialValues.entityId =
      queryFilters.entityId || initialValues.entityId;

    initialValues.createdByEmail =
      queryFilters.createdByEmail ||
      initialValues.createdByEmail;

    return initialValues;
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

  const { loading } = props;

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
          style={{
            margin: '0 !important',
          }}
        >
          <FilterPreview
            renders={previewRenders}
            values={rawFilter}
            expanded={expanded}
            onRemove={onRemove}
          />
        </AccordionSummary>
        <AccordionDetails>
          <FormProvider {...form}>
            <MDBox
              component="form"
              role="form"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <Grid container spacing={1.6}>
                <Grid item lg={6} xs={12}>
                  <DatePickerRangeFormItem
                    name="timestampRange"
                    label={i18n(
                      'auditLog.fields.timestampRange',
                    )}
                    variant="standard"
                    showTime
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <InputFormItem
                    name="createdByEmail"
                    label={i18n(
                      'auditLog.fields.createdByEmail',
                    )}
                    variant="standard"
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <InputFormItem
                    name="entityId"
                    label={i18n('auditLog.fields.entityId')}
                    variant="standard"
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <InputFormItem
                    name="action"
                    label={i18n('auditLog.fields.action')}
                    variant="standard"
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <TagsFormItem
                    name="entityNames"
                    label={i18n(
                      'auditLog.fields.entityNames',
                    )}
                    notFoundContent={i18n(
                      'auditLog.entityNamesHint',
                    )}
                    variant="standard"
                  />
                </Grid>
              </Grid>

              <FilterButtons>
                <MDButton
                  size="small"
                  variant="gradient"
                  color={sidenavColor}
                  type="submit"
                  disabled={loading}
                  startIcon={<SearchIcon />}
                >
                  {i18n('common.search')}
                </MDButton>

                <MDButton
                  size="small"
                  variant="outlined"
                  color={sidenavColor}
                  type="button"
                  onClick={onReset}
                  disabled={loading}
                  startIcon={<UndoIcon />}
                >
                  {i18n('common.reset')}
                </MDButton>
              </FilterButtons>
            </MDBox>
          </FormProvider>
        </AccordionDetails>
      </FilterAccordion>
    </FilterWrapper>
  );
}

export default AuditLogFilter;

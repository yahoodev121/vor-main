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
import actions from 'src/modules/campaign/list/campaignListActions';
import campaignEnumerators from 'src/modules/campaign/campaignEnumerators';
import ColorBadgeSelectFormItem, {
  generateColorBadgeSelectOptions,
} from 'src/view/shared/form/items/ColorBadgeSelectFormItem';
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
import InputNumberRangeFormItem from 'src/view/shared/form/items/InputNumberRangeFormItem';
import MDButton from 'src/mui/components/MDButton';
import SearchIcon from '@mui/icons-material/Search';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';
import selectors from 'src/modules/campaign/list/campaignListSelectors';
import UndoIcon from '@mui/icons-material/Undo';
import yupFilterSchemas from 'src/modules/shared/yup/yupFilterSchemas';

const schema = yup.object().shape({
  name: yupFilterSchemas.string(
    i18n('entities.campaign.fields.name'),
  ),
  description: yupFilterSchemas.string(
    i18n('entities.campaign.fields.description'),
  ),
  status: yupFilterSchemas.enumerator(
    i18n('entities.campaign.fields.status'),
  ),
  type: yupFilterSchemas.enumerator(
    i18n('entities.campaign.fields.type'),
  ),
  audience: yupFilterSchemas.enumerator(
    i18n('entities.campaign.fields.audience'),
  ),
  dueDateRange: yupFilterSchemas.datetimeRange(
    i18n('entities.campaign.fields.dueDateRange'),
  ),
  progressRange: yupFilterSchemas.integerRange(
    i18n('entities.campaign.fields.progressRange'),
  ),
  totalRecipientsRange: yupFilterSchemas.integerRange(
    i18n('entities.campaign.fields.totalRecipientsRange'),
  ),
});

const emptyValues = {
  name: '',
  description: '',
  status: '',
  type: '',
  audience: '',
  dueDateRange: [],
  progressRange: [],
  totalRecipientsRange: [],
};

const previewRenders = {
  name: {
    label: i18n('entities.campaign.fields.name'),
    render: filterRenders.generic(),
  },
  description: {
    label: i18n('entities.campaign.fields.description'),
    render: filterRenders.generic(),
  },
  status: {
    label: i18n('entities.campaign.fields.status'),
    render: filterRenders.enumerator(
      'entities.campaign.enumerators.status',
    ),
  },
  type: {
    label: i18n('entities.campaign.fields.type'),
    render: filterRenders.enumerator(
      'entities.campaign.enumerators.type',
    ),
  },
  audience: {
    label: i18n('entities.campaign.fields.audience'),
    render: filterRenders.enumerator(
      'entities.campaign.enumerators.audience',
    ),
  },
  dueDateRange: {
    label: i18n('entities.campaign.fields.dueDateRange'),
    render: filterRenders.datetimeRange(),
  },
  progressRange: {
    label: i18n('entities.campaign.fields.progressRange'),
    render: filterRenders.range(),
  },
  totalRecipientsRange: {
    label: i18n(
      'entities.campaign.fields.totalRecipientsRange',
    ),
    render: filterRenders.range(),
  },
};

function CampaignListFilter(props) {
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
                    name="name"
                    label={i18n(
                      'entities.campaign.fields.name',
                    )}
                    variant="standard"
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <InputFormItem
                    name="description"
                    label={i18n(
                      'entities.campaign.fields.description',
                    )}
                    variant="standard"
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <ColorBadgeSelectFormItem
                    name="status"
                    label={i18n(
                      'entities.task.fields.status',
                    )}
                    options={generateColorBadgeSelectOptions(
                      campaignEnumerators.status,
                      campaignEnumerators.statusColor,
                      'entities.campaign.enumerators.status',
                    )}
                    variant="standard"
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <SelectFormItem
                    name="type"
                    label={i18n(
                      'entities.campaign.fields.type',
                    )}
                    options={campaignEnumerators.type.map(
                      (value) => ({
                        value,
                        label: i18n(
                          `entities.campaign.enumerators.type.${value}`,
                        ),
                      }),
                    )}
                    variant="standard"
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <SelectFormItem
                    name="audience"
                    label={i18n(
                      'entities.campaign.fields.audience',
                    )}
                    options={campaignEnumerators.audience.map(
                      (value) => ({
                        value,
                        label: i18n(
                          `entities.campaign.enumerators.audience.${value}`,
                        ),
                      }),
                    )}
                    variant="standard"
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <DatePickerRangeFormItem
                    name="dueDateRange"
                    label={i18n(
                      'entities.campaign.fields.dueDateRange',
                    )}
                    variant="standard"
                    showTime
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <InputNumberRangeFormItem
                    name="progressRange"
                    label={i18n(
                      'entities.campaign.fields.progressRange',
                    )}
                    variant="standard"
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <InputNumberRangeFormItem
                    name="totalRecipientsRange"
                    label={i18n(
                      'entities.campaign.fields.totalRecipientsRange',
                    )}
                    variant="standard"
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

export default CampaignListFilter;

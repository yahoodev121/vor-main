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
import actions from 'src/modules/campaignInstance/list/campaignInstanceListActions';
import authSelectors from 'src/modules/auth/authSelectors';
import campaignInstanceEnumerators from 'src/modules/campaignInstance/campaignInstanceEnumerators';
import ClientAutocompleteFormItem from 'src/view/client/autocomplete/ClientAutocompleteFormItem';
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
import Roles from 'src/security/roles';
import SearchIcon from '@mui/icons-material/Search';
import selectors from 'src/modules/campaignInstance/list/campaignInstanceListSelectors';
import UndoIcon from '@mui/icons-material/Undo';
import UserAutocompleteFormItem from 'src/view/user/autocomplete/UserAutocompleteFormItem';
import VendorAutocompleteFormItem from 'src/view/vendor/autocomplete/VendorAutocompleteFormItem';
import yupFilterSchemas from 'src/modules/shared/yup/yupFilterSchemas';

const schema = yup.object().shape({
  referenceRange: yupFilterSchemas.integerRange(
    i18n('entities.campaignInstance.fields.referenceRange'),
  ),
  name: yupFilterSchemas.string(
    i18n('entities.campaignInstance.fields.name'),
  ),
  status: yupFilterSchemas.enumerator(
    i18n('entities.campaignInstance.fields.status'),
  ),
  progressRange: yupFilterSchemas.integerRange(
    i18n('entities.campaignInstance.fields.progressRange'),
  ),
  vendor: yupFilterSchemas.relationToOne(
    i18n('entities.campaignInstance.fields.vendor'),
  ),
  client: yupFilterSchemas.relationToOne(
    i18n('entities.campaignInstance.fields.client'),
  ),
  submittedDateRange: yupFilterSchemas.datetimeRange(
    i18n(
      'entities.campaignInstance.fields.submittedDateRange',
    ),
  ),
  submittedBy: yupFilterSchemas.relationToOne(
    i18n('entities.campaignInstance.fields.submittedBy'),
  ),
});

const emptyValues = {
  referenceRange: [],
  name: '',
  status: '',
  progressRange: [],
  vendor: '',
  client: '',
  submittedDateRange: [],
  submittedBy: '',
};

const previewRenders = {
  referenceRange: {
    label: i18n(
      'entities.campaignInstance.fields.referenceRange',
    ),
    render: filterRenders.range(),
  },
  name: {
    label: i18n('entities.campaignInstance.fields.name'),
    render: filterRenders.generic(),
  },
  status: {
    label: i18n('entities.campaignInstance.fields.status'),
    render: filterRenders.enumerator(
      'entities.campaignInstance.enumerators.status',
    ),
  },
  progressRange: {
    label: i18n(
      'entities.campaignInstance.fields.progressRange',
    ),
    render: filterRenders.range(),
  },
  vendor: {
    label: i18n('entities.campaignInstance.fields.vendor'),
    render: filterRenders.relationToOne(),
  },
  submittedDateRange: {
    label: i18n(
      'entities.campaignInstance.fields.submittedDateRange',
    ),
    render: filterRenders.datetimeRange(),
  },
  submittedBy: {
    label: i18n(
      'entities.campaignInstance.fields.submittedBy',
    ),
    render: filterRenders.relationToOne(),
  },
};

function CampaignInstanceListFilter(props) {
  const { sidenavColor } = selectMuiSettings();
  const currentRoles = useSelector(
    authSelectors.selectRoles,
  );
  const hasAdminRole = (currentRoles ?? []).includes(
    Roles.values.admin,
  );
  const rawFilter = useSelector(selectors.selectRawFilter);
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);

  const [initialValues] = useState(() => {
    return {
      ...emptyValues,
      ...rawFilter,
      ...props,
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
    dispatch(
      actions.doFetch(
        {
          ...values,
          ...props,
        },
        rawValues,
        false,
      ),
    );
    setExpanded(false);
    dispatch(formActions.doRefresh());
  };

  const onReset = () => {
    Object.keys(emptyValues).forEach((key) => {
      form.setValue(key, emptyValues[key]);
    });
    dispatch(actions.doReset(props));
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
                  <InputNumberRangeFormItem
                    name="referenceRange"
                    label={i18n(
                      'entities.campaignInstance.fields.referenceRange',
                    )}
                    variant="standard"
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <InputFormItem
                    name="name"
                    label={i18n(
                      'entities.campaignInstance.fields.name',
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
                      campaignInstanceEnumerators.status,
                      campaignInstanceEnumerators.statusColor,
                      'entities.campaign.enumerators.status',
                    )}
                    variant="standard"
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <InputNumberRangeFormItem
                    name="progressRange"
                    label={i18n(
                      'entities.campaignInstance.fields.progressRange',
                    )}
                    variant="standard"
                  />
                </Grid>
                {hasAdminRole && (
                  <>
                    <Grid item lg={6} xs={12}>
                      <VendorAutocompleteFormItem
                        name="vendor"
                        label={i18n(
                          'entities.campaignInstance.fields.vendor',
                        )}
                        variant="standard"
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <ClientAutocompleteFormItem
                        name="client"
                        label={i18n(
                          'entities.campaignInstance.fields.client',
                        )}
                        variant="standard"
                      />
                    </Grid>
                  </>
                )}
                <Grid item lg={6} xs={12}>
                  <DatePickerRangeFormItem
                    name="submittedDateRange"
                    label={i18n(
                      'entities.campaignInstance.fields.submittedDateRange',
                    )}
                    variant="standard"
                  />
                </Grid>
                {hasAdminRole && (
                  <Grid item lg={6} xs={12}>
                    <UserAutocompleteFormItem
                      name="submittedBy"
                      label={i18n(
                        'entities.campaignInstance.fields.submittedBy',
                      )}
                      variant="standard"
                    />
                  </Grid>
                )}
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

CampaignInstanceListFilter.defaultProps = {
  contains: false,
  ownerCampaign: null,
  ownerClient: null,
  ownerVendor: null,
};

export default CampaignInstanceListFilter;

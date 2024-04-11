import { Card, Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useDispatch } from 'react-redux';
import { useForm, FormProvider } from 'react-hook-form';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CheckboxFormItem from 'src/view/shared/form/items/CheckboxFormItem';
import CloseIcon from '@mui/icons-material/Close';
import ColorBadgeSelectFormItem, {
  generateColorBadgeSelectOptions,
} from 'src/view/shared/form/items/ColorBadgeSelectFormItem';
import FilesFormItem from 'src/view/shared/form/items/FilesFormItem';
import formActions from 'src/modules/form/formActions';
import FormWrapper, {
  FormButtons,
} from 'src/view/shared/styles/FormWrapper';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import LogoFormItem from 'src/view/shared/form/items/LogoFormItem';
import MDBox from 'src/mui/components/MDBox';
import MDButton from 'src/mui/components/MDButton';
import MDTypography from 'src/mui/components/MDTypography';
import RiskAutocompleteFormItem from 'src/view/risk/autocomplete/RiskAutocompleteFormItem';
import Roles from 'src/security/roles';
import SaveIcon from '@mui/icons-material/Save';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';
import Storage from 'src/security/storage';
import TagAutocompleteFormItem from 'src/view/tag/autocomplete/TagAutocompleteFormItem';
import TaskAutocompleteFormItem from 'src/view/task/autocomplete/TaskAutocompleteFormItem';
import TextAreaFormItem from 'src/view/shared/form/items/TextAreaFormItem';
import UndoIcon from '@mui/icons-material/Undo';
import UserAutocompleteFormItem from 'src/view/user/autocomplete/UserAutocompleteFormItem';
import VendorCategoryAutocompleteFormItem from 'src/view/vendorCategory/autocomplete/VendorCategoryAutocompleteFormItem';
import vendorEnumerators from 'src/modules/vendor/vendorEnumerators';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';

const schema = yup.object().shape({
  name: yupFormSchemas.string(
    i18n('entities.vendor.fields.name'),
    {
      required: true,
      min: 1,
      max: 250,
    },
  ),
  status: yupFormSchemas.enumerator(
    i18n('entities.vendor.fields.status'),
    {
      required: true,
      options: vendorEnumerators.status,
    },
  ),
  category: yupFormSchemas.relationToOne(
    i18n('entities.vendor.fields.category'),
    {
      required: true,
    },
  ),
  rating: yupFormSchemas.enumerator(
    i18n('entities.vendor.fields.rating'),
    {
      required: true,
      options: vendorEnumerators.rating,
    },
  ),
  users: yupFormSchemas.relationToMany(
    i18n('entities.vendor.fields.users'),
    {
      required: true,
      min: 1,
    },
  ),
  countryOfIncorporation: yupFormSchemas.enumerator(
    i18n('entities.vendor.fields.countryOfIncorporation'),
    {
      required: true,
      options: vendorEnumerators.countryOfIncorporation,
    },
  ),
  dataProcessed: yupFormSchemas.stringArray(
    i18n('entities.vendor.fields.dataProcessed'),
    {
      required: true,
      options: vendorEnumerators.dataProcessed,
    },
  ),
  industry: yupFormSchemas.enumerator(
    i18n('entities.vendor.fields.industry'),
    {
      required: true,
      options: vendorEnumerators.industry,
    },
  ),
  supportEmail: yupFormSchemas.email(
    i18n('entities.vendor.fields.supportEmail'),
    {
      max: 100,
      min: 1,
    },
  ),
  supportPhoneNumber: yupFormSchemas.string(
    i18n('entities.vendor.fields.supportPhoneNumber'),
    {
      max: 50,
      min: 1,
    },
  ),
  infoSecEmail: yupFormSchemas.email(
    i18n('entities.vendor.fields.infoSecEmail'),
    {
      max: 100,
      min: 1,
    },
  ),
  infoSecPhoneNumber: yupFormSchemas.string(
    i18n('entities.vendor.fields.infoSecPhoneNumber'),
    {
      max: 50,
      min: 1,
    },
  ),
  privacyEmail: yupFormSchemas.email(
    i18n('entities.vendor.fields.privacyEmail'),
    {
      max: 100,
      min: 1,
    },
  ),
  privacyPhoneNumber: yupFormSchemas.string(
    i18n('entities.vendor.fields.privacyPhoneNumber'),
    {
      max: 50,
      min: 1,
    },
  ),
  internalBusinessSponsor: yupFormSchemas.string(
    i18n('entities.vendor.fields.internalBusinessSponsor'),
    {
      min: 1,
      max: 200,
    },
  ),
  descriptionOfServices: yupFormSchemas.string(
    i18n('entities.vendor.fields.descriptionOfServices'),
    {
      max: 250,
      min: 1,
    },
  ),
  logo: yupFormSchemas.images(
    i18n('entities.vendor.fields.logo'),
    {
      max: 1,
    },
  ),
  website: yupFormSchemas.string(
    i18n('entities.vendor.fields.website'),
    {
      max: 100,
      min: 1,
    },
  ),
  address: yupFormSchemas.string(
    i18n('entities.vendor.fields.address'),
    {
      max: 500,
      min: 1,
    },
  ),
  contract: yupFormSchemas.files(
    i18n('entities.vendor.fields.contract'),
    {},
  ),
  documentation: yupFormSchemas.files(
    i18n('entities.vendor.fields.documentation'),
    {},
  ),
  dpiaCompleted: yupFormSchemas.boolean(
    i18n('entities.vendor.fields.dpiaCompleted'),
    {},
  ),
  dtiaCompleted: yupFormSchemas.boolean(
    i18n('entities.vendor.fields.dtiaCompleted'),
    {},
  ),
  iso27001: yupFormSchemas.boolean(
    i18n('entities.vendor.fields.iso27001'),
    {},
  ),
  soc1: yupFormSchemas.boolean(
    i18n('entities.vendor.fields.soc1'),
    {},
  ),
  soc2: yupFormSchemas.boolean(
    i18n('entities.vendor.fields.soc2'),
    {},
  ),
  hippa: yupFormSchemas.boolean(
    i18n('entities.vendor.fields.hippa'),
    {},
  ),
  pcidss: yupFormSchemas.boolean(
    i18n('entities.vendor.fields.pcidss'),
    {},
  ),
  fedramp: yupFormSchemas.boolean(
    i18n('entities.vendor.fields.fedramp'),
    {},
  ),
  gdpr: yupFormSchemas.boolean(
    i18n('entities.vendor.fields.gdpr'),
    {},
  ),
  ccpa: yupFormSchemas.boolean(
    i18n('entities.vendor.fields.ccpa'),
    {},
  ),
  sox: yupFormSchemas.boolean(
    i18n('entities.vendor.fields.sox'),
    {},
  ),
  cobit: yupFormSchemas.boolean(
    i18n('entities.vendor.fields.cobit'),
    {},
  ),
  risks: yupFormSchemas.relationToMany(
    i18n('entities.vendor.fields.risks'),
    {},
  ),
  tasks: yupFormSchemas.relationToMany(
    i18n('entities.vendor.fields.tasks'),
    {},
  ),
  tags: yupFormSchemas.relationToMany(
    i18n('entities.vendor.fields.tags'),
    {},
  ),
});

function EditVendorForm(props) {
  const { sidenavColor } = selectMuiSettings();
  const dispatch = useDispatch();
  const [initialValues] = useState(() => {
    const record = props.record || {};

    return {
      reference: record.reference,
      name: record.name,
      status: record.status,
      category: record.category,
      rating: record.rating,
      users: record.users || [],
      countryOfIncorporation: record.countryOfIncorporation,
      dataProcessed: record.dataProcessed || [],
      industry: record.industry,
      supportEmail: record.supportEmail,
      supportPhoneNumber: record.supportPhoneNumber,
      infoSecEmail: record.infoSecEmail,
      infoSecPhoneNumber: record.infoSecPhoneNumber,
      privacyEmail: record.privacyEmail,
      privacyPhoneNumber: record.privacyPhoneNumber,
      internalBusinessSponsor:
        record.internalBusinessSponsor,
      descriptionOfServices: record.descriptionOfServices,
      logo: record.logo || [],
      website: record.website,
      address: record.address,
      contract: record.contract || [],
      documentation: record.documentation || [],
      dpiaCompleted: record.dpiaCompleted,
      dtiaCompleted: record.dtiaCompleted,
      iso27001: record.iso27001,
      soc1: record.soc1,
      soc2: record.soc2,
      hippa: record.hippa,
      pcidss: record.pcidss,
      fedramp: record.fedramp,
      gdpr: record.gdpr,
      ccpa: record.ccpa,
      sox: record.sox,
      cobit: record.cobit,
      risks: record.risks || [],
      tasks: record.tasks || [],
      tags: record.tags || [],
    };
  });

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    defaultValues: initialValues as any,
  });

  const onSubmit = (values) => {
    props.onSubmit(props.record?.id, values);
  };

  const onReset = () => {
    Object.keys(initialValues).forEach((key) => {
      form.setValue(key, initialValues[key]);
    });
    dispatch(formActions.doRefresh());
  };

  const { saveLoading, modal } = props;

  return (
    <FormWrapper>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <MDBox
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <MDTypography variant="h4">
              {i18n('entities.vendor.edit.title')}
            </MDTypography>
            <FormButtons
              style={{
                flexDirection: 'row-reverse',
              }}
            >
              <MDButton
                variant="gradient"
                color={sidenavColor}
                disabled={saveLoading}
                type="button"
                onClick={form.handleSubmit(onSubmit)}
                startIcon={<SaveIcon />}
                size="small"
              >
                {i18n('common.save')}
              </MDButton>

              <MDButton
                variant="outlined"
                color={sidenavColor}
                disabled={saveLoading}
                onClick={onReset}
                type="button"
                startIcon={<UndoIcon />}
                size="small"
              >
                {i18n('common.reset')}
              </MDButton>

              {props.onCancel ? (
                <MDButton
                  variant="outlined"
                  color={sidenavColor}
                  disabled={saveLoading}
                  onClick={() => props.onCancel()}
                  type="button"
                  startIcon={<CloseIcon />}
                  size="small"
                >
                  {i18n('common.cancel')}
                </MDButton>
              ) : null}
            </FormButtons>
          </MDBox>
          <Grid container spacing={1.6}>
            <Grid item md={8} xs={12}>
              <Card sx={{ height: '100%' }}>
                <MDBox p={2.4} topBorder>
                  <Grid container spacing={1.6}>
                    <Grid item xs={12}>
                      <MDBox
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <MDTypography variant="h5">
                          {i18n('entities.vendor.info')}
                        </MDTypography>
                        <MDTypography
                          variant="button"
                          color="text"
                          fontWeight="bold"
                        >
                          {`# ${initialValues.reference}`}
                        </MDTypography>
                      </MDBox>
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <InputFormItem
                        name="name"
                        label={i18n(
                          'entities.vendor.fields.name',
                        )}
                        required={true}
                        variant="standard"
                        autoFocus
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <VendorCategoryAutocompleteFormItem
                        name="category"
                        label={i18n(
                          'entities.vendor.fields.category',
                        )}
                        variant="standard"
                        fullWidth
                        required={true}
                        showCreate={true}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextAreaFormItem
                        name="descriptionOfServices"
                        label={i18n(
                          'entities.vendor.fields.descriptionOfServices',
                        )}
                        variant="standard"
                        fullWidth
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <ColorBadgeSelectFormItem
                        name="status"
                        label={i18n(
                          'entities.vendor.fields.status',
                        )}
                        options={generateColorBadgeSelectOptions(
                          vendorEnumerators.status,
                          vendorEnumerators.statusColor,
                          'entities.vendor.enumerators.status',
                        )}
                        required={true}
                        variant="standard"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <ColorBadgeSelectFormItem
                        name="rating"
                        label={i18n(
                          'entities.vendor.fields.rating',
                        )}
                        options={generateColorBadgeSelectOptions(
                          vendorEnumerators.rating,
                          vendorEnumerators.ratingColor,
                          'entities.vendor.enumerators.rating',
                        )}
                        required={true}
                        variant="standard"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <SelectFormItem
                        name="industry"
                        label={i18n(
                          'entities.vendor.fields.industry',
                        )}
                        options={vendorEnumerators.industry.map(
                          (value) => ({
                            value,
                            label: i18n(
                              `entities.vendor.enumerators.industry.${value}`,
                            ),
                          }),
                        )}
                        required={true}
                        variant="standard"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <SelectFormItem
                        name="dataProcessed"
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
                        required={true}
                        variant="standard"
                        mode="multiple"
                      />
                    </Grid>
                  </Grid>
                </MDBox>
              </Card>
            </Grid>
            <Grid item md={4} xs={12}>
              <Grid height="100%" container>
                <Grid xs={12} pb={1.6} item>
                  <Card sx={{ height: '100%' }}>
                    <MDBox p={2.4} topBorder>
                      <Grid spacing={1.6} container>
                        <Grid xs={12} item>
                          <MDTypography variant="h5">
                            {i18n(
                              'entities.vendor.fields.logo',
                            )}
                          </MDTypography>
                        </Grid>
                        <Grid xs={12} item>
                          <LogoFormItem
                            name="logo"
                            storage={
                              Storage.values.vendorLogo
                            }
                            max={1}
                          />
                        </Grid>
                      </Grid>
                    </MDBox>
                  </Card>
                </Grid>
                <Grid xs={12} item>
                  <Card sx={{ height: '100%' }}>
                    <MDBox p={2.4} topBorder>
                      <Grid spacing={1.6} container>
                        <Grid xs={12} item>
                          <MDTypography variant="h5">
                            {i18n(
                              'entities.vendor.fields.tags',
                            )}
                          </MDTypography>
                        </Grid>
                        <Grid xs={12} item>
                          <TagAutocompleteFormItem name="tags" />
                        </Grid>
                      </Grid>
                    </MDBox>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={4} xs={12}>
              <Card sx={{ height: '100%' }}>
                <MDBox p={2.4} topBorder>
                  <Grid container spacing={1.6}>
                    <Grid item xs={12}>
                      <MDTypography variant="h5">
                        {i18n(
                          'entities.vendor.sections.contactInformation',
                        )}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12}>
                      <UserAutocompleteFormItem
                        name="users"
                        label={i18n(
                          'entities.vendor.fields.users',
                        )}
                        fullWidth={true}
                        mode="multiple"
                        readOnlyRoles={true}
                        required={true}
                        roles={[Roles.values.vendor]}
                        showCreate={true}
                        variant="standard"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <InputFormItem
                        name="supportEmail"
                        label={i18n(
                          'entities.vendor.fields.supportEmail',
                        )}
                        variant="standard"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <InputFormItem
                        name="supportPhoneNumber"
                        label={i18n(
                          'entities.vendor.fields.supportPhoneNumber',
                        )}
                        variant="standard"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <InputFormItem
                        name="infoSecEmail"
                        label={i18n(
                          'entities.vendor.fields.infoSecEmail',
                        )}
                        variant="standard"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <InputFormItem
                        name="infoSecPhoneNumber"
                        label={i18n(
                          'entities.vendor.fields.infoSecPhoneNumber',
                        )}
                        variant="standard"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <InputFormItem
                        name="privacyEmail"
                        label={i18n(
                          'entities.vendor.fields.privacyEmail',
                        )}
                        variant="standard"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <InputFormItem
                        name="privacyPhoneNumber"
                        label={i18n(
                          'entities.vendor.fields.privacyPhoneNumber',
                        )}
                        variant="standard"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <InputFormItem
                        name="website"
                        label={i18n(
                          'entities.vendor.fields.website',
                        )}
                        variant="standard"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextAreaFormItem
                        name="address"
                        label={i18n(
                          'entities.vendor.fields.address',
                        )}
                        variant="standard"
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                </MDBox>
              </Card>
            </Grid>
            <Grid item md={8} xs={12}>
              <Grid container height="100%">
                <Grid item xs={12} pb={1.6}>
                  <Card sx={{ height: '100%' }}>
                    <MDBox p={2.4} topBorder>
                      <Grid container spacing={1.6}>
                        <Grid item xs={12}>
                          <MDTypography variant="h5">
                            {i18n(
                              'entities.vendor.sections.business',
                            )}
                          </MDTypography>
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <InputFormItem
                            name="internalBusinessSponsor"
                            label={i18n(
                              'entities.vendor.fields.internalBusinessSponsor',
                            )}
                            variant="standard"
                          />
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <SelectFormItem
                            name="countryOfIncorporation"
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
                            required={true}
                            variant="standard"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <FilesFormItem
                            name="contract"
                            label={i18n(
                              'entities.vendor.fields.contract',
                            )}
                            storage={
                              Storage.values.vendorContract
                            }
                            max={undefined}
                          />
                        </Grid>
                      </Grid>
                    </MDBox>
                  </Card>
                </Grid>
                <Grid item xs={12}>
                  <Card sx={{ height: '100%' }}>
                    <MDBox p={2.4} topBorder>
                      <Grid container spacing={1.6}>
                        <Grid item xs={12}>
                          <MDTypography variant="h5">
                            {i18n(
                              'entities.vendor.sections.compliance',
                            )}
                          </MDTypography>
                        </Grid>
                        <Grid item xs={12}>
                          <FilesFormItem
                            name="documentation"
                            label={i18n(
                              'entities.vendor.fields.documentation',
                            )}
                            storage={
                              Storage.values
                                .vendorDocumentation
                            }
                            max={undefined}
                          />
                        </Grid>
                        <Grid item md={4} sm={6} xs={12}>
                          <CheckboxFormItem
                            name="dpiaCompleted"
                            label={i18n(
                              'entities.vendor.fields.dpiaCompleted',
                            )}
                          />
                        </Grid>
                        <Grid item md={4} sm={6} xs={12}>
                          <CheckboxFormItem
                            name="dtiaCompleted"
                            label={i18n(
                              'entities.vendor.fields.dtiaCompleted',
                            )}
                          />
                        </Grid>
                        <Grid item md={4} xs={12}></Grid>
                        <Grid item md={4} sm={6} xs={12}>
                          <CheckboxFormItem
                            name="gdpr"
                            label={i18n(
                              'entities.vendor.fields.gdpr',
                            )}
                          />
                        </Grid>
                        <Grid item md={4} sm={6} xs={12}>
                          <CheckboxFormItem
                            name="ccpa"
                            label={i18n(
                              'entities.vendor.fields.ccpa',
                            )}
                          />
                        </Grid>
                        <Grid item md={4} xs={12}></Grid>
                        <Grid item md={4} sm={6} xs={12}>
                          <CheckboxFormItem
                            name="iso27001"
                            label={i18n(
                              'entities.vendor.fields.iso27001',
                            )}
                          />
                        </Grid>
                        <Grid item md={4} sm={6} xs={12}>
                          <CheckboxFormItem
                            name="soc1"
                            label={i18n(
                              'entities.vendor.fields.soc1',
                            )}
                          />
                        </Grid>
                        <Grid item md={4} sm={6} xs={12}>
                          <CheckboxFormItem
                            name="soc2"
                            label={i18n(
                              'entities.vendor.fields.soc2',
                            )}
                          />
                        </Grid>
                        <Grid item md={4} sm={6} xs={12}>
                          <CheckboxFormItem
                            name="hippa"
                            label={i18n(
                              'entities.vendor.fields.hippa',
                            )}
                          />
                        </Grid>
                        <Grid item md={4} sm={6} xs={12}>
                          <CheckboxFormItem
                            name="pcidss"
                            label={i18n(
                              'entities.vendor.fields.pcidss',
                            )}
                          />
                        </Grid>
                        <Grid item md={4} sm={6} xs={12}>
                          <CheckboxFormItem
                            name="fedramp"
                            label={i18n(
                              'entities.vendor.fields.fedramp',
                            )}
                          />
                        </Grid>
                        <Grid item md={4} sm={6} xs={12}>
                          <CheckboxFormItem
                            name="sox"
                            label={i18n(
                              'entities.vendor.fields.sox',
                            )}
                          />
                        </Grid>
                        <Grid item md={4} sm={6} xs={12}>
                          <CheckboxFormItem
                            name="cobit"
                            label={i18n(
                              'entities.vendor.fields.cobit',
                            )}
                          />
                        </Grid>
                      </Grid>
                    </MDBox>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={6} xs={12}>
              <Card sx={{ height: '100%' }}>
                <MDBox p={2.4} topBorder>
                  <Grid container spacing={1.6}>
                    <Grid item xs={12}>
                      <MDTypography variant="h5">
                        {i18n(
                          'entities.vendor.sections.risks',
                        )}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12}>
                      <RiskAutocompleteFormItem
                        name="risks"
                        label={i18n(
                          'entities.vendor.fields.risks',
                        )}
                        showCreate={true}
                        variant="standard"
                        fullWidth
                        mode="multiple"
                      />
                    </Grid>
                  </Grid>
                </MDBox>
              </Card>
            </Grid>
            <Grid item md={6} xs={12}>
              <Card sx={{ height: '100%' }}>
                <MDBox p={2.4} topBorder>
                  <Grid container spacing={1.6}>
                    <Grid item xs={12}>
                      <MDTypography variant="h5">
                        {i18n(
                          'entities.vendor.sections.tasks',
                        )}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12}>
                      <TaskAutocompleteFormItem
                        name="tasks"
                        label={i18n(
                          'entities.vendor.fields.tasks',
                        )}
                        showCreate={true}
                        variant="standard"
                        fullWidth
                        mode="multiple"
                      />
                    </Grid>
                  </Grid>
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </FormWrapper>
  );
}

export default EditVendorForm;

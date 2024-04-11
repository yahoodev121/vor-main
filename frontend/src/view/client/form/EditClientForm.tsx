import { Card, Grid } from '@mui/material';
import { DEFAULT_MOMENT_FORMAT_DATE_ONLY } from 'src/config/common';
import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useDispatch } from 'react-redux';
import { useForm, FormProvider } from 'react-hook-form';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ClientCategoryAutocompleteFormItem from 'src/view/clientCategory/autocomplete/ClientCategoryAutocompleteFormItem';
import clientEnumerators from 'src/modules/client/clientEnumerators';
import CloseIcon from '@mui/icons-material/Close';
import ColorBadgeSelectFormItem, {
  generateColorBadgeSelectOptions,
} from 'src/view/shared/form/items/ColorBadgeSelectFormItem';
import DatePickerFormItem from 'src/view/shared/form/items/DatePickerFormItem';
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
import moment from 'moment';
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
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';

const schema = yup.object().shape({
  name: yupFormSchemas.string(
    i18n('entities.client.fields.name'),
    {
      required: true,
      min: 1,
      max: 250,
    },
  ),
  description: yupFormSchemas.string(
    i18n('entities.client.fields.description'),
    {
      min: 1,
      max: 250,
    },
  ),
  logo: yupFormSchemas.images(
    i18n('entities.client.fields.logo'),
    {},
  ),
  status: yupFormSchemas.enumerator(
    i18n('entities.client.fields.status'),
    {
      required: true,
      options: clientEnumerators.status,
    },
  ),
  category: yupFormSchemas.relationToOne(
    i18n('entities.client.fields.category'),
    {
      required: true,
    },
  ),
  rating: yupFormSchemas.enumerator(
    i18n('entities.client.fields.rating'),
    {
      required: true,
      options: clientEnumerators.rating,
    },
  ),
  location: yupFormSchemas.enumerator(
    i18n('entities.client.fields.location'),
    {
      required: true,
      options: clientEnumerators.location,
    },
  ),
  address: yupFormSchemas.string(
    i18n('entities.client.fields.address'),
    {
      min: 1,
      max: 500,
    },
  ),
  website: yupFormSchemas.string(
    i18n('entities.client.fields.website'),
    {
      min: 1,
      max: 100,
    },
  ),
  industry: yupFormSchemas.enumerator(
    i18n('entities.client.fields.industry'),
    {
      required: true,
      options: clientEnumerators.industry,
    },
  ),
  dataProcessed: yupFormSchemas.stringArray(
    i18n('entities.client.fields.dataProcessed'),
    {
      required: true,
      options: clientEnumerators.dataProcessed,
    },
  ),
  dateOnboarded: yupFormSchemas.date(
    i18n('entities.client.fields.dateOnboarded'),
    {},
  ),
  dateOffboarded: yupFormSchemas.date(
    i18n('entities.client.fields.dateOffboarded'),
    {},
  ),
  users: yupFormSchemas.relationToMany(
    i18n('entities.client.fields.users'),
    { required: true, min: 1 },
  ),
  infoSecEmail: yupFormSchemas.string(
    i18n('entities.client.fields.infoSecEmail'),
    {
      min: 1,
      max: 100,
    },
  ),
  infoSecPhoneNumber: yupFormSchemas.string(
    i18n('entities.client.fields.infoSecPhoneNumber'),
    {
      min: 1,
      max: 50,
    },
  ),
  privacyEmail: yupFormSchemas.string(
    i18n('entities.client.fields.privacyEmail'),
    {
      required: true,
      min: 1,
      max: 100,
    },
  ),
  privacyPhoneNumber: yupFormSchemas.string(
    i18n('entities.client.fields.privacyPhoneNumber'),
    {
      min: 1,
      max: 50,
    },
  ),
  contract: yupFormSchemas.files(
    i18n('entities.client.fields.contract'),
    {},
  ),
  documentation: yupFormSchemas.files(
    i18n('entities.client.fields.documentation'),
    {},
  ),
  gdprRopa: yupFormSchemas.enumerator(
    i18n('entities.client.fields.gdprRopa'),
    {
      required: true,
      options: clientEnumerators.gdprRopa,
    },
  ),
  risks: yupFormSchemas.relationToMany(
    i18n('entities.client.fields.risks'),
    {},
  ),
  tasks: yupFormSchemas.relationToMany(
    i18n('entities.client.fields.tasks'),
    {},
  ),
  tags: yupFormSchemas.relationToMany(
    i18n('entities.client.fields.tags'),
    {},
  ),
});

function EditClientForm(props) {
  const { sidenavColor } = selectMuiSettings();
  const dispatch = useDispatch();
  const [initialValues] = useState(() => {
    const record = props.record || {};

    return {
      reference: record.reference,
      name: record.name,
      description: record.description,
      logo: record.logo || [],
      status: record.status,
      category: record.category,
      rating: record.rating,
      location: record.location,
      address: record.address,
      website: record.website,
      industry: record.industry,
      dataProcessed: record.dataProcessed || [],
      dateOnboarded: record.dateOnboarded
        ? moment(
            record.dateOnboarded,
            DEFAULT_MOMENT_FORMAT_DATE_ONLY,
          )
        : null,
      dateOffboarded: record.dateOffboarded
        ? moment(
            record.dateOffboarded,
            DEFAULT_MOMENT_FORMAT_DATE_ONLY,
          )
        : null,
      users: record.users || [],
      infoSecEmail: record.infoSecEmail,
      infoSecPhoneNumber: record.infoSecPhoneNumber,
      privacyEmail: record.privacyEmail,
      privacyPhoneNumber: record.privacyPhoneNumber,
      contract: record.contract || [],
      documentation: record.documentation || [],
      gdprRopa: record.gdprRopa,
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
              {i18n('entities.client.edit.title')}
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
                          {i18n('entities.client.info')}
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
                          'entities.client.fields.name',
                        )}
                        required={true}
                        variant="standard"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <ClientCategoryAutocompleteFormItem
                        name="category"
                        label={i18n(
                          'entities.client.fields.category',
                        )}
                        required={true}
                        showCreate={true}
                        variant="standard"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextAreaFormItem
                        name="description"
                        label={i18n(
                          'entities.client.fields.description',
                        )}
                        variant="standard"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <ColorBadgeSelectFormItem
                        name="status"
                        label={i18n(
                          'entities.client.fields.status',
                        )}
                        options={generateColorBadgeSelectOptions(
                          clientEnumerators.status,
                          clientEnumerators.statusColor,
                          'entities.client.enumerators.status',
                        )}
                        required={true}
                        variant="standard"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <ColorBadgeSelectFormItem
                        name="rating"
                        label={i18n(
                          'entities.client.fields.rating',
                        )}
                        options={generateColorBadgeSelectOptions(
                          clientEnumerators.rating,
                          clientEnumerators.ratingColor,
                          'entities.client.enumerators.rating',
                        )}
                        required={true}
                        variant="standard"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <SelectFormItem
                        name="industry"
                        label={i18n(
                          'entities.client.fields.industry',
                        )}
                        options={clientEnumerators.industry.map(
                          (value) => ({
                            value,
                            label: i18n(
                              `entities.client.enumerators.industry.${value}`,
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
                          'entities.client.fields.dataProcessed',
                        )}
                        options={clientEnumerators.dataProcessed.map(
                          (value) => ({
                            value,
                            label: i18n(
                              `entities.client.enumerators.dataProcessed.${value}`,
                            ),
                          }),
                        )}
                        required={true}
                        variant="standard"
                        mode="multiple"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <DatePickerFormItem
                        name="dateOnboarded"
                        label={i18n(
                          'entities.client.fields.dateOnboarded',
                        )}
                        variant="standard"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <DatePickerFormItem
                        name="dateOffboarded"
                        label={i18n(
                          'entities.client.fields.dateOffboarded',
                        )}
                        variant="standard"
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
                              'entities.client.fields.logo',
                            )}
                          </MDTypography>
                        </Grid>
                        <Grid xs={12} item>
                          <LogoFormItem
                            name="logo"
                            storage={
                              Storage.values.clientLogo
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
                              'entities.client.fields.tags',
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
                          'entities.client.sections.contactInformation',
                        )}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12}>
                      <UserAutocompleteFormItem
                        name="users"
                        label={i18n(
                          'entities.client.fields.users',
                        )}
                        fullWidth={true}
                        mode="multiple"
                        readOnlyRoles={true}
                        required={true}
                        roles={[Roles.values.client]}
                        showCreate={true}
                        variant="standard"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <InputFormItem
                        name="infoSecEmail"
                        label={i18n(
                          'entities.client.fields.infoSecEmail',
                        )}
                        variant="standard"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <InputFormItem
                        name="infoSecPhoneNumber"
                        label={i18n(
                          'entities.client.fields.infoSecPhoneNumber',
                        )}
                        variant="standard"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <InputFormItem
                        name="privacyEmail"
                        label={i18n(
                          'entities.client.fields.privacyEmail',
                        )}
                        variant="standard"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <InputFormItem
                        name="privacyPhoneNumber"
                        label={i18n(
                          'entities.client.fields.privacyPhoneNumber',
                        )}
                        variant="standard"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextAreaFormItem
                        name="address"
                        label={i18n(
                          'entities.client.fields.address',
                        )}
                        variant="standard"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <InputFormItem
                        name="website"
                        label={i18n(
                          'entities.client.fields.website',
                        )}
                        variant="standard"
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
                              'entities.client.sections.business',
                            )}
                          </MDTypography>
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <SelectFormItem
                            name="location"
                            label={i18n(
                              'entities.client.fields.location',
                            )}
                            options={clientEnumerators.location.map(
                              (value) => ({
                                value,
                                label: i18n(
                                  `entities.client.enumerators.location.${value}`,
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
                              'entities.client.fields.contract',
                            )}
                            storage={
                              Storage.values.clientContract
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
                              'entities.client.sections.compliance',
                            )}
                          </MDTypography>
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <SelectFormItem
                            name="gdprRopa"
                            label={i18n(
                              'entities.client.fields.gdprRopa',
                            )}
                            options={clientEnumerators.gdprRopa.map(
                              (value) => ({
                                value,
                                label: i18n(
                                  `entities.client.enumerators.gdprRopa.${value}`,
                                ),
                              }),
                            )}
                            required={true}
                            variant="standard"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <FilesFormItem
                            name="documentation"
                            label={i18n(
                              'entities.client.fields.documentation',
                            )}
                            storage={
                              Storage.values
                                .clientDocumentation
                            }
                            max={undefined}
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
                          'entities.client.sections.risks',
                        )}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12}>
                      <RiskAutocompleteFormItem
                        name="risks"
                        label={i18n(
                          'entities.client.fields.risks',
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
                          'entities.client.sections.tasks',
                        )}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12}>
                      <TaskAutocompleteFormItem
                        name="tasks"
                        label={i18n(
                          'entities.client.fields.tasks',
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

export default EditClientForm;

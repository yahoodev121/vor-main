import { Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, FormProvider } from 'react-hook-form';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import authSelectors from 'src/modules/auth/authSelectors';
import CloseIcon from '@mui/icons-material/Close';
import formActions from 'src/modules/form/formActions';
import FormWrapper, {
  FormButtons,
} from 'src/view/shared/styles/FormWrapper';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import MDButton from 'src/mui/components/MDButton';
import SaveIcon from '@mui/icons-material/Save';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';
import UndoIcon from '@mui/icons-material/Undo';
import userEnumerators, {
  hasBanRoles4Group,
} from 'src/modules/user/userEnumerators';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import UserGroupAutocompleteFormItem from 'src/view/userGroup/autocomplete/UserGroupAutocompleteFormItem';

const schema = yup.object().shape({
  email: yupFormSchemas.email(i18n('user.fields.email')),
  roles: yupFormSchemas.stringArray(
    i18n('user.fields.roles'),
    { required: true, min: 1 },
  ),
  firstName: yupFormSchemas.string(
    i18n('user.fields.firstName'),
    {
      max: 80,
    },
  ),
  lastName: yupFormSchemas.string(
    i18n('user.fields.lastName'),
    {
      max: 175,
    },
  ),
  userGroups: yupFormSchemas.relationToMany(
    i18n('user.fields.userGroups'),
    {},
  ),
  phoneNumber: yupFormSchemas.string(
    i18n('user.fields.phoneNumber'),
    {
      matches: /^[0-9]/,
      max: 24,
    },
  ),
  jobTitle: yupFormSchemas.string(
    i18n('user.fields.jobTitle'),
    {
      max: 500,
    },
  ),
});

const UserNewForm = (props) => {
  const { sidenavColor } = selectMuiSettings();

  const dispatch = useDispatch();

  const {
    modal,
    onCancel,
    onSubmit: doSubmit,
    readOnlyRoles,
    roles,
    saveLoading,
  } = props;

  const hasAdminRole = useSelector(
    authSelectors.selectHasAdminRole,
  );

  const userRoles = useSelector(authSelectors.selectRoles);
  const [useUserGroups, setUseUserGroups] = useState(true);

  const [initialValues] = useState(() => ({
    emails: [],
    email: '',
    roles: hasAdminRole ? roles || [] : userRoles,
    userGroups: [],
  }));

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    defaultValues: initialValues,
  });

  const onSubmit = (values) => {
    const { ...data } = values;

    if (data.email) {
      data.emails = [data.email];
      delete data.email;
    }

    if (!useUserGroups) {
      delete data.userGroups;
    }

    doSubmit && doSubmit(null, data);
  };

  const onReset = () => {
    Object.keys(initialValues).forEach((key) => {
      form.setValue(key, initialValues[key]);
    });
    dispatch(formActions.doRefresh());
  };

  return (
    <FormWrapper>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Grid spacing={1.6} container>
            <Grid item lg={6} xs={12}>
              <InputFormItem
                name="firstName"
                label={i18n('user.fields.firstName')}
                variant="standard"
                autoFocus
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <InputFormItem
                name="lastName"
                label={i18n('user.fields.lastName')}
                variant="standard"
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <InputFormItem
                name="email"
                label={i18n('user.fields.email')}
                required={true}
                variant="standard"
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <SelectFormItem
                name="roles"
                label={i18n('user.fields.roles')}
                options={userEnumerators.roles.map(
                  (value) => ({
                    value,
                    label: i18n(`roles.${value}.label`),
                  }),
                )}
                switchOptions={userEnumerators.switchRoles}
                variant="standard"
                mode="multiple"
                readOnly={!hasAdminRole || readOnlyRoles}
                onChange={(roles) =>
                  setUseUserGroups(
                    !hasBanRoles4Group(roles),
                  )
                }
                required
              />
            </Grid>
            {useUserGroups && (
              <Grid item xs={12}>
                <UserGroupAutocompleteFormItem
                  name="userGroups"
                  label={i18n('user.fields.userGroups')}
                  variant="standard"
                  mode="multiple"
                  readOnly={!hasAdminRole || readOnlyRoles}
                  showCreate
                />
              </Grid>
            )}
            <Grid item lg={6} xs={12}>
              <InputFormItem
                name="jobTitle"
                label={i18n('user.fields.jobTitle')}
                variant="standard"
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <InputFormItem
                name="phoneNumber"
                label={i18n('user.fields.phoneNumber')}
                variant="standard"
              />
            </Grid>
          </Grid>

          <FormButtons
            style={{
              flexDirection: modal
                ? 'row-reverse'
                : undefined,
            }}
          >
            <MDButton
              variant="gradient"
              color={sidenavColor}
              disabled={saveLoading}
              type="submit"
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

            {onCancel ? (
              <MDButton
                variant="outlined"
                color={sidenavColor}
                disabled={saveLoading}
                onClick={() => onCancel()}
                type="button"
                startIcon={<CloseIcon />}
                size="small"
              >
                {i18n('common.cancel')}
              </MDButton>
            ) : null}
          </FormButtons>
        </form>
      </FormProvider>
    </FormWrapper>
  );
};

export default UserNewForm;

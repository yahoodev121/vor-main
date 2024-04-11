import { Avatar, Card, Grid } from '@mui/material';
import { DEFAULT_MOMENT_FORMAT } from 'src/config/common';
import { FormButtons } from 'src/view/shared/styles/FormWrapper';
import {
  getUserAvatar,
  getUserNameOrEmailPrefix,
} from 'src/modules/utils';
import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, FormProvider } from 'react-hook-form';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import actions from 'src/modules/user/form/userFormActions';
import authSelectors from 'src/modules/auth/authSelectors';
import formActions from 'src/modules/form/formActions';
import ImagesFormItem from 'src/view/shared/form/items/ImagesFormItem';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import MDBox from 'src/mui/components/MDBox';
import MDButton from 'src/mui/components/MDButton';
import MDTypography from 'src/mui/components/MDTypography';
import moment from 'moment';
import SaveIcon from '@mui/icons-material/Save';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';
import Storage from 'src/security/storage';
import TextViewItem from 'src/view/shared/view/TextViewItem';
import UndoIcon from '@mui/icons-material/Undo';
import userEnumerators, {
  hasBanRoles4Group,
} from 'src/modules/user/userEnumerators';
import UserStatusView from 'src/view/user/view/UserStatusView';
import UserViewItem from 'src/view/user/view/UserViewItem';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';

const schema = yup.object().shape({
  avatars: yupFormSchemas.images(
    i18n('user.fields.avatars'),
    {
      max: 1,
    },
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
  roles: yupFormSchemas.stringArray(
    i18n('user.fields.roles'),
  ),
});

const BasicInfo = (props): JSX.Element => {
  const {
    id,
    saveLoading,
    user,
    readOnly,
    setUseFeatures,
  } = props;
  const dispatch = useDispatch();

  const [initialValues] = useState(() => {
    const record = user ?? {};
    return {
      avatars: record.avatars ?? [],
      firstName: record.firstName,
      lastName: record.lastName,
      email: record.email,
      phoneNumber: record.phoneNumber,
      jobTitle: record.jobTitle,
      roles: record.roles ?? [],
    };
  });

  const hasAdminRole = useSelector(
    authSelectors.selectHasAdminRole,
  );

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    defaultValues: initialValues,
  });

  const onSubmit = (values) => {
    const data = {
      id: user.id,
      ...values,
    };
    delete data.email;
    dispatch(
      actions.doUpdate(data, false, () =>
        dispatch(actions.doInit(user.id)),
      ),
    );
  };

  const onReset = () => {
    Object.keys(initialValues).forEach((key) => {
      form.setValue(key, initialValues[key]);
    });
    dispatch(formActions.doRefresh());
  };

  const { sidenavColor } = selectMuiSettings();

  return (
    <FormProvider {...form}>
      <MDBox
        id={id}
        component="form"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Card sx={{ overflow: 'visible', mb: 2.4 }}>
          <MDBox p={2.4} topBorder>
            <Grid
              container
              spacing={2.4}
              alignItems="center"
            >
              <Grid item>
                {readOnly ? (
                  <Avatar
                    src={getUserAvatar(user)}
                    alt="profile-image"
                    sx={{ width: 80, height: 80 }}
                  />
                ) : (
                  <ImagesFormItem
                    name="avatars"
                    label={i18n('user.fields.avatars')}
                    isAvatar={true}
                    storage={
                      Storage.values.userAvatarsProfiles
                    }
                    max={1}
                  />
                )}
              </Grid>
              <Grid item>
                <MDBox
                  height="100%"
                  mt={0.5}
                  lineHeight={1}
                >
                  <MDTypography
                    variant="h5"
                    fontWeight="medium"
                  >
                    {getUserNameOrEmailPrefix(user)}
                  </MDTypography>
                  <MDTypography
                    variant="button"
                    color="text"
                    fontWeight="medium"
                  >
                    {user.jobTitle}
                  </MDTypography>
                  {Boolean(
                    user.clients?.length ||
                      user.vendors?.length,
                  ) && (
                    <MDTypography
                      variant="body2"
                      fontWeight="bold"
                    >
                      {user.clients[0]?.name ??
                        user.vendors[0]?.name}
                    </MDTypography>
                  )}
                </MDBox>
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                lg={3}
                sx={{ ml: 'auto' }}
              >
                <MDBox
                  display="flex"
                  justifyContent={{ md: 'flex-end' }}
                  alignItems="center"
                  lineHeight={1}
                >
                  <UserStatusView value={user.status} />
                </MDBox>
              </Grid>
            </Grid>
          </MDBox>
        </Card>
        <Card sx={{ overflow: 'visible' }}>
          <MDBox p={2.4} topBorder>
            <MDTypography variant="h5">
              {i18n('profile.titles.basicInfo')}
            </MDTypography>
          </MDBox>
          <MDBox px={2.4} pb={2.4}>
            <Grid spacing={1.6} container>
              <Grid item lg={6} xs={12}>
                <InputFormItem
                  name="firstName"
                  label={i18n('user.fields.firstName')}
                  variant="standard"
                  autoComplete="firstName"
                  readOnly={readOnly}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <InputFormItem
                  name="lastName"
                  label={i18n('user.fields.lastName')}
                  variant="standard"
                  autoComplete="lastName"
                  readOnly={readOnly}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <InputFormItem
                  name="email"
                  label={i18n('user.fields.email')}
                  variant="standard"
                  readOnly={true}
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
                  switchOptions={
                    userEnumerators.switchRoles
                  }
                  onChange={(roles) =>
                    setUseFeatures({
                      'user-groups':
                        !hasBanRoles4Group(roles),
                    })
                  }
                  mode="multiple"
                  variant="standard"
                  readOnly={!hasAdminRole || readOnly}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <InputFormItem
                  name="jobTitle"
                  label={i18n('user.fields.jobTitle')}
                  variant="standard"
                  readOnly={readOnly}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <InputFormItem
                  name="phoneNumber"
                  label={i18n('user.fields.phoneNumber')}
                  autoComplete="phoneNumber"
                  variant="standard"
                  readOnly={readOnly}
                  prefix="+"
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <TextViewItem
                  label={i18n('user.fields.createdAt')}
                  value={moment(user.createdAt).format(
                    DEFAULT_MOMENT_FORMAT,
                  )}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <UserViewItem
                  label={i18n('common.createdBy')}
                  value={user.createdBy}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <TextViewItem
                  label={i18n('user.fields.lastModifiedAt')}
                  value={moment(user.updatedAt).format(
                    DEFAULT_MOMENT_FORMAT,
                  )}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <TextViewItem
                  label={i18n('user.fields.lastLoginAt')}
                  value={moment(user.lastLoginAt).format(
                    DEFAULT_MOMENT_FORMAT,
                  )}
                />
              </Grid>
              {!readOnly && (
                <Grid item xs={12}>
                  <FormButtons
                    style={{
                      flexDirection: 'row-reverse',
                      margin: 0,
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
                  </FormButtons>
                </Grid>
              )}
            </Grid>
          </MDBox>
        </Card>
      </MDBox>
    </FormProvider>
  );
};

export default BasicInfo;

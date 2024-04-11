import { Card, Grid } from '@mui/material';
import { FormButtons } from 'src/view/shared/styles/FormWrapper';
import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useForm, FormProvider } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import actions from 'src/modules/auth/authActions';
import DoneIcon from '@mui/icons-material/Done';
import formActions from 'src/modules/form/formActions';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import MDBox from 'src/mui/components/MDBox';
import MDButton from 'src/mui/components/MDButton';
import MDTypography from 'src/mui/components/MDTypography';
import Message from 'src/view/shared/message';
import RemoveIcon from '@mui/icons-material/Remove';
import SaveIcon from '@mui/icons-material/Save';
import selectors from 'src/modules/auth/authSelectors';
import UndoIcon from '@mui/icons-material/Undo';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';

const schema = yup.object().shape({
  oldPassword: yupFormSchemas.string(
    i18n('user.fields.oldPassword'),
    {
      required: true,
    },
  ),
  newPassword: yupFormSchemas.string(
    i18n('user.fields.newPassword'),
    {
      required: true,
    },
  ),
  newPasswordConfirmation: yupFormSchemas
    .string(i18n('user.fields.newPasswordConfirmation'), {
      required: true,
    })
    .oneOf(
      [yup.ref('newPassword'), null],
      i18n('auth.passwordChange.mustMatch'),
    ),
});

const ChangePassword = (props): JSX.Element => {
  const { id } = props;

  const { sidenavColor } = selectMuiSettings();

  const [newPassword, setNewPassword] = useState(null);

  const matchPasswordRequirement = (
    password,
    requirement,
  ) =>
    password &&
    password.replace(requirement.filter, '').length >=
      requirement.length;

  const passwordRequirements = [
    {
      length: 10,
      filter: null,
      label: 'profile.changePassword.charactersLength',
    },
    {
      length: 1,
      filter: /[^A-Z]/g,
      label: 'profile.changePassword.uppercaseLength',
    },
    {
      length: 1,
      filter: /[^a-z]/g,
      label: 'profile.changePassword.lowercaseLength',
    },
    {
      length: 1,
      filter: /[^\!\@\#\$\%\^\&\*\(\)]/g,
      symbols: '!@#$%^&*()',
      label: 'profile.changePassword.symbolsLength',
    },
    {
      length: 1,
      filter: /[\D]/g,
      label: 'profile.changePassword.numbersLength',
    },
  ];

  const dispatch = useDispatch();

  const [initialValues] = useState(() => ({
    oldPassword: '',
    newPassword: '',
    newPasswordConfirmation: '',
  }));

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    defaultValues: initialValues,
  });

  const saveLoading = useSelector(
    selectors.selectLoadingPasswordChange,
  );

  const onSubmit = (values) => {
    for (const requirement of passwordRequirements) {
      if (
        !matchPasswordRequirement(
          values.newPassword,
          requirement,
        )
      ) {
        Message.error(
          i18n(
            requirement.label,
            requirement.length,
            requirement.symbols,
          ),
        );
        return;
      }
    }
    dispatch(
      actions.doChangePassword(
        values.oldPassword,
        values.newPassword,
      ),
    );
  };

  const onReset = () => {
    Object.keys(initialValues).forEach((key: any) => {
      form.setValue(key, initialValues[key]);
    });
    dispatch(formActions.doRefresh());
    setNewPassword(null);
  };

  const renderPasswordRequirements =
    passwordRequirements.map((item, key) => {
      const itemKey = `element-${key}`;
      const matched = matchPasswordRequirement(
        newPassword,
        item,
      );
      return (
        <MDBox
          key={itemKey}
          display="flex"
          alignItems="center"
          color={matched ? 'success' : 'text'}
          fontSize="1rem"
          lineHeight={1}
        >
          {matched ? <DoneIcon /> : <RemoveIcon />}
          <MDTypography
            variant="button"
            fontWeight="regular"
            color="inherit"
            verticalAlign="middle"
            ml={0.8}
          >
            {i18n(
              item.label,
              item.length,
              item.symbols ?? '',
            )}
          </MDTypography>
        </MDBox>
      );
    });

  return (
    <Card id={id}>
      <MDBox p={2.4} topBorder>
        <MDTypography variant="h5">
          {i18n('profile.titles.changePassword')}
        </MDTypography>
      </MDBox>
      <FormProvider {...form}>
        <MDBox
          component="form"
          pb={2.4}
          px={2.4}
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <Grid container spacing={1.6}>
            <Grid item xs={12}>
              <InputFormItem
                type="password"
                name="oldPassword"
                label={i18n('user.fields.oldPassword')}
                variant="standard"
                autoComplete="old-password"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <InputFormItem
                type="password"
                name="newPassword"
                label={i18n('user.fields.newPassword')}
                onChange={setNewPassword}
                variant="standard"
                autoComplete="new-password"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <InputFormItem
                type="password"
                name="newPasswordConfirmation"
                variant="standard"
                label={i18n(
                  'user.fields.newPasswordConfirmation',
                )}
                autoComplete="new-password"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <MDBox
                alignItems="end"
                display="flex"
                flexWrap="wrap"
                justifyContent="space-between"
              >
                <MDBox>
                  <MDBox mt={3.2}>
                    <MDTypography
                      variant="body1"
                      fontWeight="bold"
                    >
                      {i18n(
                        'profile.labels.passwordRequirements',
                      )}
                    </MDTypography>
                  </MDBox>
                  <MDBox my={0.8}>
                    <MDTypography
                      variant="body2"
                      fontWeight="regular"
                      color="text"
                    >
                      {i18n(
                        'profile.hints.strongPasswordGuide',
                      )}
                    </MDTypography>
                  </MDBox>
                  <MDBox
                    display="flex"
                    justifyContent="space-between"
                    alignItems="flex-end"
                    flexWrap="wrap"
                  >
                    <MDBox m={0} mb={{ xs: 2.4, sm: 0 }}>
                      {renderPasswordRequirements}
                    </MDBox>
                  </MDBox>
                </MDBox>
                <FormButtons
                  style={{
                    flexGrow: 1,
                    flexDirection: 'row-reverse',
                    margin: 0,
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
                </FormButtons>
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </FormProvider>
    </Card>
  );
};

export default ChangePassword;

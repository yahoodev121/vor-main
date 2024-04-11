import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, FormProvider } from 'react-hook-form';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CloseIcon from '@mui/icons-material/Close';
import formActions from 'src/modules/form/formActions';
import FormWrapper, {
  FormButtons,
} from 'src/view/shared/styles/FormWrapper';
import MDButton from 'src/mui/components/MDButton';
import SaveIcon from '@mui/icons-material/Save';
import UndoIcon from '@mui/icons-material/Undo';
import userGroupEnumerators from 'src/modules/userGroup/userGroupEnumerators';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import EditUserGroupLayout from 'src/view/userGroup/form/EditUserGroupLayout';
import { Card, Grid } from '@mui/material';
import UserSubTable from 'src/view/user/list/UserSubTable';

const schema = yup.object().shape({
  name: yupFormSchemas.string(
    i18n('entities.userGroup.fields.name'),
    {
      required: true,
      min: 1,
      max: 200,
    },
  ),
  description: yupFormSchemas.string(
    i18n('entities.userGroup.fields.description'),
    {
      max: 250,
    },
  ),
  type: yupFormSchemas.enumerator(
    i18n('entities.userGroup.fields.type'),
    {
      required: true,
      options: userGroupEnumerators.type,
    },
  ),
  users: yupFormSchemas.relationToMany(
    i18n('entities.userGroup.fields.users'),
    {},
  ),
});

function EditUserGroupForm(props) {
  const { sidenavColor } = selectMuiSettings();
  const dispatch = useDispatch();
  const [initialValues] = useState(() => {
    const record = props.record || {};

    return {
      name: record.name,
      description: record.description,
      type: record.type,
      users: record.users || [],
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

  const { saveLoading, modal, title } = props;

  return (
    <Grid spacing={1.6} container>
      <Grid item xs={12}>
        <FormWrapper>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <MDBox
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <MDTypography variant="h4">
                  {i18n('entities.userGroup.edit.title')}
                </MDTypography>
                <FormButtons
                  style={{
                    flexDirection: 'row-reverse',
                  }}
                >
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
                <Grid item xs={12}>
                  <Card sx={{ height: '100%' }}>
                    <MDBox p={2.4} topBorder>
                      <Grid spacing={1.6} container>
                        <EditUserGroupLayout
                          title={title}
                          initialValues={{
                            ...initialValues,
                          }}
                          record={props.record}
                        />
                        <Grid item xs={12}>
                          <FormButtons
                            style={{
                              flexDirection: 'row-reverse',
                            }}
                          >
                            <MDButton
                              variant="gradient"
                              color={sidenavColor}
                              disabled={saveLoading}
                              type="submit"
                              onClick={form.handleSubmit(
                                onSubmit,
                              )}
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
                      </Grid>
                    </MDBox>
                  </Card>
                </Grid>
              </Grid>
            </form>
          </FormProvider>
        </FormWrapper>
      </Grid>
      <Grid item xs={12}>
        <UserSubTable groupId={props.record?.id} />
      </Grid>
    </Grid>
  );
}

export default EditUserGroupForm;

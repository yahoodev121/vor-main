import { Grid } from '@mui/material';
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
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import MDButton from 'src/mui/components/MDButton';
import RadioFormItem from 'src/view/shared/form/items/RadioFormItem';
import SaveIcon from '@mui/icons-material/Save';
import TextAreaFormItem from 'src/view/shared/form/items/TextAreaFormItem';
import UndoIcon from '@mui/icons-material/Undo';
import userGroupEnumerators from 'src/modules/userGroup/userGroupEnumerators';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import UserSubTable from 'src/view/user/list/UserSubTable';
import userGroupFormSelectors from 'src/modules/userGroup/form/userGroupFormSelectors';

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

function NewUserGroupForm(props) {
  const { sidenavColor } = selectMuiSettings();

  const dispatch = useDispatch();

  const toggleUsers = useSelector(
    userGroupFormSelectors.selectToggleUsers,
  );

  const {
    modal,
    onCancel,
    onSubmit: doSubmit,
    saveLoading,
  } = props;

  const [initialValues] = useState(() => {
    const record = props.record || {};

    return {
      name: record.name,
      description: record.description,
      type: record.type || 'Default',
      users: record.users || [],
    };
  });

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    defaultValues: initialValues as any,
  });

  const onSubmit = (values) => {
    doSubmit &&
      doSubmit(null, { ...values, users: toggleUsers });
  };

  const onReset = () => {
    Object.keys(initialValues).forEach((key) => {
      form.setValue(key, initialValues[key]);
    });
    dispatch(formActions.doRefresh());
  };

  return (
    <>
      <Grid spacing={1.6} container>
        <Grid item xs={12}>
          <FormWrapper>
            <FormProvider {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <Grid spacing={1.6} container>
                  <Grid item lg={6} xs={12}>
                    <InputFormItem
                      name="name"
                      label={i18n(
                        'entities.userGroup.fields.name',
                      )}
                      variant="standard"
                      required
                      autoFocus
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <RadioFormItem
                      name="type"
                      label={i18n(
                        'entities.userGroup.fields.type',
                      )}
                      options={userGroupEnumerators.type.map(
                        (value) => ({
                          value,
                          label: i18n(
                            `entities.userGroup.enumerators.type.${value}`,
                          ),
                        }),
                      )}
                      required={true}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextAreaFormItem
                      name="description"
                      label={i18n(
                        'entities.userGroup.fields.description',
                      )}
                      variant="standard"
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </form>
            </FormProvider>
          </FormWrapper>
        </Grid>
        {!modal && (
          <Grid item xs={12}>
            <UserSubTable
              doUseCard={false}
              toggleUsersForGroup={true}
            />
          </Grid>
        )}
      </Grid>

      <FormButtons
        style={{
          flexDirection: modal ? 'row-reverse' : undefined,
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
    </>
  );
}

export default NewUserGroupForm;

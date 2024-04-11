import { Card, Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useDispatch } from 'react-redux';
import { useForm, FormProvider } from 'react-hook-form';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@mui/icons-material/Close';
import EditPolicyLayout from 'src/view/policy/form/EditPolicyLayout';
import formActions from 'src/modules/form/formActions';
import FormWrapper, {
  FormButtons,
} from 'src/view/shared/styles/FormWrapper';
import MDBox from 'src/mui/components/MDBox';
import MDButton from 'src/mui/components/MDButton';
import MDTypography from 'src/mui/components/MDTypography';
import NewPolicyLayout from 'src/view/policy/form/NewPolicyLayout';
import SaveIcon from '@mui/icons-material/Save';
import UndoIcon from '@mui/icons-material/Undo';
import schema from 'src/view/policy/form/Schema';
import policyEnumerators from 'src/modules/policy/policyEnumerators';

function PolicyForm(props) {
  const { sidenavColor } = selectMuiSettings();
  const dispatch = useDispatch();
  const [policyType, setPolicyType] = useState(
    props.record?.type || policyEnumerators.type[0],
  );
  const [initialValues] = useState(() => {
    const record = props.record || {};

    return {
      name: record.name,
      type: record.type || policyEnumerators.type[0],
      description: record.description,
      attachment: record.attachment || [],
      link: record.link,
      notes: record.notes || [],
      tags: record.tags || [],
    };
  });

  const form = useForm({
    resolver: yupResolver(
      schema[policyEnumerators.type.indexOf(policyType)],
    ),
    mode: 'onSubmit',
    defaultValues: initialValues as any,
  });

  const onSubmit = (values) => {
    props.onSubmit(
      props.record?.policy || props.record?.id,
      values,
    );
  };

  const onReset = () => {
    Object.keys(initialValues).forEach((key) => {
      form.setValue(key, initialValues[key]);
    });
    dispatch(formActions.doRefresh());
  };

  const { saveLoading, modal, isEditing, title } = props;

  const makeFormButtons = (modal = false) => {
    return (
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
    );
  };

  return (
    <FormWrapper>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {!isEditing &&
            (modal ? (
              <NewPolicyLayout
                title={title}
                policyType={policyType}
                setPolicyType={setPolicyType}
                modal
              />
            ) : (
              <Grid
                container
                spacing={1.6}
                justifyContent="center"
                mt={0.8}
              >
                <Grid item lg={9} md={8} sm={12} xs={12}>
                  <Card>
                    <MDBox px={1.6} py={1.6}>
                      <NewPolicyLayout
                        title={title}
                        policyType={policyType}
                        setPolicyType={setPolicyType}
                        modal
                      />
                      <MDBox px={0.8}>
                        {makeFormButtons(true)}
                      </MDBox>
                    </MDBox>
                  </Card>
                </Grid>
              </Grid>
            ))}
          {isEditing && (
            <MDBox
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <MDTypography variant="h4">
                {i18n('entities.policy.edit.title')}
              </MDTypography>
              {makeFormButtons(true)}
            </MDBox>
          )}
          {!isEditing && modal && makeFormButtons(modal)}
          {isEditing && (
            <EditPolicyLayout
              initialValues={{ ...initialValues }}
              record={props.record}
              title={title}
              policyType={policyType}
              setPolicyType={setPolicyType}
              modal
            />
          )}
        </form>
      </FormProvider>
    </FormWrapper>
  );
}

export default PolicyForm;

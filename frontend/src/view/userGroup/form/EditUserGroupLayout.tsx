import { Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import userGroupEnumerators from 'src/modules/userGroup/userGroupEnumerators';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import RadioFormItem from 'src/view/shared/form/items/RadioFormItem';
import TextAreaFormItem from 'src/view/shared/form/items/TextAreaFormItem';

function EditUserGroupLayout(props) {
  return (
    <>
      <Grid item xs={12}>
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <MDTypography variant="h5">
            {i18n('entities.userGroup.info')}
          </MDTypography>
        </MDBox>
      </Grid>
      <Grid item md={6} xs={12}>
        <InputFormItem
          name="name"
          label={i18n('entities.userGroup.fields.name')}
          variant="standard"
          required
          autoFocus
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <RadioFormItem
          name="type"
          label={i18n('entities.userGroup.fields.type')}
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
          rows={3}
          fullWidth
        />
      </Grid>
    </>
  );
}

export default EditUserGroupLayout;

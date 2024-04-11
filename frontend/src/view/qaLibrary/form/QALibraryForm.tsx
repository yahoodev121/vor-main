import { Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import UndoIcon from '@mui/icons-material/Undo';
import { useState } from 'react';
import { i18n } from 'src/i18n';
import FormWrapper, {
  FormButtons,
} from 'src/view/shared/styles/FormWrapper';
import { useForm, FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import { yupResolver } from '@hookform/resolvers/yup';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import SwitchFormItem from 'src/view/shared/form/items/SwitchFormItem';
import MDButton from 'src/mui/components/MDButton';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useDispatch } from 'react-redux';
import formActions from 'src/modules/form/formActions';
import DatePickerFormItem from 'src/view/shared/form/items/DatePickerFormItem';
import { getAbsoluteDateTimeByHour } from 'src/modules/utils';

const schema = yup.object().shape({
  question: yupFormSchemas.string(
    i18n('entities.qaLibrary.fields.question'),
    {
      required: true,
      min: 1,
      max: 255,
    },
  ),
  answer: yupFormSchemas.string(
    i18n('entities.qaLibrary.fields.answer'),
    {
      required: true,
      min: 1,
      max: 255,
    },
  ),
  aiKnowledgebase: yupFormSchemas.boolean(
    i18n('entities.qaLibrary.fields.aiKnowledgebase'),
  ),
  expirationDate: yupFormSchemas.datetime(
    i18n('entities.qaLibrary.fields.expirationDate'),
    {
      required: true,
    }
  ),
});

function QALibraryForm(props) {
  const { sidenavColor } = selectMuiSettings();
  const dispatch = useDispatch();
  const [initialValues] = useState(() => {
    const record = props.record || {};

    return {
      question: record.question,
      answer: record.answer,
      aiKnowledgebase: Object.keys(record).length > 0 ? record.aiKnowledgebase : true,
      expirationDate: record.expirationDate,
    };
  });
  const [expirationDate, setExpirationDate] = useState(
    props.record?.expirationDate || null,
  );

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
          <Grid spacing={1.6} container>
            <Grid item lg={7} md={8} sm={12} xs={12}>
              <InputFormItem
                name="question"
                label={i18n(
                  'entities.qaLibrary.fields.question',
                )}
                variant="standard"
                required={true}
                autoFocus
              />
            </Grid>
            <Grid item lg={7} md={8} sm={12} xs={12}>
              <InputFormItem
                name="answer"
                label={i18n(
                  'entities.qaLibrary.fields.answer',
                )}
                variant="standard"
                required={true}
              />
            </Grid>
            <Grid item lg={7} md={8} sm={12} xs={12}>
              <SwitchFormItem
                name="aiKnowledgebase"
                label={i18n('entities.qaLibrary.fields.aiKnowledgebase')}
                required={true}
              />
            </Grid>
            <Grid item lg={7} md={8} sm={12} xs={12}>
              <DatePickerFormItem
                name="expirationDate"
                label={i18n('entities.qaLibrary.fields.expirationDate')}
                required={false}
                variant="standard"
                onAccept={(value) => {
                  const newValue =
                    getAbsoluteDateTimeByHour(value);
                    setExpirationDate(newValue?.toISOString() || null);
                }}
                value={expirationDate}
                forceValue
                showTime
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
        </form>
      </FormProvider>
    </FormWrapper>
  );
}

export default QALibraryForm;

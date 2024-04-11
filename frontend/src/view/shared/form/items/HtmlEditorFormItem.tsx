import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';
import FormErrors from 'src/view/shared/form/formErrors';
import formSelectors from 'src/modules/form/formSelectors';
import MDBox from 'src/mui/components/MDBox';
import MDEditor from 'src/mui/components/MDEditor';
import MDTypography from 'src/mui/components/MDTypography';
import PropTypes from 'prop-types';

function HtmlEditorFormItem(props) {
  const { darkMode } = selectMuiSettings();

  const {
    disabled,
    externalErrorMessage,
    forceValue,
    hideLabel,
    hint,
    label,
    modules,
    name,
    onBlur,
    onChange,
    placeholder,
    quillRef,
    required,
    rerender,
    value,
  } = props;

  const {
    control: { defaultValuesRef },
    errors,
    formState: { touched, isSubmitted },
    getValues,
    register,
    setValue,
  } = useFormContext();

  const defaultValues = defaultValuesRef.current || {};

  const formValue = name ? getValues(name) : null;

  const getInitialValue = () =>
    ![null, undefined].includes(formValue)
      ? formValue
      : value || defaultValues[name] || '';

  const [curValue, setCurValue] = useState(
    getInitialValue(),
  );

  if (forceValue && name) {
    setValue(name, value, {
      shouldValidate: false,
      shouldDirty: true,
    });
  }

  useEffect(() => {
    if (name) {
      register({ name });
    }
  }, [register, name]);

  useEffect(() => {
    if (forceValue) {
      setCurValue(value);
    }
  }, [value]);

  const refresh = useSelector(formSelectors.selectRefresh);

  useEffect(() => {
    setCurValue(getInitialValue());
  }, [rerender, refresh]);

  const errorMessage = FormErrors.errorMessage(
    name,
    errors,
    touched,
    isSubmitted,
    externalErrorMessage,
  );

  return (
    <MDBox
      pt={Boolean(label) ? 1.6 : 0}
      position="relative"
    >
      {Boolean(label) && (
        <MDTypography
          variant="caption"
          color={darkMode ? 'text' : 'secondary'}
          fontWeight="regular"
          lineHeight={1}
          position="absolute"
          top="0"
        >
          {`${label}${required ? ' *' : ''}`}
        </MDTypography>
      )}
      <MDEditor
        modules={{
          toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ script: 'sub' }, { script: 'super' }],
            [{ indent: '-1' }, { indent: '+1' }],
            [{ align: [] }],
            ['link', 'image'],
            ['clean'],
          ],
          ...modules,
        }}
        onChange={(newValue) => {
          if (!forceValue) {
            setValue(name, newValue, {
              shouldValidate: false,
              shouldDirty: true,
            });
          }
          setCurValue(newValue);
          onChange && onChange(newValue);
        }}
        quillRef={quillRef}
        value={curValue}
      />
      {errorMessage && (
        <MDBox mt={0.6}>
          <MDTypography
            component="div"
            variant="caption"
            color="error"
            fontWeight="regular"
          >
            {errorMessage}
          </MDTypography>
        </MDBox>
      )}
    </MDBox>
  );
}

HtmlEditorFormItem.defaultProps = {
  forceValue: false,
  hideLabel: false,
  required: false,
};

HtmlEditorFormItem.propTypes = {
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  externalErrorMessage: PropTypes.string,
  forceValue: PropTypes.bool,
  hideLabel: PropTypes.bool,
  hint: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  modules: PropTypes.any,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  prefix: PropTypes.string,
  quillRef: PropTypes.any,
  required: PropTypes.bool,
  rerender: PropTypes.number,
  shrink: PropTypes.bool,
  value: PropTypes.string,
};

export default HtmlEditorFormItem;

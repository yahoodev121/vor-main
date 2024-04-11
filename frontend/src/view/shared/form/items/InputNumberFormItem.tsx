import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';
import FormErrors from 'src/view/shared/form/formErrors';
import formSelectors from 'src/modules/form/formSelectors';
import MDBox from 'src/mui/components/MDBox';
import MDInput from 'src/mui/components/MDInput';
import MDTypography from 'src/mui/components/MDTypography';
import PropTypes from 'prop-types';

export function InputNumberFormItem(props) {
  const {
    autoComplete,
    autoFocus,
    disabled,
    endAdornment,
    externalErrorMessage,
    forceValue,
    fullWidth,
    hint,
    id,
    label,
    margin,
    max,
    min,
    name,
    onBlur,
    onChange,
    placeholder,
    required,
    rerender,
    shrink,
    size,
    startAdornment,
    step,
    type,
    value,
    variant,
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

  const formValue = getValues(name);

  const getInitialValue = () =>
    ![null, undefined].includes(formValue)
      ? formValue
      : value || defaultValues[name] || '';

  const [curValue, setCurValue] = useState(
    getInitialValue(),
  );

  if (forceValue) {
    setValue(name, value, {
      shouldValidate: false,
      shouldDirty: true,
    });
  }

  useEffect(() => {
    register({ name });
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
    <>
      <MDInput
        autoComplete={autoComplete || undefined}
        autoFocus={autoFocus || undefined}
        disabled={disabled}
        error={Boolean(errorMessage)}
        fullWidth
        helperText={hint}
        id={name}
        InputLabelProps={{ shrink: shrink }}
        InputProps={{ startAdornment, endAdornment }}
        inputProps={{
          max,
          min,
          name,
          step,
        }}
        label={label}
        margin={margin}
        name={name}
        onBlur={(event) => {
          onBlur && onBlur(event);
        }}
        onChange={(event) => {
          const newValue = Number(event.target.value);
          if (!forceValue) {
            setValue(name, newValue, {
              shouldValidate: false,
              shouldDirty: true,
            });
          }
          setCurValue(newValue);
          onChange && onChange(newValue);
        }}
        placeholder={placeholder || undefined}
        // inputRef={register}
        required={required}
        size={size}
        type={type}
        value={Number(curValue)}
        variant={variant}
      />
      {errorMessage && (
        <MDBox mt={0.6}>
          <MDTypography
            color="error"
            component="div"
            fontWeight="regular"
            variant="caption"
          >
            {errorMessage}
          </MDTypography>
        </MDBox>
      )}
    </>
  );
}

InputNumberFormItem.defaultProps = {
  forceValue: false,
  required: false,
  step: 1,
  type: 'number',
};

InputNumberFormItem.propTypes = {
  autoComplete: PropTypes.string,
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  endAdornment: PropTypes.any,
  externalErrorMessage: PropTypes.string,
  forceValue: PropTypes.bool,
  fullWidth: PropTypes.bool,
  hint: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  margin: PropTypes.string,
  max: PropTypes.number,
  min: PropTypes.number,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  prefix: PropTypes.string,
  required: PropTypes.bool,
  rerender: PropTypes.number,
  shrink: PropTypes.bool,
  size: PropTypes.string,
  startAdornment: PropTypes.any,
  step: PropTypes.number,
  type: PropTypes.string,
  value: PropTypes.number,
  variant: PropTypes.string,
};

export default InputNumberFormItem;

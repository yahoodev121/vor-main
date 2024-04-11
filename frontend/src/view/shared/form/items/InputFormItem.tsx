import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';
import FormErrors from 'src/view/shared/form/formErrors';
import formSelectors from 'src/modules/form/formSelectors';
import MDBox from 'src/mui/components/MDBox';
import MDInput from 'src/mui/components/MDInput';
import MDTypography from 'src/mui/components/MDTypography';
import PropTypes from 'prop-types';

export const InputFormItem = forwardRef(
  (props: any, ref) => {
    const {
      autoComplete,
      autoFocus,
      disabled,
      endAdornment,
      externalErrorMessage,
      forceValue,
      fullWidth,
      hideLabel,
      hint,
      id,
      label,
      margin,
      name,
      onBlur,
      onChange,
      placeholder,
      readOnly,
      required,
      rerender,
      shrink,
      size,
      startAdornment,
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

    const refresh = useSelector(
      formSelectors.selectRefresh,
    );

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

    useImperativeHandle(ref, () => ({
      get value() {
        return curValue;
      },
    }));

    return (
      <>
        <MDInput
          autoComplete={autoComplete || undefined}
          autoFocus={autoFocus || undefined}
          disabled={disabled}
          error={Boolean(errorMessage)}
          fullWidth={true}
          helperText={hint}
          id={name}
          InputLabelProps={{ shrink: shrink }}
          InputProps={{
            endAdornment,
            readOnly,
            startAdornment,
          }}
          inputProps={{ name }}
          label={hideLabel ? undefined : label}
          margin={margin}
          name={name}
          onBlur={(event) => {
            onBlur && onBlur(event);
          }}
          onChange={(event) => {
            const newValue = event.target.value;
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
          required={required}
          size={size}
          type={type}
          value={curValue}
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
  },
);

InputFormItem.defaultProps = {
  forceValue: false,
  hideLabel: false,
  readOnly: false,
  required: false,
  type: 'text',
};

InputFormItem.propTypes = {
  autoComplete: PropTypes.string,
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  endAdornment: PropTypes.any,
  externalErrorMessage: PropTypes.string,
  forceValue: PropTypes.bool,
  fullWidth: PropTypes.bool,
  hideLabel: PropTypes.bool,
  hint: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  margin: PropTypes.string,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  prefix: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  rerender: PropTypes.number,
  shrink: PropTypes.bool,
  size: PropTypes.string,
  startAdornment: PropTypes.any,
  type: PropTypes.string,
  value: PropTypes.string,
  variant: PropTypes.string,
};

export default InputFormItem;

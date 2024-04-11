import {
  RadioGroup,
  Radio,
  FormControlLabel,
} from '@mui/material';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';
import FormErrors from 'src/view/shared/form/formErrors';
import formSelectors from 'src/modules/form/formSelectors';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import PropTypes from 'prop-types';

function RadioFormItem(props) {
  const { sidenavColor, darkMode } = selectMuiSettings();
  const {
    externalErrorMessage,
    forceValue,
    hint,
    label,
    name,
    onBlur,
    onChange,
    options,
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
    <MDBox pt={1.6} position="relative">
      <MDTypography
        variant="caption"
        color={darkMode ? 'text' : 'secondary'}
        fontWeight="regular"
        lineHeight={1}
        position="absolute"
        top="0"
      >
        {label}
      </MDTypography>
      <RadioGroup
        id={name}
        name={name}
        value={curValue}
        onChange={(event) => {
          if (!forceValue) {
            setValue(name, event.target.value, {
              shouldValidate: false,
              shouldDirty: true,
            });
          }
          setCurValue(event.target.value);
          onChange && onChange(event.target.value);
        }}
        onBlur={(event) => {
          onBlur && onBlur(event);
        }}
        row
      >
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={String(option.value)}
            control={
              <Radio size="small" color={sidenavColor} />
            }
            label={option.label}
          />
        ))}
      </RadioGroup>
      {errorMessage && (
        <MDBox>
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

RadioFormItem.defaultProps = {
  forceValue: false,
  required: false,
};

RadioFormItem.propTypes = {
  externalErrorMessage: PropTypes.string,
  forceValue: PropTypes.bool,
  hint: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  options: PropTypes.array.isRequired,
  required: PropTypes.bool,
  rerender: PropTypes.number,
  value: PropTypes.string,
};

export default RadioFormItem;

import {
  FormControlLabel,
  FormHelperText,
  Switch,
} from '@mui/material';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';
import FormErrors from 'src/view/shared/form/formErrors';
import formSelectors from 'src/modules/form/formSelectors';
import PropTypes from 'prop-types';

function SwitchFormItem(props) {
  const { sidenavColor } = selectMuiSettings();

  const {
    externalErrorMessage,
    forceValue,
    hint,
    label,
    name,
    onBlur,
    onChange,
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

  const formValue = getValues(name);

  const getInitialValue = () => {
    if (formValue !== undefined && formValue !== null) {
      return formValue;
    }
    if (value !== undefined && value !== null) {
      return value;
    }
    if (
      defaultValues[name] !== undefined &&
      defaultValues[name] !== null
    ) {
      return defaultValues[name];
    }
    return false;
  };

  const [curValue, setCurValue] = useState(
    getInitialValue(),
  );

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

  const formHelperText = errorMessage || hint;

  return (
    <>
      <FormControlLabel
        control={
          <Switch
            id={name}
            name={name}
            checked={curValue}
            onChange={(e) => {
              if (!forceValue) {
                setValue(name, Boolean(e.target.checked), {
                  shouldValidate: false,
                  shouldDirty: true,
                });
              }
              setCurValue(Boolean(e.target.checked));
              onChange && onChange(e.target.checked);
            }}
            onBlur={() => onBlur && onBlur(null)}
            // inputRef={register}
            color={sidenavColor}
          />
        }
        label={label}
      />
      {formHelperText && (
        <FormHelperText style={{ marginTop: 0 }}>
          {formHelperText}
        </FormHelperText>
      )}
    </>
  );
}

SwitchFormItem.defaultProps = {
  forceValue: false,
};

SwitchFormItem.propTypes = {
  externalErrorMessage: PropTypes.string,
  forceValue: PropTypes.bool,
  hint: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  rerender: PropTypes.number,
  value: PropTypes.bool,
};

export default SwitchFormItem;

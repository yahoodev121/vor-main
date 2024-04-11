import { Autocomplete } from '@mui/material';
import { i18n } from 'src/i18n';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';
import CustomAutocomplete from 'src/view/shared/components/Autocomplete';
import FormErrors from 'src/view/shared/form/formErrors';
import formSelectors from 'src/modules/form/formSelectors';
import ListboxComponent from 'src/view/shared/form/items/ListboxComponent';
import MDBox from 'src/mui/components/MDBox';
import MDInput from 'src/mui/components/MDInput';
import MDTypography from 'src/mui/components/MDTypography';
import PropTypes from 'prop-types';

function SelectFormItem(props) {
  const {
    switchOptions,
    externalErrorMessage,
    forceValue,
    hint,
    isClearable,
    label,
    margin,
    mode,
    name,
    onBlur,
    onChange,
    options,
    placeholder,
    readOnly,
    renderInput,
    renderOption,
    renderTags,
    required,
    rerender,
    shrink,
    size,
    value: defaultValue,
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

  const formValue = name ? getValues(name) : [];

  const getInitialValue = () =>
    ![null, undefined].includes(formValue)
      ? formValue
      : defaultValue || defaultValues[name] || [];

  const [curValue, setCurValue] = useState(
    getInitialValue(),
  );

  if (forceValue && name) {
    setValue(name, defaultValue, {
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
      setCurValue(defaultValue);
    }
  }, [defaultValue]);

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

  const value = () => {
    if (mode === 'multiple') {
      return valueMultiple(curValue);
    } else {
      return valueOne(curValue);
    }
  };

  const valueMultiple = (values) => {
    if (values && Array.isArray(values)) {
      return values.map((value) =>
        options.find((option) => option.value === value),
      );
    }

    return [];
  };

  const valueOne = (value) => {
    const { options } = props;

    if (value != null) {
      return (
        options.find((option) => option.value === value) ||
        null
      );
    }

    return null;
  };

  const handleSelect = (data) => {
    if (mode === 'multiple') {
      return handleSelectMultiple(data);
    } else {
      return handleSelectOne(data);
    }
  };

  const updateCurValueAndOnChange = (newValue) => {
    setCurValue(newValue);
    setValue(name, newValue, {
      shouldValidate: false,
      shouldDirty: true,
    });
    onChange && onChange(newValue);
  };

  const handleSelectMultiple = (values) => {
    if (!values) {
      updateCurValueAndOnChange([]);
      return;
    }

    const newValue = values
      .map((data) => (data ? data.value : data))
      .filter((value) => value != null);

    updateCurValueAndOnChange(newValue);
  };

  const handleSelectOne = (data) => {
    if (!data) {
      updateCurValueAndOnChange(null);
      return;
    }

    updateCurValueAndOnChange(data.value);
  };

  const defaultRenderInput = (params) => (
    <MDInput
      {...params}
      InputLabelProps={{ shrink: shrink }}
      label={label}
      margin={margin}
      required={required}
      size={size}
      variant={variant}
    />
  );

  const fnDefaultRenderOption = (props, option) =>
    option.label;

  const exceptOptions = () => {
    if (!switchOptions) {
      return [];
    }
    const selectedValues = (
      mode === 'multiple' ? value() : [value()]
    ).filter(Boolean);
    if (!Boolean(selectedValues.length)) {
      return [];
    }
    const wereCurrentValuesIncluded = (options) =>
      options.some(
        (option) =>
          !!selectedValues.find(
            (value) => value.value === option,
          ),
      );
    if (!switchOptions.some(wereCurrentValuesIncluded)) {
      return [];
    }
    return switchOptions.filter(
      (options) => !wereCurrentValuesIncluded(options),
    );
  };

  return (
    <MDBox position="relative">
      <CustomAutocomplete>
        <Autocomplete
          disablePortal={false}
          isOptionEqualToValue={(option, value) =>
            option.value === value.value
          }
          ListboxComponent={ListboxComponent}
          loadingText={i18n('autocomplete.loading')}
          multiple={mode === 'multiple'}
          noOptionsText={i18n('autocomplete.noOptions')}
          onBlur={(event) => {
            onBlur && onBlur(event);
          }}
          onChange={(event: any, newValue: any) => {
            handleSelect(newValue);
          }}
          options={options.filter(
            (option) =>
              !exceptOptions().some((options) =>
                options.includes(option.value),
              ),
          )}
          readOnly={readOnly}
          renderInput={renderInput ?? defaultRenderInput}
          renderOption={(props, option) =>
            ({
              props,
              option,
              renderOption:
                renderOption || fnDefaultRenderOption,
            } as React.ReactNode)
          }
          renderTags={renderTags}
          value={value()}
        />
      </CustomAutocomplete>
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
    </MDBox>
  );
}

SelectFormItem.defaultProps = {
  forceValue: false,
  isClearable: true,
  readOnly: false,
  required: false,
};

SelectFormItem.propTypes = {
  externalErrorMessage: PropTypes.string,
  forceValue: PropTypes.bool,
  hint: PropTypes.string,
  isClearable: PropTypes.bool,
  label: PropTypes.string,
  margin: PropTypes.string,
  mode: PropTypes.string,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  options: PropTypes.array.isRequired,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  renderInput: PropTypes.func,
  renderOption: PropTypes.func,
  renderTags: PropTypes.func,
  required: PropTypes.bool,
  rerender: PropTypes.number,
  shrink: PropTypes.bool,
  size: PropTypes.string,
  switchOptions: PropTypes.array,
  value: PropTypes.any,
  variant: PropTypes.string,
};

export default SelectFormItem;

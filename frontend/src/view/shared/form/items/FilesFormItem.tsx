import { FormControl, FormHelperText } from '@mui/material';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';
import FilesUploader from 'src/view/shared/uploaders/FilesUploader';
import FormErrors from 'src/view/shared/form/formErrors';
import formSelectors from 'src/modules/form/formSelectors';
import MDTypography from 'src/mui/components/MDTypography';
import PropTypes from 'prop-types';

function FilesFormItem(props) {
  const { darkMode } = selectMuiSettings();

  const {
    columns,
    externalErrorMessage,
    forceValue,
    formats,
    hidePlaceholder,
    hint,
    label,
    max,
    name,
    onChange,
    required,
    rerender,
    storage,
    value,
    noTag,
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
      : value || defaultValues[name] || [];

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

  const formHelperText = errorMessage || hint;

  return (
    <FormControl
      fullWidth
      required={required}
      error={Boolean(errorMessage)}
      component="fieldset"
      size="small"
    >
      {Boolean(label) && (
        <MDTypography
          variant="caption"
          fontWeight="regular"
          color={darkMode ? 'text' : 'secondary'}
        >
          {`${label}${required ? ' *' : ''}`}
        </MDTypography>
      )}

      <FilesUploader
        columns={columns}
        formats={formats || storage.formats}
        hidePlaceholder={hidePlaceholder}
        max={max}
        onChange={(value) => {
          setCurValue(value);
          setValue(name, value, {
            shouldValidate: false,
            shouldDirty: true,
          });
          onChange && onChange(value);
        }}
        storage={storage}
        value={curValue}
        noTag={noTag}
      />

      {formHelperText && (
        <FormHelperText
          style={{ marginTop: 0, fontWeight: 400 }}
        >
          {formHelperText}
        </FormHelperText>
      )}
    </FormControl>
  );
}

FilesFormItem.defaultProps = {
  columns: 4,
  forceValue: false,
  hidePlaceholder: false,
  max: undefined,
  required: false,
};

FilesFormItem.propTypes = {
  columns: PropTypes.number,
  forceValue: PropTypes.bool,
  formats: PropTypes.any,
  formItemProps: PropTypes.object,
  hidePlaceholder: PropTypes.bool,
  hint: PropTypes.string,
  label: PropTypes.string,
  max: PropTypes.number,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  rerender: PropTypes.number,
  storage: PropTypes.object.isRequired,
  value: PropTypes.array,
  noTag: PropTypes.bool,
};

export default FilesFormItem;

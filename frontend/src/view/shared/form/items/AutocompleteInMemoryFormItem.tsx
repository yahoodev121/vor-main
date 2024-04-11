import _uniqBy from 'lodash/uniqBy';
import { Autocomplete, Box } from '@mui/material';
import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import CustomAutocomplete from 'src/view/shared/components/Autocomplete';
import FormErrors from 'src/view/shared/form/formErrors';
import formSelectors from 'src/modules/form/formSelectors';
import MDBox from 'src/mui/components/MDBox';
import MDButton from 'src/mui/components/MDButton';
import MDInput from 'src/mui/components/MDInput';
import MDTypography from 'src/mui/components/MDTypography';
import PropTypes from 'prop-types';
import ListboxComponent from 'src/view/shared/form/items/ListboxComponent';
import Spinner from 'src/view/shared/Spinner';

const AutocompleteInMemoryFormItem = (props) => {
  const { sidenavColor } = selectMuiSettings();

  const {
    autoFocus,
    createButtonIcon,
    externalErrorMessage,
    fetchFn,
    fullWidth,
    getOptionDisabled,
    groupBy,
    hasPermissionToCreate,
    hint,
    isClearable,
    label,
    mapper,
    margin,
    mode,
    name,
    onBlur,
    onChange,
    onOpenModal,
    placeholder,
    readOnly,
    renderInput,
    renderOption,
    renderTags,
    required,
    rerender,
    showCreate,
    shrink,
    size,
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

  const defaultValues = defaultValuesRef.current || null;

  const formValue = getValues(name);

  const errorMessage = FormErrors.errorMessage(
    name,
    errors,
    touched,
    isSubmitted,
    externalErrorMessage,
  );

  const originalValue = formValue || defaultValues[name];

  const [fullDataSource, setFullDataSource] = useState<
    Array<any>
  >([]);
  const [loading, setLoading] = useState(false);

  const [realValue, setRealValue] = useState(originalValue);

  useEffect(() => {
    register({ name });
  }, [register, name]);

  let dismounted = false;

  const refresh = useSelector(formSelectors.selectRefresh);

  useEffect(() => {
    const fetchAllResults = async () => {
      setLoading(true);

      try {
        let fullDataSource = props.programId
          ? await fetchFn(props.programId)
          : await fetchFn();

        if (dismounted) {
          return;
        }

        fullDataSource = fullDataSource.map((data) =>
          mapper.toAutocomplete(data),
        );

        setFullDataSource(fullDataSource);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setFullDataSource([]);
        setLoading(false);
        return [];
      }
    };

    fetchAllResults().then(() => {
      if (dismounted) {
        return;
      }
      setRealValue(
        ![null, undefined].includes(getValues(name))
          ? getValues(name)
          : defaultValues[name] || null,
      );
      onChange &&
        onChange(
          prioritizeFromDataSource(
            ![null, undefined].includes(getValues(name))
              ? getValues(name)
              : defaultValues[name] || null,
          ),
        );
    });

    return () => {
      dismounted = true;
      setLoading(false);
    };
  }, [rerender, refresh]);

  const prioritizeFromDataSource = (selected) => {
    if (!selected) {
      return selected;
    }
    return (
      (fullDataSource || []).find(
        (item) => item.value === selected.value,
      ) || selected
    );
  };

  const value = () => {
    if (mode === 'multiple') {
      return valueMultiple();
    } else {
      return valueOne();
    }
  };

  const valueMultiple = () => {
    if (realValue) {
      return realValue.map((value) =>
        prioritizeFromDataSource(
          mapper.toAutocomplete(value),
        ),
      );
    }

    return [];
  };

  const valueOne = () => {
    if (realValue) {
      return prioritizeFromDataSource(
        mapper.toAutocomplete(realValue),
      );
    }

    return null;
  };

  const handleSelect = (value) => {
    if (mode === 'multiple') {
      return handleSelectMultiple(value);
    } else {
      return handleSelectOne(value);
    }
  };

  const handleSelectMultiple = (values) => {
    if (!values) {
      setRealValue([]);
      setValue(name, [], {
        shouldValidate: false,
        shouldDirty: true,
      });
      onChange && onChange([]);
      return;
    }

    const newValue = values.map((value) =>
      mapper.toValue(value),
    );
    setRealValue(newValue);
    setValue(name, newValue, {
      shouldValidate: false,
      shouldDirty: true,
    });
    onChange && onChange(newValue);
  };

  const handleSelectOne = (value) => {
    if (!value) {
      setRealValue(null);
      setValue(name, null, {
        shouldValidate: false,
        shouldDirty: true,
      });
      onChange && onChange(null);
      return;
    }

    const newValue = mapper.toValue(value);
    setRealValue(newValue);
    setValue(name, newValue, {
      shouldValidate: false,
      shouldDirty: true,
    });
    onChange && onChange(newValue);
  };

  const options = () => {
    const { mode } = props;

    if (!fullDataSource) {
      return [];
    }

    // Includes the selected value on the options
    if (value()) {
      if (mode === 'multiple') {
        return _uniqBy(
          [...fullDataSource, ...value()],
          'value',
        );
      } else {
        return _uniqBy(
          [...fullDataSource, value()],
          'value',
        );
      }
    }

    return fullDataSource;
  };

  const hintOrLoading = loading
    ? i18n('autocomplete.loading')
    : hint;

  const fnRenderInput = renderInput
    ? renderInput
    : (params) => (
        <MDInput
          {...params}
          required={required}
          margin={margin}
          variant={variant}
          size={size}
          InputLabelProps={{
            shrink: shrink,
          }}
          label={label}
          autoFocus={autoFocus || undefined}
        />
      );

  const fnDefaultRenderOption = (props, option) =>
    option.label;

  useEffect(() => {
    if (!dismounted && onChange) {
      onChange(prioritizeFromDataSource(value() ?? null));
    }
  }, [fullDataSource]);

  const width =
    showCreate && hasPermissionToCreate
      ? 'calc(100% - 33.6px)'
      : '100%';

  return (
    <MDBox position="relative">
      <MDBox
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <MDBox minWidth={width} maxWidth={width}>
          <CustomAutocomplete>
            <Autocomplete
              disableListWrap={true}
              disablePortal={false}
              fullWidth={fullWidth}
              getOptionDisabled={getOptionDisabled}
              getOptionLabel={(option) =>
                option.label ?? ''
              }
              groupBy={groupBy}
              isOptionEqualToValue={(option, value) =>
                option.value === value.value
              }
              ListboxComponent={ListboxComponent}
              loading={loading}
              loadingText={
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'start',
                    lineHeight: 1,
                  }}
                >
                  <Spinner
                    noMargin={true}
                    size={16}
                    style={{
                      paddingRight: 8,
                      width: 'auto',
                    }}
                  />
                  <span>
                    {i18n('autocomplete.loading')}
                  </span>
                </Box>
              }
              multiple={mode === 'multiple'}
              noOptionsText={i18n('autocomplete.noOptions')}
              onBlur={() => onBlur && onBlur(null)}
              onChange={(event: any, newValue: any) => {
                handleSelect(newValue);
              }}
              options={options()}
              readOnly={readOnly}
              renderInput={fnRenderInput}
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
        </MDBox>

        {showCreate && hasPermissionToCreate ? (
          <MDButton
            variant="contained"
            color={sidenavColor}
            onClick={onOpenModal}
            size="small"
            sx={{
              marginLeft: '12.8px',
              marginTop: '12.8px',
              marginBottom: '6.4px',
              flexShrink: 0,
            }}
            circular
            iconOnly
          >
            {createButtonIcon}
          </MDButton>
        ) : null}
      </MDBox>
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
};

AutocompleteInMemoryFormItem.defaultProps = {
  createButtonIcon: <AddIcon />,
  readOnly: false,
  hasPermissionToCreate: false,
  isClearable: true,
  mode: 'default',
  required: false,
  showCreate: false,
};

AutocompleteInMemoryFormItem.propTypes = {
  autoFocus: PropTypes.bool,
  createButtonIcon: PropTypes.element,
  externalErrorMessage: PropTypes.string,
  fetchFn: PropTypes.func.isRequired,
  fullWidth: PropTypes.bool,
  getOptionDisabled: PropTypes.func,
  groupBy: PropTypes.func,
  hasPermissionToCreate: PropTypes.bool,
  hint: PropTypes.string,
  isClearable: PropTypes.bool,
  label: PropTypes.string,
  mapper: PropTypes.object.isRequired,
  margin: PropTypes.string,
  mode: PropTypes.string,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onOpenModal: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  renderInput: PropTypes.func,
  renderOption: PropTypes.func,
  renderTags: PropTypes.func,
  required: PropTypes.bool,
  rerender: PropTypes.number,
  showCreate: PropTypes.bool,
  shrink: PropTypes.bool,
  size: PropTypes.string,
  variant: PropTypes.string,
};

export default AutocompleteInMemoryFormItem;

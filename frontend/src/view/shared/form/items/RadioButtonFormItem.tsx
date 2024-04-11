import { AppBar, Tabs, Tab, styled } from '@mui/material';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';
import Colors from 'src/view/shared/theme/Colors';
import FormErrors from 'src/view/shared/form/formErrors';
import formSelectors from 'src/modules/form/formSelectors';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import PropTypes from 'prop-types';

const AppWrapper = styled('div')(
  ({ ownerState }: { ownerState: any }) => {
    const indicatorStyle: any = {};
    if (ownerState.bgColor) {
      indicatorStyle.backgroundColor = Colors(
        ownerState.bgColor,
      );
    }
    const selectedStyle: any = {};
    if (ownerState.color) {
      selectedStyle.color = `${Colors(
        ownerState.color,
      )} !important`;
    }
    return {
      '& .Mui-selected': selectedStyle,
      '& .MuiTabs-indicator': indicatorStyle,
    };
  },
);

function RadioButtonFormItem(props) {
  const { sidenavColor, darkMode } = selectMuiSettings();
  const {
    bgColor,
    color,
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
      <MDBox width="100%" overflow="auto">
        <MDBox
          minWidth={{
            xs: 'max-content',
            lg: 'unset',
          }}
          width="100%"
        >
          <AppWrapper ownerState={{ bgColor, color }}>
            <AppBar position="static">
              <Tabs
                value={
                  options.findIndex(
                    (option) => option.value === curValue,
                  ) + 1
                }
                onChange={(event, index) => {
                  const newValue =
                    options[index - 1]?.value ?? null;
                  if (!forceValue) {
                    setValue(name, newValue, {
                      shouldValidate: false,
                      shouldDirty: true,
                    });
                  }
                  setCurValue(newValue);
                  onChange && onChange(newValue);
                }}
              >
                {[{ label: '' }, ...options].map(
                  (option, index) => (
                    <Tab
                      key={`tab-${index}`}
                      label={option.label}
                      sx={
                        index
                          ? {}
                          : {
                              position: 'absolute',
                              width: 0,
                              height: 0,
                              left: '-100px',
                            }
                      }
                    />
                  ),
                )}
              </Tabs>
            </AppBar>
          </AppWrapper>
        </MDBox>
      </MDBox>
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

RadioButtonFormItem.defaultProps = {
  bgColor: null,
  color: null,
  forceValue: false,
  required: false,
};

RadioButtonFormItem.propTypes = {
  bgColor: PropTypes.string,
  color: PropTypes.string,
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

export default RadioButtonFormItem;

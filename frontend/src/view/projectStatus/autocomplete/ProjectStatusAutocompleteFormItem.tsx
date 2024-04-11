import { colorBadgeSelectFormItemRenderOption } from 'src/view/shared/form/items/ColorBadgeSelectFormItem';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';
import AutocompleteInMemoryFormItem from 'src/view/shared/form/items/AutocompleteInMemoryFormItem';
import ColorBadge from 'src/view/shared/components/ColorBadge';
import MDBox from 'src/mui/components/MDBox';
import MDInput from 'src/mui/components/MDInput';
import projectStatusEnumerators from 'src/modules/projectStatus/projectStatusEnumerators';
import ProjectStatusFormModal from 'src/view/projectStatus/form/ProjectStatusFormModal';
import ProjectStatusService from 'src/modules/projectStatus/projectStatusService';
import selectors from 'src/modules/projectStatus/projectStatusSelectors';

function ProjectStatusAutocompleteFormItem(props) {
  const {
    autoFocus,
    label,
    margin,
    mode,
    name,
    required,
    rerender: parentRerender,
    shrink,
    size,
    variant,
  } = props;

  const { setValue, getValues } = useFormContext();

  const [modalVisible, setModalVisible] = useState(false);
  const [rerender, setRerender] = useState(0);

  const hasPermissionToCreate = useSelector(
    selectors.selectPermissionToCreate,
  );

  const doCloseModal = () => {
    setModalVisible(false);
  };

  const doOpenModal = () => {
    setModalVisible(true);
  };

  const doCreateSuccess = (record) => {
    if (mode && mode === 'multiple') {
      setValue(
        name,
        [...(getValues()[name] || []), record],
        { shouldValidate: false, shouldDirty: true },
      );
    } else {
      setValue(name, record, {
        shouldValidate: false,
        shouldDirty: true,
      });
    }

    setRerender(rerender + 1);

    doCloseModal();
  };

  const fetchFn = (value, limit) => {
    return ProjectStatusService.listAutocomplete(
      value,
      limit,
    );
  };

  const colorFn = (label) =>
    projectStatusEnumerators.statusColor[
      projectStatusEnumerators.status.indexOf(label)
    ];

  const mapper = {
    toAutocomplete(originalValue) {
      if (!originalValue) {
        return null;
      }

      const value = originalValue.id;
      let label = originalValue.label;

      if (originalValue.status) {
        label = originalValue.status;
      }

      const color = colorFn(label);
      return {
        key: value,
        value,
        label,
        color,
      };
    },

    toValue(originalValue) {
      if (!originalValue) {
        return null;
      }

      return {
        id: originalValue.value,
        label: originalValue.label,
      };
    },
  };

  const renderInput = (params) => {
    const color = colorFn(params.inputProps.value);
    return (
      <>
        {color && (
          <MDBox
            display="block"
            lineHeight={0}
            position="absolute"
            mt={2.2}
          >
            <ColorBadge
              label={params.inputProps.value}
              color={color}
            />
          </MDBox>
        )}
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
          sx={{
            '& input': {
              padding: `${
                color ? '4.8px' : '3.2px'
              } 8px !important`,
              color: color
                ? 'transparent !important'
                : null,
              fontSize: color ? '0.6rem' : null,
              letterSpacing: '0.8px',
              textTransform: 'uppercase',
              fontWeight: 500,
              borderRadius: '3.2px',
            },
          }}
        />
      </>
    );
  };

  useEffect(() => {
    setRerender(rerender + 1);
  }, [parentRerender]);

  return (
    <MDBox position="relative">
      <AutocompleteInMemoryFormItem
        {...props}
        fetchFn={fetchFn}
        mapper={mapper}
        renderOption={colorBadgeSelectFormItemRenderOption}
        renderInput={renderInput}
        onOpenModal={doOpenModal}
        hasPermissionToCreate={hasPermissionToCreate}
        rerender={rerender}
      />

      {modalVisible && (
        <ProjectStatusFormModal
          onClose={doCloseModal}
          onSuccess={doCreateSuccess}
        />
      )}
    </MDBox>
  );
}

export default ProjectStatusAutocompleteFormItem;

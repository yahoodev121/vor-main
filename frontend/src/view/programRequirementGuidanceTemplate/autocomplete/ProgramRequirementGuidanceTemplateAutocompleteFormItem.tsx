import { useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import AutocompleteInMemoryFormItem from 'src/view/shared/form/items/AutocompleteInMemoryFormItem';
import ProgramRequirementGuidanceTemplateFormModal from 'src/view/programRequirementGuidanceTemplate/form/ProgramRequirementGuidanceTemplateFormModal';
import ProgramRequirementGuidanceTemplateService from 'src/modules/programRequirementGuidanceTemplate/programRequirementGuidanceTemplateService';
import selectors from 'src/modules/programRequirementGuidanceTemplate/programRequirementGuidanceTemplateSelectors';

function ProgramRequirementGuidanceTemplateAutocompleteFormItem(
  props,
) {
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
    const { name, mode } = props;

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
    return ProgramRequirementGuidanceTemplateService.listAutocomplete(
      value,
      limit,
    );
  };

  const mapper = {
    toAutocomplete(originalValue) {
      if (!originalValue) {
        return null;
      }

      const value = originalValue.id;
      let label = originalValue.label;

      if (originalValue.name) {
        label = originalValue.name;
      }

      return {
        key: value,
        value,
        label,
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

  return (
    <>
      <AutocompleteInMemoryFormItem
        {...props}
        fetchFn={fetchFn}
        mapper={mapper}
        onOpenModal={doOpenModal}
        hasPermissionToCreate={hasPermissionToCreate}
        rerender={rerender}
      />

      {modalVisible && (
        <ProgramRequirementGuidanceTemplateFormModal
          onClose={doCloseModal}
          onSuccess={doCreateSuccess}
        />
      )}
    </>
  );
}

export default ProgramRequirementGuidanceTemplateAutocompleteFormItem;

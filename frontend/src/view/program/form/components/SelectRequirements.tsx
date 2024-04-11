import { i18n } from 'src/i18n';
import { toArray } from 'src/modules/utils';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';
import formSelectors from 'src/modules/form/formSelectors';
import MDBox from 'src/mui/components/MDBox';
import ProgramRequirementTemplateListFilter from 'src/view/programRequirementTemplate/list/ProgramRequirementTemplateListFilter';
import ProgramRequirementTemplateWizardListTable from 'src/view/programRequirementTemplate/list/ProgramRequirementTemplateWizardListTable';
import StepContent from 'src/view/shared/components/StepContent';

const SelectRequirements = ({ visible = false }) => {
  const { getValues, setValue, register } =
    useFormContext();

  const formRequirements = getValues('requirements');
  const formControls = getValues('controls');

  const formRefresh = useSelector(
    formSelectors.selectRefresh,
  );

  const [requirements, setRequirements] = useState(
    formRequirements ?? [],
  );
  const [controls, setControls] = useState(
    formControls ?? {},
  );

  const doToggleSelectedRequirements = (value) => {
    const objects = toArray(value);
    if (!objects) {
      return;
    }
    const newRequirements = [...requirements];
    const newControls = { ...controls };
    objects.forEach(({ id, controlTemplates }) => {
      const exists = newRequirements.indexOf(id);
      if (exists !== -1) {
        newRequirements.splice(exists, 1);
        if (newControls[id]) {
          delete newControls[id];
        }
      } else {
        newRequirements.push(id);
        newControls[id] =
          controlTemplates?.map(({ id }) => id) ?? [];
      }
    });
    register('requirements');
    setValue('requirements', newRequirements, {
      shouldValidate: false,
      shouldDirty: true,
    });
    register('controls');
    setValue('controls', newControls, {
      shouldValidate: false,
      shouldDirty: true,
    });
    setRequirements(newRequirements);
    setControls(newControls);
  };

  const doToggleSelectedControls = (
    requirementId,
    value,
  ) => {
    const ids = toArray(value);
    if (!ids) {
      return;
    }
    const newControls = { ...controls };
    const controlGroup = newControls[requirementId] ?? [];
    ids.forEach((id) => {
      const exists = controlGroup.indexOf(id);
      if (exists !== -1) {
        controlGroup.splice(exists, 1);
      } else {
        controlGroup.push(id);
      }
    });
    newControls[requirementId] = controlGroup;
    register('controls');
    setValue('controls', newControls, {
      shouldValidate: false,
      shouldDirty: true,
    });
    setControls(newControls);
  };

  useEffect(() => {
    setRequirements(getValues('requirements') ?? []);
  }, [formRequirements, formRefresh]);

  useEffect(() => {
    setControls(getValues('controls') ?? {});
  }, [formControls, formRefresh]);

  return (
    <StepContent
      title={i18n(
        'entities.program.wizard.titles.requirements',
      )}
      visible={visible}
    >
      <ProgramRequirementTemplateListFilter
        prefix="requirement_filter_"
        withoutFormWrapper
      />
      <MDBox mx={-2.4}>
        <ProgramRequirementTemplateWizardListTable
          checkedIdsForControls={controls}
          checkedIdsForRequirements={requirements}
          onClickControlCheckBox={doToggleSelectedControls}
          onClickRequirementCheckBox={
            doToggleSelectedRequirements
          }
        />
      </MDBox>
    </StepContent>
  );
};

export default SelectRequirements;

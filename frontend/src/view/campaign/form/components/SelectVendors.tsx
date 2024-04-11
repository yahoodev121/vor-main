import { i18n } from 'src/i18n';
import { toArray } from 'src/modules/utils';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';
import formSelectors from 'src/modules/form/formSelectors';
import MDBox from 'src/mui/components/MDBox';
import StepContent from 'src/view/shared/components/StepContent';
import VendorListFilter from 'src/view/vendor/list/VendorListFilter';
import VendorListTable from 'src/view/vendor/list/VendorListTable';

const SelectVendors = ({ visible = false }) => {
  const { getValues, setValue, register } =
    useFormContext();
  const formVendors = getValues('vendors');
  const formRefresh = useSelector(
    formSelectors.selectRefresh,
  );
  const [vendors, setVendors] = useState(formVendors ?? []);
  const doToggleSelected = (value) => {
    const ids = toArray(value);
    if (!ids) {
      return;
    }
    const newVendors = [...vendors];
    ids.forEach((id) => {
      const exists = newVendors.includes(id);
      if (exists) {
        newVendors.splice(newVendors.indexOf(id), 1);
      } else {
        newVendors.push(id);
      }
    });
    register('vendors');
    setValue('vendors', newVendors, {
      shouldValidate: false,
      shouldDirty: true,
    });
    setVendors(newVendors);
  };
  useEffect(() => {
    setVendors(getValues('vendors'));
  }, [formVendors, formRefresh]);
  return (
    <StepContent
      title={i18n(
        'entities.campaign.sections.selectVendors',
      )}
      visible={visible}
    >
      <VendorListFilter
        prefix="vendor_filter_"
        withoutFormWrapper
      />
      <MDBox mx={-2.4}>
        <VendorListTable
          onClickCheckBox={doToggleSelected}
          checkedIds={vendors}
        />
      </MDBox>
    </StepContent>
  );
};

export default SelectVendors;

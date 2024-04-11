import { Card } from '@mui/material';
import { i18n } from 'src/i18n';
import { useState } from 'react';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import Message from 'src/view/shared/message';
import ProgramRequirementListFilter from 'src/view/programRequirement/list/ProgramRequirementListFilter';
import ProgramRequirementListTable from 'src/view/programRequirement/list/ProgramRequirementListTable';
import ProgramRequirementListToolbar from 'src/view/programRequirement/list/ProgramRequirementListToolbar';
import RiskFormModal from 'src/view/risk/form/RiskFormModal';

function ProgramRequirementListPage(props) {
  const [visibleRiskModal, setVisibleRiskModal] =
    useState(null);

  const handleOpenCreateRisk = (args) => {
    setVisibleRiskModal(args);
  };

  const handleCloseCreateRisk = () => {
    setVisibleRiskModal(null);
  };

  const doSuccessOnNewRiskFormModal = () => {
    Message.success(i18n('entities.risk.create.success'));
    handleCloseCreateRisk();
  };

  return (
    <>
      <Card>
        <MDBox pt={2.4} px={2.4} topBorder>
          <MDBox
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
            pb={2.4}
          >
            <MDTypography variant="h3">
              {i18n(
                'entities.programRequirement.list.title',
              )}
            </MDTypography>
            <ProgramRequirementListToolbar />
          </MDBox>
          <ProgramRequirementListFilter />
        </MDBox>
        <ProgramRequirementListTable
          handleOpenCreateRisk={handleOpenCreateRisk}
        />
      </Card>
      {Boolean(visibleRiskModal) && (
        <RiskFormModal
          onClose={handleCloseCreateRisk}
          onSuccess={doSuccessOnNewRiskFormModal}
          {...visibleRiskModal}
        />
      )}
    </>
  );
}

export default ProgramRequirementListPage;

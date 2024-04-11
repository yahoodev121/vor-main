import { Card, Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import { useState } from 'react';
import CreationInfo from 'src/view/shared/view/CreationInfo';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import Message from 'src/view/shared/message';
import NoteViewItem from 'src/view/note/view/NoteViewItem';
import ProgramControlViewTable from 'src/view/programControl/view/ProgramControlViewTable';
import ProgramRequirementService from 'src/modules/programRequirement/programRequirementService';
import ProgramViewItem from 'src/view/program/view/ProgramViewItem';
import RiskFormModal from 'src/view/risk/form/RiskFormModal';
import Spinner from 'src/view/shared/Spinner';
import TagAutocompleteForm from 'src/view/tag/autocomplete/TagAutocompleteForm';
import TextViewItem from 'src/view/shared/view/TextViewItem';

function ProgramRequirementView(props) {
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

  const renderView = () => {
    const { record } = props;

    return (
      <>
        <Grid container spacing={1.6}>
          <Grid item md={8} xs={12}>
            <Card sx={{ height: '100%' }}>
              <MDBox position="relative" p={2.4} topBorder>
                <MDTypography
                  position="absolute"
                  top={0}
                  right={0}
                  p={1.6}
                  textAlign="right"
                  variant="button"
                  color="text"
                  fontWeight="bold"
                >{`# ${record.requirementID}`}</MDTypography>
                <Grid spacing={1.6} container>
                  <Grid item xs={12}>
                    <MDTypography variant="h5">
                      {record.name}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextViewItem
                      label={i18n(
                        'entities.programRequirement.fields.description',
                      )}
                      value={record.description}
                      multiline={true}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <ProgramViewItem
                      label={i18n(
                        'entities.programRequirement.fields.programs',
                      )}
                      value={record.programs}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CreationInfo record={record} />
                  </Grid>
                </Grid>
              </MDBox>
            </Card>
          </Grid>
          <Grid item lg={4} md={4} sm={12} xs={12}>
            <Grid height="100%" container>
              <Grid item xs={12} pb={1.6}>
                <Card sx={{ height: '100%' }}>
                  <MDBox p={2.4} topBorder>
                    <Grid container spacing={1.6}>
                      <Grid item xs={12}>
                        <MDTypography variant="h5">
                          {i18n(
                            'entities.programRequirement.fields.tags',
                          )}
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12}>
                        <TagAutocompleteForm
                          name="tags"
                          id={record.id}
                          handleService={
                            ProgramRequirementService.tags
                          }
                          tags={record.tags}
                        />
                      </Grid>
                    </Grid>
                  </MDBox>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Card sx={{ height: '100%' }}>
                  <MDBox p={2.4} topBorder>
                    <Grid container spacing={1.6}>
                      <Grid item xs={12}>
                        <MDTypography variant="h5">
                          {i18n(
                            'entities.programRequirement.fields.notes',
                          )}
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12}>
                        <NoteViewItem
                          label={i18n(
                            'entities.programRequirement.fields.notes',
                          )}
                          value={record.notes}
                          hiddenLabel
                        />
                      </Grid>
                    </Grid>
                  </MDBox>
                </Card>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Card sx={{ height: '100%' }}>
              <ProgramControlViewTable
                handleOpenCreateRisk={handleOpenCreateRisk}
                value={record.controls}
                requirements={[record]}
                reloading={props.reloading}
                hasAddButton={true}
              />
            </Card>
          </Grid>
        </Grid>
        {Boolean(visibleRiskModal) && (
          <RiskFormModal
            onClose={handleCloseCreateRisk}
            onSuccess={doSuccessOnNewRiskFormModal}
            {...visibleRiskModal}
          />
        )}
      </>
    );
  };

  const { record, loading } = props;

  if (loading || !record) {
    return <Spinner />;
  }

  return renderView();
}

export default ProgramRequirementView;

import { Card, Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import { useState } from 'react';
import CreationInfo from 'src/view/shared/view/CreationInfo';
import CustomViewItem from 'src/view/shared/view/CustomViewItem';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import Message from 'src/view/shared/message';
import NoteViewItem from 'src/view/note/view/NoteViewItem';
import ProgramControlViewTable from 'src/view/programControl/view/ProgramControlViewTable';
import ProgramRequirementViewTable from 'src/view/programRequirement/view/ProgramRequirementViewTable';
import ProgramService from 'src/modules/program/programService';
import ProgramStatusViewItem from 'src/view/program/view/ProgramStatusViewItem';
import RiskFormModal from 'src/view/risk/form/RiskFormModal';
import Spinner from 'src/view/shared/Spinner';
import TagAutocompleteForm from 'src/view/tag/autocomplete/TagAutocompleteForm';
import TextViewItem from 'src/view/shared/view/TextViewItem';

function ProgramView(props) {
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
                >{`# ${record.reference}`}</MDTypography>
                <Grid spacing={1.6} container>
                  <Grid item xs={12}>
                    <MDTypography variant="h3">
                      {record.name}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextViewItem
                      label={i18n(
                        'entities.program.fields.description',
                      )}
                      value={record.description}
                      multiline={true}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CustomViewItem
                      label={i18n(
                        'entities.program.fields.status',
                      )}
                      value={[record.status]}
                      render={(values) =>
                        values.map((value) => (
                          <ProgramStatusViewItem
                            key={value}
                            value={value}
                          />
                        ))
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CreationInfo record={record} />
                  </Grid>
                </Grid>
              </MDBox>
            </Card>
          </Grid>
          <Grid item md={4} xs={12}>
            <Grid height="100%" container>
              <Grid item xs={12} pb={1.6}>
                <Card sx={{ height: '100%' }}>
                  <MDBox p={2.4} topBorder>
                    <Grid container spacing={1.6}>
                      <Grid item xs={12}>
                        <MDTypography variant="h5">
                          {i18n(
                            'entities.program.fields.tags',
                          )}
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12}>
                        <TagAutocompleteForm
                          name="tags"
                          id={record.id}
                          handleService={
                            ProgramService.tags
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
                            'entities.program.fields.notes',
                          )}
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12}>
                        <NoteViewItem
                          label={i18n(
                            'entities.program.fields.notes',
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
              <ProgramRequirementViewTable
                handleOpenCreateRisk={handleOpenCreateRisk}
                value={record.requirements}
                reloading={props.reloading}
                programs={[record]}
                hasAddButton={true}
              />
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card sx={{ height: '100%' }}>
              <ProgramControlViewTable
                handleOpenCreateRisk={handleOpenCreateRisk}
                requirements={record.requirements}
                reloading={props.reloading}
                hasAddButton={true}
                programId={record.id}
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

export default ProgramView;

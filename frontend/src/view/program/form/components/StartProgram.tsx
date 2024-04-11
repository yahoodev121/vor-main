import { Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import IconCard from 'src/view/shared/components/IconCard';
import MDBox from 'src/mui/components/MDBox';
import MDButton from 'src/mui/components/MDButton';
import MDTypography from 'src/mui/components/MDTypography';
import programTemplateMetaListActions from 'src/modules/programTemplate/metaList/programTemplateMetaListActions';
import programTemplateMetaListSelectors from 'src/modules/programTemplate/metaList/programTemplateMetaListSelectors';
import PropTypes from 'prop-types';
import Spinner from 'src/view/shared/Spinner';

const ProgramTemplateCard = (props) => {
  const { sidenavColor } = selectMuiSettings();

  const {
    controls,
    description,
    icon,
    iconBgColor,
    onStart,
    requirements,
    title,
  } = props;

  return (
    <IconCard
      icon={icon || 'terminal'}
      iconBgColor={iconBgColor || 'dark'}
      title={
        <>
          {title}
          <br />
          {['requirements', 'controls']
            .filter((key) => Boolean(props[key]))
            .map((key) => (
              <MDTypography
                key={`has-entities-${key}`}
                color="text"
                fontWeight="regular"
                variant="button"
                mr={1.6}
              >
                {i18n(
                  `entities.program.wizard.start.${key}`,
                  props[key],
                )}
              </MDTypography>
            ))}
        </>
      }
    >
      <MDBox
        display="flex"
        flexDirection="column"
        height="100%"
      >
        {Boolean(description) && (
          <MDTypography
            color="text"
            fontWeight="regular"
            variant="body2"
          >
            {description}
          </MDTypography>
        )}
        <MDBox
          alignItems="end"
          display="flex"
          flexGrow={1}
          justifyContent="center"
          pb={0.8}
          pt={2.4}
        >
          <MDButton
            color={sidenavColor}
            onClick={() => onStart && onStart()}
            variant="contained"
          >
            {i18n('common.start')}
          </MDButton>
        </MDBox>
      </MDBox>
    </IconCard>
  );
};

ProgramTemplateCard.propTypes = {
  controls: PropTypes.number,
  description: PropTypes.string,
  icon: PropTypes.string,
  iconBgColor: PropTypes.string,
  onStart: PropTypes.func,
  requirements: PropTypes.number,
  title: PropTypes.string,
};

const StartProgram = (props) => {
  const dispatch = useDispatch();

  const { onSelect } = props;

  const doSelect = (id = null) => onSelect && onSelect(id);

  const loading = useSelector(
    programTemplateMetaListSelectors.selectLoading,
  );
  const hasRows = useSelector(
    programTemplateMetaListSelectors.selectHasRows,
  );
  const rows = useSelector(
    programTemplateMetaListSelectors.selectRows,
  );

  useEffect(() => {
    dispatch(programTemplateMetaListActions.doFetch());
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <MDBox p={0.8} pt={2.4}>
      <Grid container spacing={3.2}>
        <Grid item md={4} xs={12}>
          <ProgramTemplateCard
            description={i18n(
              'entities.program.wizard.start.customProgramDescription',
            )}
            onStart={doSelect}
            title={i18n(
              'entities.program.wizard.start.customProgram',
            )}
          />
        </Grid>
        {hasRows &&
          rows.map((row) => (
            <Grid
              item
              key={`program-template-card-${row.id}`}
              md={4}
              xs={12}
            >
              <ProgramTemplateCard
                controls={row.totalControlTemplates}
                description={row.description}
                onStart={() => doSelect(row.id)}
                requirements={row.totalRequirementTemplates}
                title={row.name}
              />
            </Grid>
          ))}
      </Grid>
    </MDBox>
  );
};

StartProgram.propTypes = {
  onSelect: PropTypes.func.isRequired,
};

export default StartProgram;

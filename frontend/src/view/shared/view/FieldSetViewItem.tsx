import { Grid } from '@mui/material';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import Colors from 'src/view/shared/theme/Colors';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import PropTypes from 'prop-types';

function FieldSetViewItem(props) {
  const { children, description, label, noContainer } =
    props;
  const { darkMode } = selectMuiSettings();
  const render = () => (
    <Grid spacing={1.6} container>
      {(label || description) && (
        <Grid item xs={12}>
          <MDBox
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
          >
            <MDTypography
              variant="h6"
              color="text"
              textTransform="capitalize"
              mr={1.6}
            >
              {label}
            </MDTypography>
            <MDTypography
              variant="caption"
              color="text"
              fontWeight="regular"
            >
              {description}
            </MDTypography>
          </MDBox>
        </Grid>
      )}
      <Grid item xs={12}>
        {children}
      </Grid>
    </Grid>
  );
  return noContainer ? (
    render()
  ) : (
    <MDBox
      p={2.4}
      border={`1px solid ${Colors(
        'inputBorderColor',
        darkMode ? 0.6 : null,
      )}`}
      borderRadius="md"
    >
      {render()}
    </MDBox>
  );
}

FieldSetViewItem.defaultProps = {
  noContainer: false,
};

FieldSetViewItem.propTypes = {
  children: PropTypes.node,
  label: PropTypes.string,
  description: PropTypes.string,
  noContainer: PropTypes.bool,
};

export default FieldSetViewItem;

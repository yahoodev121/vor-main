import { Accordion, AccordionDetails } from '@mui/material';
import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useState } from 'react';
import MDBox from 'src/mui/components/MDBox';
import MDButton from 'src/mui/components/MDButton';
import MDTypography from 'src/mui/components/MDTypography';
import PropTypes from 'prop-types';

function AccordionButton(props) {
  const { children, label, bgWhite } = props;
  const [isExpanded, setIsExpanded] = useState(
    props.isExpanded || false,
  );
  const { sidenavColor } = selectMuiSettings();

  const handleButtonClick = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <MDBox sx={{ width: '100%', my: 1 }}>
      <Accordion
        expanded={isExpanded}
        sx={
          bgWhite
            ? { backgroundColor: 'white' }
            : { backgroundColor: 'inherit' }
        }
      >
        <MDBox sx={{ height: 45 }}>
          <MDTypography
            variant="h6"
            color="text"
            sx={{ px: 2, py: 1.6 }}
          >
            {label}
          </MDTypography>
          <MDButton
            variant="gradient"
            color={sidenavColor}
            onClick={handleButtonClick}
            sx={{
              position: 'absolute',
              bottom: 0,
              left: '50%',
              transform: 'translateX(-50%) translateY(50%)',
              zIndex: 1,
            }}
          >
            {isExpanded
              ? i18n('common.hide')
              : i18n('common.show')}
          </MDButton>
        </MDBox>
        <AccordionDetails sx={{ pt: 0, pb: 4 }}>
          {children}
        </AccordionDetails>
      </Accordion>
    </MDBox>
  );
}

AccordionButton.defaultProps = {
  label: i18n('common.links'),
  isExpanded: false,
  bgWhite: false,
};

AccordionButton.propTypes = {
  children: PropTypes.node,
  label: PropTypes.string,
  isExpanded: PropTypes.bool,
  bgWhite: PropTypes.bool,
};

export default AccordionButton;

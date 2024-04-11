import React, { useState } from 'react';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import { makeStyles } from '@mui/styles';
import MailIcon from '@mui/icons-material/Mail';
import { Theme } from '@mui/material/styles';
import MDBadge from 'src/mui/components/MDBadge';
import PropTypes from 'prop-types';

function HorizontalAccordion(props) {
  const { children, badgeColor, title, length } = props;
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const classes = useStyles({ hovered });

  if (length) {
    return (
      <MDBadge
        badgeContent={length}
        circular
        color="success"
        size="xs"
        paddingLeft={-8}
        variant="outlined"
      >
        <MDBox
          className={classes.root}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <MDBox className={classes.summaryContent}>
            <MDTypography
              color="info"
              sx={{ fontWeight: 500 }}
            >
              {title}
            </MDTypography>
          </MDBox>
          <MDBox className={classes.details}>
            {children}
          </MDBox>
        </MDBox>
      </MDBadge>
    );
  }

  return (
    <MDBox
      className={classes.root}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <MDBox className={classes.summaryContent}>
        <MDTypography color="info" sx={{ fontWeight: 500 }}>
          {title}
        </MDTypography>
      </MDBox>
      <MDBox className={classes.details}>{children}</MDBox>
    </MDBox>
  );
}

const useStyles: any = makeStyles((theme: Theme) => {
  const { borders, palette } = theme;

  const { borderWidth } = borders;

  return {
    root: {
      border: `${borderWidth[2]} solid ${palette['info'].main}`,
      borderRadius: 5,
      margin: theme.spacing(0.5, 0.8),
      padding: theme.spacing(0.6, 2),
      minHeight: (props: { hovered: boolean }) =>
        props.hovered ? 60 : 30,
      minWidth: (props: { hovered: boolean }) =>
        props.hovered ? 150 : 50,
      maxWidth: (props: { hovered: boolean }) =>
        props.hovered ? 1000 : 200,
      transition:
        'min-width 0.1s ease-in-out, max-width 0.6s ease-in-out, min-height 0.5s ease-in-out',
    },
    summaryContent: {
      display: 'flex',
      justifyContent: 'center',
    },
    details: {
      display: (props: { hovered: boolean }) =>
        props.hovered ? 'block' : 'none',
    },
  };
});

HorizontalAccordion.defaultProps = {
  badgeColor: 'info',
  title: '',
  length: 0,
};

HorizontalAccordion.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  badgeColor: PropTypes.string,
  length: PropTypes.number,
};

export default HorizontalAccordion;

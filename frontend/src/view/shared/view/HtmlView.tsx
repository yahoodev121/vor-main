import 'react-quill/dist/quill.snow.css';
import { styled } from '@mui/material/styles';
import Colors from 'src/view/shared/theme/Colors';
import MDBox from 'src/mui/components/MDBox';
import parse from 'html-react-parser';
import PropTypes from 'prop-types';

const HtmlStyled = styled('div')(() => ({
  fontSize: '0.8rem',
  fontWeight: 400,
  '& a, a:hover': {
    color: Colors('info'),
    textDecoration: 'underline',
  },
}));

export const HtmlViewWrapper = ({ children }) => {
  return (
    <MDBox
      className="ql-editor"
      color="text"
      sx={{
        padding: '0 !important',
      }}
    >
      <HtmlStyled>{children}</HtmlStyled>
    </MDBox>
  );
};

function HtmlView({ value }) {
  return <HtmlViewWrapper>{parse(value)}</HtmlViewWrapper>;
}

HtmlView.propTypes = {
  value: PropTypes.any.isRequired,
};

export default HtmlView;

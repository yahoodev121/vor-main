import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import Colors from 'src/view/shared/theme/Colors';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

const BorderedCardButton = (props) => {
  const { sidenavColor } = selectMuiSettings();
  const { content, title, innerTitle, onClick, selected } =
    props;
  const renderTitle = () => (
    <MDTypography
      variant="body2"
      color="text"
      fontWeight="bold"
      textAlign="center"
    >
      {title}
    </MDTypography>
  );
  return (
    <MDBox
      onClick={() => onClick && onClick()}
      sx={{ cursor: 'pointer' }}
    >
      <MDBox
        bgColor={selected ? sidenavColor : 'transparent'}
        border={`2px solid ${Colors(sidenavColor)}`}
        borderRadius="lg"
        p={2.4}
        width="100%"
      >
        <MDBox display="flex" justifyContent="center">
          <MDBox
            color={selected ? 'white' : sidenavColor}
            lineHeight={1}
          >
            {content}
          </MDBox>
        </MDBox>
        {title && innerTitle && renderTitle()}
      </MDBox>
      {title && !innerTitle && renderTitle()}
    </MDBox>
  );
};

BorderedCardButton.defaultProps = {
  innerTitle: false,
  selected: false,
  title: null,
};

export default BorderedCardButton;

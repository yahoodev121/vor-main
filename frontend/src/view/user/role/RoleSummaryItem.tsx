import { i18n } from 'src/i18n';
import Colors from 'src/view/shared/theme/Colors';
import MaterialLink from '@mui/material/Link';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import PropTypes from 'prop-types';
import timelineItem from 'src/mui/shared/Timeline/TimelineItem/styles';

const RoleSummaryItem = (props) => {
  const {
    color,
    count,
    darkMode,
    doSelect,
    firstItem,
    icon,
    lastItem,
    role,
  } = props;

  return (
    <MDBox
      position="relative"
      mt={firstItem ? 2.4 : 0}
      mb={lastItem ? 0 : 1.6}
      sx={(theme: any) =>
        timelineItem(theme, {
          lastItem,
          isDark: darkMode,
        })
      }
    >
      <MDBox
        display="flex"
        justifyContent="center"
        alignItems="center"
        bgColor={Colors(color)}
        color="white"
        width="1.6rem"
        height="1.6rem"
        borderRadius="50%"
        position="absolute"
        top="0.25rem"
        left="1.6px"
        zIndex={2}
        sx={{
          fontSize: ({ typography: { size } }: any) =>
            size.xl,
        }}
      >
        {icon}
      </MDBox>
      <MDBox
        display="flex"
        flexDirection="column"
        pt="0.25rem"
        ml={4.6}
        lineHeight={0}
        maxWidth="100%"
      >
        <MDTypography
          variant="body2"
          fontWeight="bold"
          sx={{
            maxWidth: '100%',
            display: 'inline-block',
            whiteSpace: 'break-spaces',
          }}
          lineHeight="1.6rem"
        >
          <MaterialLink
            underline="hover"
            onClick={() => doSelect && doSelect(role)}
            sx={{
              cursor: 'pointer',
            }}
          >
            {i18n(`roles.${role}.label`)}
          </MaterialLink>
        </MDTypography>
        <MDTypography
          variant="caption"
          fontWeight="regular"
          color="text"
        >
          {i18n('role.labels.users', count ?? 0)}
        </MDTypography>
      </MDBox>
    </MDBox>
  );
};

RoleSummaryItem.propTypes = {
  color: PropTypes.string,
  count: PropTypes.number,
  darkMode: PropTypes.bool,
  doSelect: PropTypes.func,
  firstItem: PropTypes.bool,
  icon: PropTypes.any,
  lastItem: PropTypes.bool,
  role: PropTypes.string,
};

export default RoleSummaryItem;

import { Link } from 'react-router-dom';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { toSafeArray } from 'src/modules/utils';
import { useSelector } from 'react-redux';
import ColorBadge from 'src/view/shared/components/ColorBadge';
import MaterialLink from '@mui/material/Link';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import NoViewItem from 'src/view/shared/view/NoViewItem';
import PropTypes from 'prop-types';
import selectors from 'src/modules/programControl/programControlSelectors';

function ProgramControlViewItem(props) {
  const { hiddenLabel, label, value } = props;

  const safeValue = toSafeArray(value);

  const { darkMode } = selectMuiSettings();

  const hasPermissionToRead = useSelector(
    selectors.selectPermissionToRead,
  );

  const displayableRecord = (record) => {
    if (hasPermissionToRead) {
      return (
        <MDBox key={record.id}>
          <MaterialLink
            component={Link}
            to={`/program-control/${record.id}`}
          >
            <ColorBadge label={record.name} />
          </MaterialLink>
        </MDBox>
      );
    }

    return (
      <MDBox key={record.id}>
        <ColorBadge label={record.name} />
      </MDBox>
    );
  };

  if (!safeValue.length) {
    return <NoViewItem {...props} />;
  }

  return (
    <MDBox
      pt={hiddenLabel || !Boolean(label) ? 0 : 1.6}
      position="relative"
    >
      {!hiddenLabel && Boolean(label) && (
        <MDTypography
          variant="caption"
          color={darkMode ? 'text' : 'secondary'}
          fontWeight="regular"
          lineHeight={1}
          position="absolute"
          top="0"
        >
          {label}
        </MDTypography>
      )}
      <MDBox
        display="inline-flex"
        flexWrap="wrap"
        gap={0.8}
      >
        {safeValue.map((v) => displayableRecord(v))}
      </MDBox>
    </MDBox>
  );
}

ProgramControlViewItem.defaultProps = {
  hiddenLabel: false,
};

ProgramControlViewItem.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
  hiddenLabel: PropTypes.bool,
};

export default ProgramControlViewItem;

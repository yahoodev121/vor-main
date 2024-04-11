import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import FilesUploader from 'src/view/shared/uploaders/FilesUploader';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import NoViewItem from 'src/view/shared/view/NoViewItem';
import PropTypes from 'prop-types';

function FilesViewItem(props) {
  const { columns, hiddenLabel, label, value } = props;
  const { darkMode } = selectMuiSettings();

  const valueAsArray = () => {
    if (!value) {
      return [];
    }

    if (Array.isArray(value)) {
      return value;
    }

    return [value];
  };

  if (!valueAsArray().length) {
    return <NoViewItem {...props} />;
  }

  return (
    <MDBox pt={hiddenLabel ? 0 : 1.6} position="relative">
      {!hiddenLabel && (
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
      <FilesUploader
        columns={columns}
        readonly={true}
        value={valueAsArray()}
      />
    </MDBox>
  );
}

FilesViewItem.defaultProps = {
  columns: 4,
  hiddenLabel: false,
};

FilesViewItem.propTypes = {
  columns: PropTypes.number,
  hiddenLabel: PropTypes.bool,
  label: PropTypes.string,
  value: PropTypes.any,
};

export default FilesViewItem;

import { Avatar } from '@mui/material';
import {
  getUserAvatar,
  getUserNameOrEmailPrefix,
} from 'src/modules/utils';
import { i18n } from 'src/i18n';
import { Link } from 'react-router-dom';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useSelector } from 'react-redux';
import MaterialLink from '@mui/material/Link';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import PropTypes from 'prop-types';
import selectors from 'src/modules/user/userSelectors';

function UserViewItem(props) {
  const { darkMode } = selectMuiSettings();
  const hasPermissionToRead = useSelector(
    selectors.selectPermissionToRead,
  );
  const { value, hiddenLabel } = props;

  const valueAsArray = () => {
    if (!value) {
      return [];
    }

    if (Array.isArray(value)) {
      return value;
    }

    return [value];
  };

  const values = valueAsArray();

  const label = (record) =>
    getUserNameOrEmailPrefix(record);

  const avatar = (record) => {
    return (
      <Avatar
        src={getUserAvatar(record)}
        sx={{ width: 24, height: 24 }}
      />
    );
  };

  const renderUser = (record, italic = false) => (
    <MDBox display="flex" alignItems="center" gap={0.8}>
      {avatar(record)}
      <MDTypography
        variant="button"
        fontWeight="regular"
        fontStyle={italic ? 'italic' : null}
        textTransform="capitalize"
        width="max-content"
      >
        {label(record)}
      </MDTypography>
    </MDBox>
  );

  const readOnly = (record, italic = false) => {
    return <MDBox>{renderUser(record, italic)}</MDBox>;
  };

  const DisplayableRecord = ({ value: record }) => {
    if (hasPermissionToRead) {
      return (
        <MDBox>
          <MaterialLink
            component={Link}
            to={`/user/${record.id}`}
          >
            {renderUser(record)}
          </MaterialLink>
        </MDBox>
      );
    }

    return readOnly(record);
  };

  return (
    <MDBox pt={1.6} position="relative">
      {!hiddenLabel && (
        <MDTypography
          variant="caption"
          color={darkMode ? 'text' : 'secondary'}
          fontWeight="regular"
          lineHeight={1}
          position="absolute"
          top="0"
        >
          {props.label}
        </MDTypography>
      )}
      <MDBox
        display="inline-flex"
        flexWrap="wrap"
        gap={0.8}
      >
        {!!values.length &&
          values.map((value) => (
            <DisplayableRecord
              key={`key-$(value.id)`}
              value={value}
            />
          ))}
        {!values.length &&
          readOnly(
            {
              email: i18n(
                'customViewer.noData',
                props.label,
              ),
            },
            true,
          )}
      </MDBox>
    </MDBox>
  );
}

UserViewItem.defaultProps = {
  hiddenLabel: false,
};

UserViewItem.propTypes = {
  hiddenLabel: PropTypes.bool,
  label: PropTypes.string,
  value: PropTypes.any,
};

export default UserViewItem;

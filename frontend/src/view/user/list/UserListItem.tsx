import { Avatar } from '@mui/material';
import {
  getUserAvatar,
  getUserNameOrEmailPrefix,
} from 'src/modules/utils';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MaterialLink from '@mui/material/Link';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import PropTypes from 'prop-types';
import selectors from 'src/modules/user/userSelectors';

function UserListItem(props) {
  const hasPermissionToRead = useSelector(
    selectors.selectPermissionToRead,
  );

  const valueAsArray = () => {
    const { value } = props;

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

  const { flexDirection } = props;

  return (
    <MDBox
      display="inline-flex"
      flexDirection={flexDirection}
      flexWrap="wrap"
      gap={0.8}
    >
      {!!values.length &&
        values.map((value) => (
          <DisplayableRecord
            key={`user-${value.id}`}
            value={value}
          />
        ))}
    </MDBox>
  );
}

UserListItem.defaultProps = {
  flexDirection: 'column',
};

UserListItem.propTypes = {
  value: PropTypes.any,
  flexDirection: PropTypes.string,
};

export default UserListItem;

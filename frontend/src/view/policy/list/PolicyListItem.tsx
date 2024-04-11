import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MaterialLink from '@mui/material/Link';
import MDTypography from 'src/mui/components/MDTypography';
import PropTypes from 'prop-types';
import selectors from 'src/modules/policy/policySelectors';

function PolicyListItem(props) {
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

  const displayableRecord = (record) => {
    if (hasPermissionToRead) {
      return (
        <div key={record.id}>
          <MaterialLink
            component={Link}
            to={`/policy/${record.id}`}
          >
            <MDTypography
              variant="button"
              color="text"
              fontWeight="regular"
            >
              {record.name}
            </MDTypography>
          </MaterialLink>
        </div>
      );
    }

    return (
      <div key={record.id}>
        <MDTypography
          variant="button"
          color="text"
          fontWeight="regular"
        >
          {record.name}
        </MDTypography>
      </div>
    );
  };

  if (!valueAsArray().length) {
    return null;
  }

  return (
    <>
      {valueAsArray().map((value) =>
        displayableRecord(value),
      )}
    </>
  );
}

PolicyListItem.propTypes = {
  value: PropTypes.any,
};

export default PolicyListItem;

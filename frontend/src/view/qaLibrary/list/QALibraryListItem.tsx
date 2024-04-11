import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import MaterialLink from '@mui/material/Link';
import { useSelector } from 'react-redux';
import selectors from 'src/modules/qaLibrary/qaLibrarySelectors';
import MDBox from 'src/mui/components/MDBox';

function QALibraryListItem(props) {
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
        <MDBox key={record.id}>
          <MaterialLink
            component={Link}
            to={`/qalibrary/${record.id}`}
          >
            {record.question}
          </MaterialLink>
        </MDBox>
      );
    }

    return (
      <MDBox key={record.id}>
        {record.question}
      </MDBox>
    );
  };

  if (!valueAsArray().length) {
    return null;
  }

  return (
    <MDBox display="inline-flex" flexWrap="wrap" gap={0.8}>
      {valueAsArray().map((value) =>
        displayableRecord(value),
      )}
    </MDBox>
  );
}

QALibraryListItem.propTypes = {
  value: PropTypes.any,
};

export default QALibraryListItem;

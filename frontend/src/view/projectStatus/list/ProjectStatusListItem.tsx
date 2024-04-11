import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ColorBadge from 'src/view/shared/components/ColorBadge';
import MaterialLink from '@mui/material/Link';
import MDBox from 'src/mui/components/MDBox';
import projectStatusEnumerators from 'src/modules/projectStatus/projectStatusEnumerators';
import PropTypes from 'prop-types';
import selectors from 'src/modules/projectStatus/projectStatusSelectors';

function ProjectStatusListItem(props) {
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

  const colorFn = (status) =>
    projectStatusEnumerators.statusColor[
      projectStatusEnumerators.status.indexOf(status)
    ];

  const renderStatus = (status) => {
    const color = colorFn(status);
    return <ColorBadge label={status} color={color} />;
  };

  const displayableRecord = (record) => {
    if (hasPermissionToRead) {
      return (
        <MDBox key={record.id}>
          <MaterialLink
            component={Link}
            to={`/project-status/${record.id}`}
          >
            {renderStatus(record.status)}
          </MaterialLink>
        </MDBox>
      );
    }

    return (
      <MDBox key={record.id}>
        {renderStatus(record.status)}
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

ProjectStatusListItem.propTypes = {
  value: PropTypes.any,
};

export default ProjectStatusListItem;

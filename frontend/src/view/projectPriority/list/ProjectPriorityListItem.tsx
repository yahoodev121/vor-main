import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ColorBadge from 'src/view/shared/components/ColorBadge';
import MaterialLink from '@mui/material/Link';
import MDBox from 'src/mui/components/MDBox';
import projectPriorityEnumerators from 'src/modules/projectPriority/projectPriorityEnumerators';
import PropTypes from 'prop-types';
import selectors from 'src/modules/projectPriority/projectPrioritySelectors';

function ProjectPriorityListItem(props) {
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

  const colorFn = (priority) =>
    projectPriorityEnumerators.priorityColor[
      projectPriorityEnumerators.priority.indexOf(priority)
    ];

  const renderPriority = (priority) => {
    const color = colorFn(priority);
    return <ColorBadge label={priority} color={color} />;
  };

  const displayableRecord = (record) => {
    if (hasPermissionToRead) {
      return (
        <MDBox key={record.id}>
          <MaterialLink
            component={Link}
            to={`/project-priority/${record.id}`}
          >
            {renderPriority(record.priority)}
          </MaterialLink>
        </MDBox>
      );
    }

    return (
      <MDBox key={record.id}>
        {renderPriority(record.priority)}
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

ProjectPriorityListItem.propTypes = {
  value: PropTypes.any,
};

export default ProjectPriorityListItem;

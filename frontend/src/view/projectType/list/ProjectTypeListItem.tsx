import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ColorBadge from 'src/view/shared/components/ColorBadge';
import MaterialLink from '@mui/material/Link';
import MDBox from 'src/mui/components/MDBox';
import projectTypeEnumerators from 'src/modules/projectType/projectTypeEnumerators';
import PropTypes from 'prop-types';
import selectors from 'src/modules/projectType/projectTypeSelectors';

function ProjectTypeListItem(props) {
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

  const colorFn = (type) =>
    projectTypeEnumerators.typeColor[
      projectTypeEnumerators.type.indexOf(type)
    ];

  const renderType = (type) => {
    const color = colorFn(type);
    return <ColorBadge label={type} color={color} />;
  };

  const displayableRecord = (record) => {
    if (hasPermissionToRead) {
      return (
        <MDBox key={record.id}>
          <MaterialLink
            component={Link}
            to={`/project-type/${record.id}`}
          >
            {renderType(record.type)}
          </MaterialLink>
        </MDBox>
      );
    }

    return (
      <MDBox key={record.id}>
        {renderType(record.type)}
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

ProjectTypeListItem.propTypes = {
  value: PropTypes.any,
};

export default ProjectTypeListItem;

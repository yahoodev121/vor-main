import ColorBadge from 'src/view/shared/components/ColorBadge';
import MaterialLink from '@mui/material/Link';
import PropTypes from 'prop-types';

function HighlightListItem(props) {
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
    return (
      <div key={record.id}>
        <MaterialLink href={record.source} target="_blank">
          <ColorBadge label={record.title} />
        </MaterialLink>
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

HighlightListItem.propTypes = {
  value: PropTypes.any,
};

export default HighlightListItem;

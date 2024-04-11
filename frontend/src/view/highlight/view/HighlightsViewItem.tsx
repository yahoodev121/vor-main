import PropTypes from 'prop-types';
import HighlightListPage from 'src/view/highlight/list/HighlightListPage';

const HighlightsViewItem = (props) => {
  const { ownerClient, ownerVendor } = props;
  return (
    <HighlightListPage
      additionalFilters={{
        client: ownerClient,
        vendor: ownerVendor,
      }}
      doAsSubComponent={true}
    />
  );
};

HighlightsViewItem.prototype = {
  ownerClient: PropTypes.string,
  ownerVendor: PropTypes.string,
};

export default HighlightsViewItem;

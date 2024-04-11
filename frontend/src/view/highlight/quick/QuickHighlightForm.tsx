import {
  createRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { i18n } from 'src/i18n';
import { MD5 } from 'object-hash';
import { useDispatch, useSelector } from 'react-redux';
import actions from 'src/modules/highlight/quick/highlightQuickActions';
import ConfirmModal from 'src/view/shared/modals/ConfirmModal';
import highlightDestroyActions from 'src/modules/highlight/destroy/highlightDestroyActions';
import highlightQuickActions from 'src/modules/highlight/quick/highlightQuickActions';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import PropTypes from 'prop-types';
import QuickHighlightItem from 'src/view/highlight/quick/QuickHighlightItem';
import selectors from 'src/modules/highlight/quick/highlightQuickSelectors';
import Spinner from 'src/view/shared/Spinner';

const QuickHighlightForm = forwardRef((props: any, ref) => {
  const { fileId, onClickHighlight } = props;

  const dispatch = useDispatch();

  const [dispatched, setDispatched] = useState(false);

  const [indexToDestroy, setIndexToDestroy] =
    useState(null);

  const loading = useSelector(selectors.selectInitLoading);

  const saveLoading = useSelector(
    selectors.selectSaveLoading,
  );

  const hasRows = useSelector(
    selectors.selectHasHighlights,
  );

  const rows =
    useSelector(selectors.selectHighlights) ?? [];

  const [itemRefs, setItemRefs] = useState([]);

  useEffect(() => {
    if (!dispatched) {
      dispatch(actions.doInit(fileId));
    }
    setDispatched(true);
  }, [dispatch]);

  useEffect(() => {
    setItemRefs((itemRefs) =>
      Array(rows.length)
        .fill(null)
        .map((_, i) => itemRefs[i] || createRef()),
    );
  }, [rows.length]);

  const doDestroy = () => {
    const highlight = rows[indexToDestroy];
    itemRefs.splice(indexToDestroy, 1);
    setItemRefs([...itemRefs]);
    dispatch(
      highlightQuickActions.doDeleteQuickHighlight(
        indexToDestroy,
      ),
    );
    Boolean(highlight.id) &&
      dispatch(
        highlightDestroyActions.doDestroy(highlight.id),
      );
    doCloseDestroyConfirmModal();
  };

  const doCloseDestroyConfirmModal = () => {
    setIndexToDestroy(null);
  };

  useImperativeHandle(ref, () => ({
    doSave: async () => {
      if (saveLoading) {
        return;
      }
      const highlights = [];
      for (const itemRef of itemRefs) {
        highlights.push(await itemRef.current?.getValues());
      }
      if (highlights.some((hl) => !hl)) {
        return;
      }
      dispatch(actions.doQuick(fileId, highlights));
    },
  }));

  return (
    <>
      <MDBox height="100%" overflow="auto">
        {(!dispatched || loading) && <Spinner />}
        {dispatched && !loading && hasRows && (
          <MDBox
            display="flex"
            flexDirection="column"
            gap={1.6}
            p={0.8}
          >
            {rows.map((row, index) => {
              return (
                <QuickHighlightItem
                  key={`quick-highlight-item-${MD5(row)}`}
                  index={index}
                  onClick={onClickHighlight}
                  onDelete={setIndexToDestroy}
                  ref={itemRefs[index]}
                  value={row}
                />
              );
            })}
          </MDBox>
        )}
        {dispatched && !loading && !hasRows && (
          <MDTypography align="center">
            {i18n('entities.highlight.placeholders.noData')}
          </MDTypography>
        )}
      </MDBox>
      {saveLoading && <Spinner overlap={true} />}
      {indexToDestroy !== null && (
        <ConfirmModal
          title={i18n('common.areYouSure')}
          onConfirm={() => doDestroy()}
          onClose={() => doCloseDestroyConfirmModal()}
          okText={i18n('common.yes')}
          cancelText={i18n('common.no')}
        />
      )}
    </>
  );
});

QuickHighlightForm.propTypes = {
  fileId: PropTypes.string.isRequired,
  onClickHighlight: PropTypes.func,
};

export default QuickHighlightForm;

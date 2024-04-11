import 'react-alice-carousel/lib/alice-carousel.css';
import { DEFAULT_MOMENT_FORMAT } from 'src/config/common';
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { getUserNameOrEmailPrefix } from 'src/modules/utils';
import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useDispatch, useSelector } from 'react-redux';
import AliceCarousel from 'react-alice-carousel';
import darkBreakpoints from 'src/mui/assets/theme-dark/base/breakpoints';
import documentFilterActions from 'src/modules/document/filter/documentFilterActions';
import documentFilterSelectors from 'src/modules/document/filter/documentFilterSelectors';
import fileSize from 'filesize';
import lightBreakpoints from 'src/mui/assets/theme/base/breakpoints';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import moment from 'moment';
import PropTypes from 'prop-types';
import ReactFileIcon from 'src/view/shared/view/ReactFileIcon';
import Spinner from 'src/view/shared/Spinner';

const FileCarouselViewItem = forwardRef(
  (props: any, ref) => {
    const {
      disableButtonsControls,
      extension,
      files,
      mouseTracking,
      onClickFileIcon,
      onSelectFiles,
      renderFileIcon,
      responsive,
      selectMode,
      typeId,
      types,
    } = props;

    const dispatch = useDispatch();

    const [dispatched, setDispatched] = useState(false);

    const [selectedFiles, setSelectedFiles] = useState(props.selectedFiles || []);

    useEffect(() => {
      if (onSelectFiles) onSelectFiles(props.selectedFiles);
    }, [onSelectFiles]);

    const { darkMode, sidenavColor } = selectMuiSettings();

    const loading = useSelector(
      documentFilterSelectors.selectLoading,
    );
    const hasRows = useSelector(
      documentFilterSelectors.selectHasRows,
    );
    const rows = useSelector(
      documentFilterSelectors.selectRows,
    );

    const breakpoints = darkMode
      ? darkBreakpoints.values
      : lightBreakpoints.values;

    const size = fileSize.partial({
      base: 2,
      standard: 'jedec',
    });

    const fnDefaultRenderFileIcon = (file) => (
      <ReactFileIcon filename={file.name} size={38.4} />
    );

    const fnRenderFileIcon = (file) =>
      renderFileIcon
        ? renderFileIcon(file, () =>
          fnDefaultRenderFileIcon(file),
        )
        : fnDefaultRenderFileIcon(file);

    const isSelected = (file) =>
      selectMode &&
      file &&
      selectedFiles.find(({ id }) => id === file.id);

    const fnRenderFile = (file) => (
      <MDBox
        alignItems="center"
        bgColor={isSelected(file) ? sidenavColor : 'none'}
        borderRadius="md"
        color={isSelected(file) ? 'white' : 'text'}
        display="flex"
        gap={0.8}
        justifyContent="flex-start"
        p={0.8}
      >
        <MDBox
          alignItems="center"
          color="inherit"
          display="flex"
          flexShrink={1}
          gap={0.4}
          onClick={(evt) => {
            if (selectMode) {
              evt.stopPropagation();
              evt.preventDefault();
              const isSelectedFile = isSelected(file);
              let newSelectedFiles = [];
              if (selectMode === 'single') {
                newSelectedFiles = isSelectedFile
                  ? []
                  : [file];
              } else if (selectMode === 'multiple') {
                newSelectedFiles = isSelectedFile
                  ? selectedFiles.filter(
                    ({ id }) => id !== file.id,
                  )
                  : [...selectedFiles, file];
              }
              setSelectedFiles(newSelectedFiles);
              onSelectFiles &&
                onSelectFiles(newSelectedFiles);
            }
            if (onClickFileIcon) {
              evt.stopPropagation();
              evt.preventDefault();
              onClickFileIcon(file);
            }
          }}
          sx={
            (Boolean(onClickFileIcon) || selectMode) && {
              cursor: 'pointer',
            }
          }
        >
          {fnRenderFileIcon(file)}
        </MDBox>
        <MDBox
          color="inherit"
          maxWidth={`calc(100% - 70px)`}
          minWidth={`calc(100% - 70px)`}
        >
          <MDTypography
            color="inherit"
            display="block"
            fontWeight="regular"
            lineHeight="1.625 !important"
            maxWidth="100%"
            minWidth="100%"
            overflow="hidden"
            textOverflow="ellipsis"
            variant="button"
            whiteSpace="nowrap"
          >
            {file.title}
            <br />
            {`${file.name} (${size(file.sizeInBytes)})`}
            <br />
            {`${getUserNameOrEmailPrefix(
              file.uploader,
            )} - ${moment(file.uploadedAt).format(
              DEFAULT_MOMENT_FORMAT,
            )}`}
          </MDTypography>
        </MDBox>
      </MDBox>
    );

    useImperativeHandle(ref, () => ({}));

    let items = (files ?? rows).map(fnRenderFile);

    useEffect(() => {
      if (dispatched || (files && files.length > 0)) {
        return;
      }
      dispatch(
        documentFilterActions.doFetch({
          extension,
          typeId,
          types,
        }),
      );
      setDispatched(true);

      return () => {
        items = [];
      };
    }, [dispatch]);

    if (loading) {
      return <Spinner />;
    }

    if ((!files || !files.length) && !hasRows) {
      return (
        <MDTypography textAlign="center">
          {i18n('fileCarousel.noItems')}
        </MDTypography>
      );
    }

    return (
      <AliceCarousel
        disableButtonsControls={Boolean(
          disableButtonsControls,
        )}
        items={items}
        mouseTracking={Boolean(mouseTracking)}
        responsive={
          responsive ?? {
            [breakpoints.xs]: { items: 1 },
            [breakpoints.sm]: { items: 2 },
            [breakpoints.md]: { items: 3 },
            [breakpoints.lg]: { items: 4 },
            [breakpoints.xl]: { items: 5 },
            [breakpoints.xxl]: { items: 5 },
          }
        }
      />
    );
  },
);

FileCarouselViewItem.defaultProps = {
  disableButtonsControls: true,
  extension: null,
  files: null,
  mouseTracking: true,
  responsive: null,
  selectMode: null,
  typeId: null,
  types: null,
};

FileCarouselViewItem.propTypes = {
  disableButtonsControls: PropTypes.bool,
  extension: PropTypes.string,
  files: PropTypes.array,
  mouseTracking: PropTypes.bool,
  onClickFileIcon: PropTypes.func,
  onSelectFiles: PropTypes.func,
  selectedFiles: PropTypes.array,
  renderFileIcon: PropTypes.func,
  responsive: PropTypes.any,
  selectMode: PropTypes.oneOf([
    null,
    undefined,
    'single',
    'multiple',
  ]),
  typeId: PropTypes.string,
  types: PropTypes.arrayOf(PropTypes.string),
};

export default FileCarouselViewItem;

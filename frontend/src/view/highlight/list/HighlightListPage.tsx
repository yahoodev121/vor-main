import { Card } from '@mui/material';
import {
  DOCUMENT_EXTS,
  DOCUMENT_TYPES,
} from 'src/modules/document/documentEnumerators';
import { GRID_MODE } from 'src/modules/types';
import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import darkBreakpoints from 'src/mui/assets/theme-dark/base/breakpoints';
import FileCarouselViewItem from 'src/view/shared/view/FileCarouselViewItem';
import HighlightIcon from '@mui/icons-material/Highlight';
import HighlightListFilter from 'src/view/highlight/list/HighlightListFilter';
import HighlightListTable from 'src/view/highlight/list/HighlightListTable';
import HighlightListToolbar from 'src/view/highlight/list/HighlightListToolbar';
import lightBreakpoints from 'src/mui/assets/theme/base/breakpoints';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import muiActions from 'src/modules/mui/muiActions';
import QuickHighlightModal from 'src/view/highlight/quick/QuickHighlightModal';

const VIEW_MODE_SECTION_NAME = 'highlights';

function HighlightListPage(props) {
  const { doAsSubComponent, additionalFilters, typeId } =
    props;
  const dispatch = useDispatch();
  const { darkMode, viewMode } = selectMuiSettings(
    VIEW_MODE_SECTION_NAME,
  );

  const breakpoints = darkMode
    ? darkBreakpoints.values
    : lightBreakpoints.values;

  const [columns, setColumns] = useState(6);

  const onSetViewMode = (mode) => {
    dispatch(
      muiActions.doViewMode({
        section: VIEW_MODE_SECTION_NAME,
        viewMode: mode,
      }),
    );
  };

  const [pdfInfo, setPdfUrl] = useState(null);

  const doCloseModal = () => setPdfUrl(null);

  const renderAliceCarousel = () => {
    return (
      <MDBox pb={0.8}>
        <FileCarouselViewItem
          onClickFileIcon={(file) =>
            setPdfUrl({
              id: file.id,
              title: file.title,
              url: file.downloadUrl,
            })
          }
          renderFileIcon={(_, fnDefaultRender) => (
            <>
              <HighlightIcon />
              {fnDefaultRender()}
            </>
          )}
          typeId={typeId}
          types={[
            DOCUMENT_TYPES.CLIENT,
            DOCUMENT_TYPES.VENDOR,
          ]}
          extension={DOCUMENT_EXTS.PDF}
        />
      </MDBox>
    );
  };

  const renderPage = () => (
    <>
      {doAsSubComponent ? (
        <MDBox display="flex" gap={4} pt={2.4} px={2.4}>
          <MDTypography variant="h5">
            {i18n('entities.highlight.label')}
          </MDTypography>
          <MDBox flexGrow={1}>
            <HighlightListFilter
              additionalFilters={additionalFilters}
            />
          </MDBox>
        </MDBox>
      ) : (
        <MDBox pt={2.4} px={2.4}>
          {!Boolean(typeId) && (
            <MDBox
              display="flex"
              justifyContent="space-between"
              alignItems="flex-start"
              pb={2.4}
            >
              <MDTypography variant="h3">
                {i18n('entities.highlight.list.title')}
              </MDTypography>
              <HighlightListToolbar
                viewMode={viewMode}
                onSetViewMode={onSetViewMode}
              />
            </MDBox>
          )}
          {renderAliceCarousel()}
          <HighlightListFilter
            additionalFilters={additionalFilters}
          />
        </MDBox>
      )}
      <HighlightListTable
        doAsSubComponent={doAsSubComponent}
        viewMode={viewMode}
        columns={columns}
      />
    </>
  );

  useEffect(() => {
    function handleDetectColumns() {
      if (viewMode !== GRID_MODE) {
        return;
      }
      const width = window.innerWidth;
      if (width >= breakpoints.lg) {
        setColumns(4);
      } else if (width >= breakpoints.md) {
        setColumns(3);
      } else if (width >= breakpoints.sm) {
        setColumns(2);
      } else {
        setColumns(1);
      }
    }

    window.addEventListener('resize', handleDetectColumns);

    handleDetectColumns();

    return () =>
      window.removeEventListener(
        'resize',
        handleDetectColumns,
      );
  }, [viewMode]);

  return (
    <>
      {viewMode === GRID_MODE || doAsSubComponent ? (
        renderPage()
      ) : (
        <Card>
          <MDBox topBorder>{renderPage()}</MDBox>
        </Card>
      )}
      {Boolean(pdfInfo) && (
        <QuickHighlightModal
          url={pdfInfo.url}
          fileId={pdfInfo.id}
          onClose={doCloseModal}
          title={pdfInfo.title}
        />
      )}
    </>
  );
}

HighlightListPage.defaultProps = {
  doAsSubComponent: false,
};

export default HighlightListPage;

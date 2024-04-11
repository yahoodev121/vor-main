import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import PropTypes from 'prop-types';
import PSPDFKit from 'pspdfkit';

let instance = null;

const deleteAllAnnotations = async () => {
  if (!instance) {
    return;
  }
  const pagesAnnotations = await Promise.all(
    Array.from({ length: instance.totalPageCount }).map(
      (_, pageIndex) => instance.getAnnotations(pageIndex),
    ),
  );
  const annotationIds = pagesAnnotations.flatMap(
    (pageAnnotations) =>
      pageAnnotations
        .map((annotation) => annotation.id)
        .toArray(),
  );
  await instance.delete(annotationIds);
};

const safeAnnotationInfo = (aInfo) => {
  if (!aInfo) {
    return aInfo;
  }
  return {
    pageIndex: aInfo.pageIndex,
    boundingBox:
      aInfo.boundingBox instanceof PSPDFKit.Geometry.Rect
        ? aInfo.boundingBox
        : new PSPDFKit.Geometry.Rect(aInfo.boundingBox),
    rects:
      aInfo.rects instanceof PSPDFKit.Immutable.List
        ? aInfo.rects
        : PSPDFKit.Immutable.List(
            aInfo.rects.map(
              (rect) => new PSPDFKit.Geometry.Rect(rect),
            ),
          ),
  };
};

const createAnnotations = async (annotations) => {
  if (!instance || !annotations) {
    return;
  }
  for (const aInfo of annotations) {
    const annotation =
      new PSPDFKit.Annotations.HighlightAnnotation(
        safeAnnotationInfo(aInfo),
      );
    await instance.create(annotation);
  }
};

const deselectText = () => {
  if (!instance) {
    return;
  }
  const interactionMode =
    instance.viewState.interactionMode;
  instance.setViewState((v) =>
    v.set('interactionMode', PSPDFKit.InteractionMode.PAN),
  );
  instance.setViewState((v) =>
    v.set('interactionMode', interactionMode),
  );
};

const jumpToAnnotation = (annotations) => {
  if (!instance || !annotations) {
    return;
  }
  const aInfo = safeAnnotationInfo(
    annotations[0] ?? annotations.get(0),
  );
  instance.jumpToRect(aInfo.pageIndex, aInfo.boundingBox);
};

const permittedToolbarTypes = [
  'sidebar-thumbnails',
  'pager',
  'pan',
  'zoom-out',
  'zoom-in',
  'zoom-mode',
  'spacer',
  'print',
  'search',
  'export-pdf',
];

const PdfViewer = forwardRef((props: any, ref) => {
  const {
    darkMode,
    onInitialized,
    onTextSelectionChange,
    url,
  } = props;

  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    (async function () {
      instance = await PSPDFKit.load({
        baseUrl: `${window.location.protocol}//${window.location.host}/${process.env.PUBLIC_URL}`,
        container,
        document: `${url}&inline=true`,
        initialViewState: new PSPDFKit.ViewState({
          sidebarMode: PSPDFKit.SidebarMode.THUMBNAILS,
        }),
        theme: darkMode
          ? PSPDFKit.Theme.DARK
          : PSPDFKit.Theme.LIGHT,
      });

      const toolbarItems = instance.toolbarItems;

      instance.setToolbarItems(
        toolbarItems.filter((item) =>
          permittedToolbarTypes.includes(item.type),
        ),
      );

      if (onTextSelectionChange) {
        instance.addEventListener(
          'textSelection.change',
          async (textSelection) => {
            if (textSelection) {
              const description =
                await textSelection.getText();

              const rectsPerPage =
                await textSelection.getSelectedRectsPerPage();

              const annotations = rectsPerPage.map(
                ({ pageIndex, rects }) => ({
                  pageIndex,
                  boundingBox:
                    PSPDFKit.Geometry.Rect.union(rects),
                  rects,
                }),
              );

              deselectText();

              await createAnnotations(annotations);

              onTextSelectionChange(
                description,
                annotations,
              );
            }
          },
        );
      }

      onInitialized && onInitialized();
    })();

    // return () => {
    //   PSPDFKit.unload(container);
    // };
  }, [url]);

  useImperativeHandle(ref, () => ({
    selectAnnotation: async (annotations) => {
      jumpToAnnotation(annotations);
    },

    addAnnotations: async (annotations) => {
      await deleteAllAnnotations();
      await createAnnotations(annotations);
    },
  }));

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', height: '100%' }}
    />
  );
});

PdfViewer.defaultProps = {
  darkMode: false,
};

PdfViewer.propTypes = {
  darkMode: PropTypes.bool,
  onInitialized: PropTypes.func,
  onTextSelectionChange: PropTypes.func,
  url: PropTypes.string.isRequired,
};

export default PdfViewer;

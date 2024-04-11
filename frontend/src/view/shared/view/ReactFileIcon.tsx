import { defaultStyles, FileIcon } from 'react-file-icon';
import { extractExtensionFrom } from 'src/modules/shared/fileUpload/fileUploader';
import { styleDefObj } from 'src/view/shared/styles/react-file-icon-styles';
import MDBox from 'src/mui/components/MDBox';

interface FileIconProps {
  filename: string;
  size?: number;
}

const ReactFileIcon = ({
  filename,
  size = 42,
}: FileIconProps) => {
  const ext = extractExtensionFrom(filename);

  const customDefaultLabelColor = styleDefObj[ext]
    ? styleDefObj[ext]['labelColor'] ?? '#777'
    : '#777';
  const libDefaultGlyphColor =
    defaultStyles[ext] && defaultStyles[ext]['labelColor'];

  return (
    <MDBox
      minWidth={`${size}px`}
      maxWidth={`${size}px`}
      lineHeight="0 !important"
    >
      <FileIcon
        extension={ext}
        glyphColor={
          libDefaultGlyphColor ?? customDefaultLabelColor
        }
        labelColor={customDefaultLabelColor}
        {...defaultStyles[ext]}
        {...styleDefObj[ext]}
      />
    </MDBox>
  );
};

export default ReactFileIcon;

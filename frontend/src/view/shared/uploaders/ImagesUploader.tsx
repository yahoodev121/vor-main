import { Avatar, CardMedia, Grid } from '@mui/material';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import DragAndDropUploaderArea from 'src/view/shared/uploaders/DragAndDropUploaderArea';
import Errors from 'src/modules/shared/error/errors';
import FileUploader from 'src/modules/shared/fileUpload/fileUploader';
import ImageModal from 'src/view/shared/modals/ImageModal';
import MDBox from 'src/mui/components/MDBox';
import MDButton from 'src/mui/components/MDButton';
import PropTypes from 'prop-types';
import SearchIcon from '@mui/icons-material/Search';
import Spinner from 'src/view/shared/Spinner';

function ImagesUploader(props) {
  const {
    isAvatar,
    onChange,
    max,
    readonly,
    value: originValue,
    storage,
  } = props;
  const { sidenavColor } = selectMuiSettings();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<any>(null);

  const value = () => {
    if (!originValue) {
      return [];
    }

    return Array.isArray(originValue)
      ? originValue
      : [originValue];
  };

  const fileList = () => {
    return value().map((item) => ({
      uid: item.id || undefined,
      name: item.name,
      status: 'done',
      url: item.downloadUrl,
    }));
  };

  const handleRemove = (id) => {
    onChange &&
      onChange(value().filter((item) => item.id !== id));
  };

  const handleChange = async (uploads) => {
    if (!uploads || !uploads.length) {
      return;
    }

    const newValue = [...value()];

    setLoading(true);

    for (let i = 0; i < uploads.length; i++) {
      try {
        const file = await FileUploader.upload(uploads[i], {
          storage: storage,
          image: true,
        });
        if (!file) {
          continue;
        }
        newValue.push(file);
      } catch (error) {
        console.error(error);
        Errors.showMessage(error);
      }
    }

    setLoading(false);

    onChange && onChange(newValue);
  };

  const doPreviewImage = (image) => {
    setImage({
      src: image.downloadUrl,
      alt: image.name,
    });
  };

  const doCloseImageModal = () => {
    setImage(null);
  };

  const renderImage = (item) => {
    return (
      <MDBox>
        {isAvatar ? (
          <Avatar
            alt={item.name}
            src={item.downloadUrl}
            sx={{
              width: 80,
              height: 80,
            }}
          />
        ) : (
          <CardMedia
            alt={item.name}
            component="img"
            src={item.downloadUrl}
            sx={{
              maxWidth: '100%',
              margin: 0,
              borderRadius: ({
                borders: { borderRadius },
              }) => borderRadius.xl,
              boxShadow: ({ boxShadows: { md } }) => md,
              objectFit: 'cover',
              objectPosition: 'center',
            }}
          />
        )}
        <MDBox
          display="flex"
          justifyContent="center"
          gap={0.8}
          mt={0.8}
        >
          <MDButton
            onClick={() => doPreviewImage(item)}
            size="small"
            color={sidenavColor}
            iconOnly
          >
            <SearchIcon />
          </MDButton>

          {!readonly && (
            <MDButton
              onClick={() => handleRemove(item.id)}
              size="small"
              color={sidenavColor}
              iconOnly
            >
              <CloseIcon />
            </MDButton>
          )}
        </MDBox>
      </MDBox>
    );
  };

  const renderImages = (images) => {
    return (images || []).map((item) =>
      max === 1 ? (
        <MDBox
          key={item.id}
          width={`${readonly || isAvatar ? 100 : 50}%`}
        >
          {renderImage(item)}
        </MDBox>
      ) : (
        <Grid key={item.id} xs={3} item>
          {renderImage(item)}
        </Grid>
      ),
    );
  };

  const renderValue = () => {
    const images = value();
    if (!images || !images.length) {
      return null;
    }
    return (
      <MDBox mt={0.8}>
        {max === 1 ? (
          <MDBox
            display="flex"
            justifyContent="center"
            alignItems="baseline"
            gap={0.8}
          >
            {renderImages(images)}
          </MDBox>
        ) : (
          <Grid spacing={0.8} container>
            {renderImages(images)}
          </Grid>
        )}
      </MDBox>
    );
  };

  return (
    <div>
      {renderValue()}

      {loading && <Spinner />}

      {loading ||
        readonly ||
        (max && fileList().length >= max) ? null : (
        <DragAndDropUploaderArea
          handleChange={handleChange}
          // multiple={max !== 1}
          storage={storage}
          types={['jpeg', 'jpg', 'png', 'gif', 'svg']}
        />
      )}

      {image && (
        <ImageModal
          src={image.src}
          alt={image.alt}
          onClose={() => doCloseImageModal()}
        />
      )}
    </div>
  );
}

ImagesUploader.propTypes = {
  isAvatar: PropTypes.bool,
  max: PropTypes.number,
  onChange: PropTypes.func,
  readonly: PropTypes.bool,
  storage: PropTypes.object,
  value: PropTypes.any,
};

export default ImagesUploader;

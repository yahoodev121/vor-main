import {
  DOCUMENT_EXTS,
  DOCUMENT_TYPES,
} from 'src/modules/document/documentEnumerators';
import { Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useFormContext } from 'react-hook-form';
import { useRef } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DownloadIcon from '@mui/icons-material/Download';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import FileCarouselViewItem from 'src/view/shared/view/FileCarouselViewItem';
import GradientTitle from 'src/view/shared/components/GradientTitle';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import MDBox from 'src/mui/components/MDBox';
import MDButton from 'src/mui/components/MDButton';
import PropTypes from 'prop-types';
import SaveIcon from '@mui/icons-material/Save';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';
import SliderFormItem from 'src/view/shared/form/items/SliderFormItem';
import TextAreaFormItem from 'src/view/shared/form/items/TextAreaFormItem';
import TextViewItem from 'src/view/shared/view/TextViewItem';
import vorAIEnumerators from 'src/modules/vorAI/vorAIEnumerators';
import MDTypography from 'src/mui/components/MDTypography';

const AthenaLayout = (props) => {
  const {
    onDownloadExcelTemplate,
    onStatus,
    onSubmit,
    onUploadAndTrain,
    record,
    saveLoading,
    submitLoading,
  } = props;

  const { sidenavColor } = selectMuiSettings();

  const fileCarouselRef = useRef(null);

  const { register, setValue } = useFormContext();

  const onSelectFiles = (files) => {
    register('attachments');
    setValue('attachments', files, {
      shouldDirty: true,
      shouldValidate: false,
    });
  };

  return (
    <MDBox px={0.8}>
      <Grid spacing={1.6} container>
        <Grid xs={12} item>
          <MDTypography variant="h5">
            {i18n('settings.athena.title')}
          </MDTypography>
        </Grid>
        <Grid xs={12} item>
          <FileCarouselViewItem
            extension={[
              DOCUMENT_EXTS.CSV,
              DOCUMENT_EXTS.TSV,
              DOCUMENT_EXTS.EXCEL,
              DOCUMENT_EXTS.JSON,
              DOCUMENT_EXTS.JSONL,
            ].join(',')}
            onSelectFiles={onSelectFiles}
            selectedFiles={record?.attachments}
            ref={fileCarouselRef}
            selectMode="multiple"
            types={[DOCUMENT_TYPES.INTERNAL]}
          />
        </Grid>
        <Grid xs={12} item>
          <Grid
            flexDirection="row-reverse"
            alignItems="stretch"
            spacing={1.6}
            container
          >
            <Grid lg={3} xs={12} item>
              <Grid spacing={1.6} container>
                <Grid xs={12} item>
                  <InputFormItem
                    label={i18n(
                      'entities.vorAI.fields.apiBearerToken',
                    )}
                    name="apiBearerToken"
                    required={true}
                    variant="standard"
                  />
                </Grid>
                <Grid xs={12} item>
                  <SelectFormItem
                    label={i18n(
                      'entities.vorAI.fields.engine',
                    )}
                    name="engine"
                    options={vorAIEnumerators.models.map(
                      (value) => ({
                        value,
                        label: i18n(
                          `entities.vorAI.enumerators.models.${value}`,
                        ),
                      }),
                    )}
                    required={true}
                    variant="standard"
                  />
                </Grid>
                <Grid xs={12} item>
                  <SliderFormItem
                    label={i18n(
                      'entities.vorAI.fields.temperature',
                    )}
                    name="temperature"
                    max={1}
                    min={0}
                    step={0.1}
                  />
                  <SliderFormItem
                    label={i18n(
                      'entities.vorAI.fields.maxTokens',
                    )}
                    name="maxTokens"
                    max={4000}
                    min={1}
                  />
                  <InputFormItem
                    label={i18n(
                      'entities.vorAI.fields.stopSequence',
                    )}
                    name="stopSequence"
                    variant="standard"
                  />
                </Grid>
                <Grid xs={12} item>
                  <SliderFormItem
                    label={i18n(
                      'entities.vorAI.fields.topP',
                    )}
                    name="topP"
                    max={1}
                    min={0}
                    step={0.1}
                  />
                  <SliderFormItem
                    label={i18n(
                      'entities.vorAI.fields.frequencyPenalty',
                    )}
                    name="frequencyPenalty"
                    max={+2.0}
                    min={0}
                    step={0.1}
                  />
                  <SliderFormItem
                    label={i18n(
                      'entities.vorAI.fields.presencePenalty',
                    )}
                    name="presencePenalty"
                    max={+2.0}
                    min={0}
                    step={0.1}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid lg={9} xs={12} item>
              <TextAreaFormItem
                label={i18n('entities.vorAI.fields.prompt')}
                name="prompt"
                rows={25}
                variant="standard"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid xs={12} item>
          <MDBox display="flex" gap={0.8}>
            <MDButton
              variant="gradient"
              color={sidenavColor}
              disabled={saveLoading}
              onClick={() => onSubmit && onSubmit()}
              startIcon={<SaveIcon />}
            >
              {i18n('common.save')}
            </MDButton>
            <MDButton
              color={sidenavColor}
              disabled={submitLoading}
              onClick={() =>
                onUploadAndTrain && onUploadAndTrain()
              }
              variant="outlined"
              startIcon={<CloudUploadIcon />}
            >
              {i18n(
                'entities.vorAI.buttons.uploadAndTrain',
              )}
            </MDButton>
            <MDButton
              color={sidenavColor}
              disabled={submitLoading}
              onClick={() => onStatus && onStatus()}
              variant="outlined"
              startIcon={<EmojiObjectsIcon />}
            >
              {i18n('entities.vorAI.buttons.trainStatus')}
            </MDButton>
            <MDButton
              color={sidenavColor}
              disabled={submitLoading}
              onClick={() =>
                onDownloadExcelTemplate &&
                onDownloadExcelTemplate()
              }
              variant="outlined"
              startIcon={<DownloadIcon />}
            >
              {i18n(
                'entities.vorAI.buttons.downloadExcelTemplate',
              )}
            </MDButton>
          </MDBox>
        </Grid>
      </Grid>
    </MDBox>
  );
};

AthenaLayout.defaultProps = {
  record: null,
};

AthenaLayout.propTypes = {
  onDownloadExcelTemplate: PropTypes.func,
  onStatus: PropTypes.func,
  onSubmit: PropTypes.func,
  onUploadAndTrain: PropTypes.func,
  record: PropTypes.any,
  saveLoading: PropTypes.bool,
  submitLoading: PropTypes.bool,
};

export default AthenaLayout;

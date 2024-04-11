import {
  EntityActionButtons,
  getBulletText,
} from 'src/view/Questionnaire/common';
import { i18n } from 'src/i18n';
import { IconButton, Tooltip } from '@mui/material';
import { useRef, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import BulletModal from 'src/view/Questionnaire/components/BulletModal';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import InputAdornment from '@mui/material/InputAdornment';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import Message from 'src/view/shared/message';
import Questions from 'src/view/Questionnaire/components/Questions';

const SubSectionItem = (props) => {
  const {
    color,
    darkMode,
    doChangeQuestion,
    doDeleteSubSection,
    doMoveDown,
    doMoveUp,
    doSaveSubSection,
    doSelect,
    entity,
    firstItem,
    index,
    lastItem,
    preview,
    readOnly,
    value,
  } = props;

  if (!entity) {
    return null;
  }

  const childRef = useRef(null);
  const titleRef = useRef(null);

  const [bulletModal, setBulletModal] = useState(false);

  const doEdit = () => {
    doSaveSubSection &&
      doSaveSubSection(
        {
          editing: value.title,
        },
        index,
      );
  };

  const doDelete = () => {
    doDeleteSubSection && doDeleteSubSection(index);
  };

  const doSave = () => {
    if (
      !titleRef?.current?.value ||
      titleRef?.current?.value.trim() === ''
    ) {
      Message.error(
        i18n(
          'entities.questionnaireTemplate.update.section.required',
        ),
      );
      return;
    }
    doSaveSubSection &&
      doSaveSubSection(
        {
          title: titleRef?.current?.value,
          editing: false,
        },
        index,
      );
  };

  const doSaveAll = (props = null) => {
    doSaveSubSection &&
      doSaveSubSection(
        {
          ...(props ?? {
            title: titleRef?.current?.value,
          }),
        },
        index,
      );
  };

  const doCancel = () => {
    doSaveSubSection &&
      doSaveSubSection(
        {
          title: value.editing,
          editing: false,
        },
        index,
      );
  };

  const onClose = () => setBulletModal(false);

  const onConfirm = (values) => {
    doSaveAll({
      bullet: values,
    });
    onClose();
  };

  const bullet = getBulletText(value.bullet, index);

  return (
    <MDBox position="relative" my={1.6}>
      <MDBox
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        lineHeight={0}
      >
        {!preview && !readOnly && (
          <MDBox>
            <Tooltip
              title={i18n(
                'entities.questionnaire.hints.formatBullet',
              )}
              disableInteractive
            >
              <IconButton
                color={color}
                onClick={() => setBulletModal(true)}
                size="small"
              >
                <FormatListBulletedIcon />
              </IconButton>
            </Tooltip>
          </MDBox>
        )}
        <MDBox flexGrow={1} overflow="hidden">
          {!preview && !readOnly && value.editing ? (
            <InputFormItem
              ref={titleRef}
              value={value.title}
              variant="standard"
              onBlur={() => doSaveAll()}
              startAdornment={
                <InputAdornment
                  position="start"
                  sx={{
                    color:
                      (darkMode ? 'white' : 'inherit') +
                      ' !important',
                  }}
                >
                  <span>{bullet}</span>
                </InputAdornment>
              }
              forceValue
            />
          ) : (
            <MDTypography
              variant="body2"
              fontWeight="bold"
              sx={{
                maxWidth: '100%',
                display: 'inline-block',
                whiteSpace: 'break-spaces',
              }}
              lineHeight="1.6rem"
            >
              {`${bullet}${value.title}`}
            </MDTypography>
          )}
        </MDBox>
        {!preview && !readOnly && (
          <MDBox display="flex">
            <EntityActionButtons
              color={color}
              doCancel={doCancel}
              doDelete={doDelete}
              doEdit={doEdit}
              doMoveDown={doMoveDown}
              doMoveUp={doMoveUp}
              doSave={doSave}
              editing={value.editing}
              firstItem={firstItem}
              index={index}
              lastItem={lastItem}
            />
            <Tooltip
              title={i18n(
                'entities.questionnaireTemplate.labels.addQuestion',
              )}
              disableInteractive
            >
              <IconButton
                color={color}
                size="small"
                onClick={() =>
                  childRef?.current?.doAddQuestion()
                }
                tabIndex={-1}
              >
                <AddIcon />
              </IconButton>
            </Tooltip>
          </MDBox>
        )}
      </MDBox>
      <MDBox pl={3.2}>
        <Questions
          ref={childRef}
          prefix={bullet}
          entity={entity}
          onChange={(newQuestion) =>
            doChangeQuestion(value.key, newQuestion)
          }
          preview={preview}
          readOnly={readOnly}
        />
      </MDBox>
      {bulletModal && (
        <BulletModal
          bullet={value.bullet ?? {}}
          color={color}
          index={index}
          onClose={onClose}
          onConfirm={onConfirm}
          text={titleRef?.current?.value ?? value.title}
        />
      )}
    </MDBox>
  );
};

export default SubSectionItem;

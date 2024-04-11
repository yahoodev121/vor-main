import {
  appendElement,
  deleteElement,
  generateQuestions,
  generateSection,
  moveDownElement,
  moveUpElement,
  updateElement,
} from 'src/view/Questionnaire/common';
import { i18n } from 'src/i18n';
import { IconButton, Tooltip } from '@mui/material';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import ConfirmModal from 'src/view/shared/modals/ConfirmModal';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import PropTypes from 'prop-types';
import SubSectionItem from 'src/view/Questionnaire/components/SubSectionItem';

const SubSections = (props) => {
  const {
    entity,
    onChange,
    onSelect,
    preview,
    readOnly,
    title,
  } = props;

  if (!entity) {
    return null;
  }

  const { sections, questions } = entity;
  const { sidenavColor, darkMode } = selectMuiSettings();

  const [indexToDelete, setIndexToDelete] = useState(null);

  const doCloseDeleteConfirmModal = () => {
    setIndexToDelete(null);
  };

  const doUpdateSubSectionValues = (newSubSections) => {
    onChange &&
      onChange({
        sections: newSubSections,
        questions: generateQuestions(
          questions,
          newSubSections,
        ),
      });
  };

  const doChangeQuestion = (key, newQuestion) => {
    onChange &&
      onChange({
        ...entity,
        questions: {
          ...questions,
          [key]: newQuestion,
        },
      });
  };

  const doAddSubSection = () =>
    appendElement(
      sections,
      generateSection(),
      doUpdateSubSectionValues,
    );

  const doSaveSubSection = (props, index) =>
    updateElement(
      sections,
      index,
      props,
      doUpdateSubSectionValues,
    );

  const doDeleteSubSection = () => {
    deleteElement(
      sections,
      indexToDelete,
      doUpdateSubSectionValues,
    );
    doCloseDeleteConfirmModal();
  };

  const doMoveUp = (index) =>
    moveUpElement(
      sections,
      index,
      doUpdateSubSectionValues,
    );

  const doMoveDown = (index) =>
    moveDownElement(
      sections,
      index,
      doUpdateSubSectionValues,
    );

  const doSelect = (index) => {
    onSelect && onSelect(index);
  };

  return (
    <>
      <MDBox
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        lineHeight={0}
      >
        <MDBox flexGrow={1}>
          <MDTypography variant="body1" fontWeight="bold">
            {title || i18n('common.untitled')}
          </MDTypography>
        </MDBox>
        {!preview && (
          <Tooltip
            title={i18n(
              'entities.questionnaireTemplate.labels.addSubSection',
            )}
            disableInteractive
          >
            <IconButton
              color={sidenavColor}
              size="small"
              onClick={() => doAddSubSection()}
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
        )}
      </MDBox>
      {sections.map((section, index, original) => (
        <SubSectionItem
          key={`sub-section-item-${index}`}
          color={sidenavColor}
          darkMode={darkMode}
          doChangeQuestion={doChangeQuestion}
          doDeleteSubSection={setIndexToDelete}
          doMoveDown={doMoveDown}
          doMoveUp={doMoveUp}
          doSaveSubSection={doSaveSubSection}
          doSelect={doSelect}
          entity={questions[section.key]}
          firstItem={index === 0}
          index={index}
          lastItem={index + 1 === original.length}
          preview={preview}
          readOnly={readOnly}
          value={section}
        />
      ))}
      {indexToDelete !== null && (
        <ConfirmModal
          title={i18n('common.areYouSure')}
          onConfirm={() => doDeleteSubSection()}
          onClose={() => doCloseDeleteConfirmModal()}
          okText={i18n('common.yes')}
          cancelText={i18n('common.no')}
        />
      )}
    </>
  );
};

SubSections.defaultProps = {
  preview: false,
  readOnly: false,
};

SubSections.propTypes = {
  entity: PropTypes.shape({
    sections: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        questions: PropTypes.number,
        editing: PropTypes.oneOfType([
          PropTypes.bool,
          PropTypes.string,
        ]),
      }),
    ),
    questions: PropTypes.any,
  }),
  onChange: PropTypes.func,
  onSelect: PropTypes.func,
  preview: PropTypes.bool,
  readOnly: PropTypes.bool,
  title: PropTypes.string,
};

export default SubSections;

import {
  appendElement,
  deleteElement,
  generateQuestion,
  generateQuestions,
  generateSection,
  moveDownElement,
  moveUpElement,
  updateElement,
} from 'src/view/Questionnaire/common';
import { i18n } from 'src/i18n';
import { IconButton, Tooltip } from '@mui/material';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { TimelineProvider } from 'src/mui/shared/Timeline/context';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import CompleteStatus from 'src/view/Questionnaire/components/CompleteStatus';
import ConfirmModal from 'src/view/shared/modals/ConfirmModal';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import PropTypes from 'prop-types';
import SectionItem from 'src/view/Questionnaire/components/SectionItem';

const Sections = (props) => {
  const { onChange, onSelect, preview, entity, readOnly } =
    props;

  if (!entity) {
    return null;
  }

  const { sections, questions } = entity;
  const totalQuestions = sections.reduce(
    (totalQuestions, section) =>
      totalQuestions + section.questions,
    0,
  );
  const totalAnswers = sections.reduce(
    (totalAnswers, section) =>
      totalAnswers + (section.answers || 0),
    0,
  );
  const { sidenavColor, darkMode } = selectMuiSettings();

  const [indexToDelete, setIndexToDelete] = useState(null);

  const doCloseDeleteConfirmModal = () => {
    setIndexToDelete(null);
  };

  const doUpdateSectionValues = (newSections) => {
    onChange &&
      onChange({
        sections: newSections,
        questions: generateQuestions(
          questions,
          newSections,
        ),
      });
  };

  const doSelect = (key) => {
    onSelect && onSelect(key);
  };

  const doAddSection = () => {
    const newSection = generateSection();
    const newSubSection = generateSection();
    const newQuestion = generateQuestion();
    questions[newSection.key] = {
      sections: [newSubSection],
      questions: {
        [newSubSection.key]: {
          sections: [newQuestion],
          questions: {
            [newQuestion.key]: {
              sections: [],
              questions: [],
            },
          },
        },
      },
    };
    appendElement(
      sections,
      newSection,
      doUpdateSectionValues,
    );
    doSelect(newSection.key);
  };

  const doSaveSection = (props, index) =>
    updateElement(
      sections,
      index,
      props,
      doUpdateSectionValues,
    );

  const doDeleteSection = () => {
    deleteElement(
      sections,
      indexToDelete,
      doUpdateSectionValues,
    );
    doCloseDeleteConfirmModal();
  };

  const doMoveUp = (index) =>
    moveUpElement(sections, index, doUpdateSectionValues);

  const doMoveDown = (index) =>
    moveDownElement(sections, index, doUpdateSectionValues);

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
            {i18n(
              'entities.questionnaireTemplate.labels.sections',
            )}
          </MDTypography>
          <MDTypography
            variant="caption"
            fontWeight="regular"
            color="text"
          >
            {i18n(
              'entities.questionnaireTemplate.labels.totalQuestions',
              totalQuestions,
            )}
          </MDTypography>
          {(preview || readOnly) && (
            <MDBox mt={0.8}>
              <CompleteStatus
                completed={totalAnswers}
                total={totalQuestions}
              />
            </MDBox>
          )}
        </MDBox>
        {!preview && !readOnly && (
          <Tooltip
            title={i18n(
              'entities.questionnaireTemplate.labels.addSection',
            )}
            disableInteractive
          >
            <IconButton
              color={sidenavColor}
              size="small"
              onClick={() => doAddSection()}
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
        )}
      </MDBox>
      <TimelineProvider value={darkMode}>
        {sections.map((section, index, original) => (
          <SectionItem
            key={`section-item-${index}`}
            color={sidenavColor}
            darkMode={darkMode}
            doDeleteSection={setIndexToDelete}
            doMoveDown={doMoveDown}
            doMoveUp={doMoveUp}
            doSaveSection={doSaveSection}
            doSelect={doSelect}
            firstItem={index === 0}
            index={index}
            lastItem={index + 1 === original.length}
            preview={preview}
            readOnly={readOnly}
            value={section}
          />
        ))}
      </TimelineProvider>
      {indexToDelete !== null && (
        <ConfirmModal
          title={i18n('common.areYouSure')}
          onConfirm={() => doDeleteSection()}
          onClose={() => doCloseDeleteConfirmModal()}
          okText={i18n('common.yes')}
          cancelText={i18n('common.no')}
        />
      )}
    </>
  );
};

Sections.defaultProps = {
  preview: false,
  readOnly: false,
};

Sections.propTypes = {
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
};

export default Sections;

import {
  appendElement,
  cloneElement,
  deleteElement,
  generateQuestion,
  generateQuestions,
  moveDownElement,
  moveUpElement,
  updateElement,
} from 'src/view/Questionnaire/common';
import { forwardRef, useImperativeHandle } from 'react';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import QuestionItem from 'src/view/Questionnaire/components/QuestionItem';

const Questions = forwardRef((props: any, ref) => {
  const {
    entity,
    onChange,
    onSelect,
    prefix,
    preview,
    readOnly,
  } = props;

  if (!entity) {
    return null;
  }

  const { sections, questions } = entity;
  const { sidenavColor, darkMode } = selectMuiSettings();

  const doUpdateQuestionValues = (newQuestions) => {
    onChange &&
      onChange({
        sections: newQuestions,
        questions: generateQuestions(
          questions,
          newQuestions,
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

  useImperativeHandle(ref, () => ({
    doAddQuestion() {
      appendElement(
        sections,
        generateQuestion(),
        doUpdateQuestionValues,
      );
    },
  }));

  const doCloneQuestion = (index) =>
    cloneElement(sections, index, doUpdateQuestionValues);

  const doSaveQuestion = (props, index) =>
    updateElement(
      sections,
      index,
      props,
      doUpdateQuestionValues,
    );

  const doDeleteQuestion = (index) =>
    deleteElement(sections, index, doUpdateQuestionValues);

  const doMoveUp = (index) =>
    moveUpElement(sections, index, doUpdateQuestionValues);

  const doMoveDown = (index) =>
    moveDownElement(
      sections,
      index,
      doUpdateQuestionValues,
    );

  const doSelect = (index) => {
    onSelect && onSelect(index);
  };

  return (
    <>
      {sections.map((section, index, original) => (
        <QuestionItem
          key={`question-item-${index}`}
          color={sidenavColor}
          darkMode={darkMode}
          doChangeQuestion={doChangeQuestion}
          doCloneQuestion={doCloneQuestion}
          doDeleteQuestion={doDeleteQuestion}
          doMoveDown={doMoveDown}
          doMoveUp={doMoveUp}
          doSaveQuestion={doSaveQuestion}
          doSelect={doSelect}
          entity={questions[section.key]}
          firstItem={index === 0}
          index={index}
          lastItem={index + 1 === original.length}
          prefix={prefix}
          preview={preview}
          readOnly={readOnly}
          value={section}
        />
      ))}
    </>
  );
});

export default Questions;

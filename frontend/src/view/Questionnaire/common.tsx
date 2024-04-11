import { i18n } from 'src/i18n';
import { IconButton, Tooltip } from '@mui/material';
import {
  indexToBullet,
  toArray,
  toSafeArray,
} from 'src/modules/utils';
import {
  INPUT_TYPE,
  questionnaireEnumerator,
} from 'src/view/Questionnaire/enumerators';
import { v4 as uuid } from 'uuid';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

export const BulletTypes = {
  none: 'none',
  numeric: 'numeric',
  alphabetic: 'alphabetic',
  ALPHABETIC: 'ALPHABETIC',
  custom: 'custom',
};

export const DefaultFormatBullet = {
  type: BulletTypes.numeric,
  prefixInherit: true,
  prefixText: null,
  custom: null,
};

export const generateSection = () => ({
  key: uuid(),
  bullet: DefaultFormatBullet,
  title: i18n('common.untitled'),
  questions: 0,
  answers: 0,
  totalScore: 0,
  answerScore: 0,
  editing: i18n('common.untitled'),
});

export const generateQuestion = () => ({
  ...generateSection(),
  type: null,
  multiSelect: false,
  options: [],
  scoreAnswer: [],
  score: 1,
  questionMandatory: false,
  attachment: false,
  attachmentMandatory: false,
  showNestedQuestionsByScoreAnswer: false,
  answer: null,
  additionalInformation: null,
  attachments: [],
});

export const getBulletText = (
  bullet,
  index,
  prefix = null,
) => {
  const safeBullet = bullet ?? DefaultFormatBullet;
  const safeIndex = index ?? 0;
  let result = [
    safeBullet.prefixInherit &&
      (prefix ? prefix.replace(/[\. ]+$/g, '') : false),
    safeBullet.prefixText,
    safeBullet.type === BulletTypes.numeric
      ? safeIndex + 1
      : safeBullet.type === BulletTypes.alphabetic
      ? indexToBullet(safeIndex, false)
      : safeBullet.type === BulletTypes.ALPHABETIC
      ? indexToBullet(safeIndex)
      : safeBullet.type === BulletTypes.custom
      ? safeBullet.custom
      : null,
  ]
    .filter(Boolean)
    .join('.');
  result =
    !result || /\./g.test(result) ? result : `${result}.`;
  return result ? `${result} ` : '';
};

export const safeValue = (entity, prop) => {
  const value = toArray(entity[prop]);
  if (!value) {
    return value;
  }
  return entity.type === INPUT_TYPE.SELECT &&
    entity.multiSelect
    ? value
    : value[0];
};

export const generateQuestions = (
  originalQuestions,
  newSections,
) => {
  const newQuestions = { ...(originalQuestions ?? {}) };
  for (const key of Object.keys(originalQuestions ?? {})) {
    if (
      !newSections.find((section) => section.key === key)
    ) {
      delete newQuestions[key];
    }
  }
  for (const section of newSections) {
    if (!newQuestions[section.key]) {
      newQuestions[section.key] = {
        sections: [],
        questions: {},
      };
    }
  }
  return newQuestions;
};

export const appendElement = (
  values,
  element,
  fnSuccess = null,
) => {
  const newValues = [...values, element];
  if (fnSuccess) {
    fnSuccess(newValues);
    return;
  }
  return newValues;
};

export const cloneElement = (
  values,
  index,
  fnSuccess = null,
) => {
  if (index < 0 || index >= values.length) {
    return;
  }
  const newValues = [
    ...values.slice(0, index + 1),
    { ...values[index], key: uuid() },
    ...values.slice(index + 1),
  ];
  if (fnSuccess) {
    fnSuccess(newValues);
    return;
  }
  return newValues;
};

export const updateElement = (
  values,
  index,
  props,
  fnSuccess = null,
) => {
  if (index < 0 || index >= values.length) {
    return;
  }
  const newValues = [
    ...values.slice(0, index),
    {
      ...values[index],
      ...props,
    },
    ...values.slice(index + 1),
  ];
  if (fnSuccess) {
    fnSuccess(newValues);
    return;
  }
  return newValues;
};

export const deleteElement = (
  values,
  index,
  fnSuccess = null,
) => {
  if (index < 0 || index >= values.length) {
    return;
  }
  const newValues = [
    ...values.slice(0, index),
    ...values.slice(index + 1),
  ];
  if (fnSuccess) {
    fnSuccess(newValues);
    return;
  }
  return newValues;
};

export const moveUpElement = (
  values,
  index,
  fnSuccess = null,
) => {
  if (index <= 0) {
    return;
  }
  const newValues = [
    ...values.slice(0, index - 1),
    ...values.slice(index, index + 1),
    ...values.slice(index - 1, index),
    ...values.slice(index + 1),
  ];
  if (fnSuccess) {
    fnSuccess(newValues);
    return;
  }
  return newValues;
};

export const moveDownElement = (
  values,
  index,
  fnSuccess = null,
) => {
  if (index >= values.length - 1) {
    return;
  }
  const newValues = [
    ...values.slice(0, index),
    ...values.slice(index + 1, index + 2),
    ...values.slice(index, index + 1),
    ...values.slice(index + 2),
  ];
  if (fnSuccess) {
    fnSuccess(newValues);
    return;
  }
  return newValues;
};

export const getSafeScore = (section) =>
  Number(section?.score ?? 1);

export const getScoreFromAnswers = (section) => {
  if (
    !section.type ||
    questionnaireEnumerator.noScoreAnswerTypes.includes(
      section.type,
    )
  ) {
    return 0;
  }
  const scoreAnswers = (section.scoreAnswer ?? []).sort();
  const answers = toSafeArray(section.answer).sort();
  if (answers.length !== scoreAnswers.length) {
    return 0;
  }
  for (let i = 0; i < answers.length; i++) {
    if (answers[i] !== scoreAnswers[i]) {
      return 0;
    }
  }
  return getSafeScore(section);
};

export const quitEditMode = (entity) => {
  if (!entity) {
    return;
  }
  if (!entity.sections) {
    entity.sections = [];
  }
  if (!entity.questions) {
    entity.questions = {};
  }
  for (const section of entity.sections ?? []) {
    quitEditMode(entity.questions[section.key]);
    section.editing = false;
  }
};

export const summarizeQuestionCount = (entity) => {
  if (!entity) {
    return;
  }
  if (!entity.sections) {
    entity.sections = [];
  }
  if (!entity.questions) {
    entity.questions = {};
  }
  for (const section of entity.sections ?? []) {
    summarizeQuestionCount(entity.questions[section.key]);
    const notHasAnswers =
      !section.answer || !section.answer.length;
    section.questions = section.type === undefined ? 0 : 1;
    section.answers = notHasAnswers ? 0 : 1;
    section.totalScore =
      section.type === undefined ||
      questionnaireEnumerator.noScoreAnswerTypes.includes(
        section.type,
      )
        ? 0
        : section.score ?? 1;
    section.answerScore = notHasAnswers
      ? 0
      : getScoreFromAnswers(section);
    [
      'questions',
      'answers',
      'totalScore',
      'answerScore',
    ].forEach((field) => {
      section[field] += entity.questions
        ? (
            entity.questions[section.key]?.sections ?? []
          ).reduce(
            (total, section) => total + section[field],
            0,
          )
        : 0;
    });
  }
};

export const newQuestionnaireEntity = () => {
  const newSection = generateSection();
  const newSubSection = generateSection();
  const newQuestion = generateQuestion();
  const sections = [newSection];
  const questions = {};
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
  const questionnaire = {
    sections,
    questions,
  };
  summarizeQuestionCount(questionnaire);
  return questionnaire;
};

export const EntityActionButtons = ({
  color,
  doCancel = null,
  doDelete = null,
  doEdit = null,
  doMoveDown = null,
  doMoveUp = null,
  doSave = null,
  firstItem,
  index,
  editing,
  lastItem,
}) => (
  <>
    {editing ? (
      <>
        {Boolean(doSave) && (
          <Tooltip
            title={i18n('common.save')}
            disableInteractive
          >
            <IconButton
              color={color}
              size="small"
              onClick={() => doSave()}
              tabIndex={-1}
            >
              <SaveIcon />
            </IconButton>
          </Tooltip>
        )}
        {Boolean(doCancel) && (
          <Tooltip
            title={i18n('common.cancel')}
            disableInteractive
          >
            <IconButton
              color={color}
              size="small"
              onClick={() => doCancel()}
              tabIndex={-1}
            >
              <CancelIcon />
            </IconButton>
          </Tooltip>
        )}
      </>
    ) : (
      <>
        {Boolean(doEdit) && (
          <Tooltip
            title={i18n('common.edit')}
            disableInteractive
          >
            <IconButton
              color={color}
              size="small"
              onClick={() => doEdit()}
              tabIndex={-1}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
        )}
        {Boolean(doDelete) && (
          <Tooltip
            title={i18n('common.destroy')}
            disableInteractive
          >
            <IconButton
              color={color}
              size="small"
              onClick={() => doDelete()}
              tabIndex={-1}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        )}
      </>
    )}
    {Boolean(doMoveUp) && (
      <Tooltip
        title={i18n('common.move.up')}
        disableInteractive
      >
        <span>
          <IconButton
            color={color}
            size="small"
            onClick={() => doMoveUp && doMoveUp(index)}
            disabled={Boolean(firstItem)}
            tabIndex={-1}
          >
            <ArrowUpwardIcon />
          </IconButton>
        </span>
      </Tooltip>
    )}
    {Boolean(doMoveDown) && (
      <Tooltip
        title={i18n('common.move.down')}
        disableInteractive
      >
        <span>
          <IconButton
            color={color}
            size="small"
            onClick={() => doMoveDown && doMoveDown(index)}
            disabled={Boolean(lastItem)}
            tabIndex={-1}
          >
            <ArrowDownwardIcon />
          </IconButton>
        </span>
      </Tooltip>
    )}
  </>
);

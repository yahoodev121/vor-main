import {
  EntityActionButtons,
  getBulletText,
  getSafeScore,
  getScoreFromAnswers,
  safeValue,
} from 'src/view/Questionnaire/common';
import { Grid, IconButton, Tooltip } from '@mui/material';
import { i18n } from 'src/i18n';
import {
  INPUT_TYPE,
  questionnaireEnumerator,
} from 'src/view/Questionnaire/enumerators';
import { toArray } from 'src/modules/utils';
import { useEffect, useRef, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import BulletModal from 'src/view/Questionnaire/components/BulletModal';
import CheckboxFormItem from 'src/view/shared/form/items/CheckboxFormItem';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import FilesFormItem from 'src/view/shared/form/items/FilesFormItem';
import FilesViewItem from 'src/view/shared/view/FilesViewItem';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import InputAdornment from '@mui/material/InputAdornment';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import InputNumberFormItem from 'src/view/shared/form/items/InputNumberFormItem';
import MDBox from 'src/mui/components/MDBox';
import MDButton from 'src/mui/components/MDButton';
import MDTypography from 'src/mui/components/MDTypography';
import Message from 'src/view/shared/message';
import OptionsModal from 'src/view/Questionnaire/components/OptionsModal';
import Questions from 'src/view/Questionnaire/components/Questions';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';
import Storage from 'src/security/storage';
import TextAreaFormItem from 'src/view/shared/form/items/TextAreaFormItem';
import TextViewItem from 'src/view/shared/view/TextViewItem';

const QuestionItem = (props) => {
  const {
    color,
    darkMode,
    doChangeQuestion,
    doCloneQuestion,
    doDeleteQuestion,
    doMoveDown,
    doMoveUp,
    doSaveQuestion,
    doSelect,
    entity,
    firstItem,
    index,
    lastItem,
    prefix,
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
  const [scoreValue, setScoreValue] = useState(
    value.score ?? 1,
  );
  const [answer, setAnswer] = useState(value.answer);
  const [additionalInformation, setAdditionalInformation] =
    useState(value.additionalInformation);
  const [visibleOptionsModal, setVisibleOptionsModal] =
    useState(false);

  useEffect(() => {
    setAdditionalInformation(value.additionalInformation);
  }, [value.key]);

  const doEdit = () => {
    doSaveQuestion &&
      doSaveQuestion(
        {
          editing: value.title,
        },
        index,
      );
  };

  const doDelete = () => {
    doDeleteQuestion && doDeleteQuestion(index);
  };

  const doSave = () => {
    if (
      !titleRef?.current?.value ||
      titleRef?.current?.value.trim() === ''
    ) {
      Message.error(
        i18n(
          'entities.questionnaireTemplate.update.question.required',
        ),
      );
      return;
    }
    doSaveQuestion &&
      doSaveQuestion(
        {
          title: titleRef?.current?.value,
          editing: false,
        },
        index,
      );
  };

  const doSaveAll = (props = null) => {
    doSaveQuestion &&
      doSaveQuestion(
        {
          ...(props ?? {
            title: titleRef?.current?.value,
          }),
        },
        index,
      );
  };

  const doSaveProps = (props) => {
    doSaveQuestion && doSaveQuestion(props, index);
  };

  const doCancel = () => {
    doSaveQuestion &&
      doSaveQuestion(
        {
          title: value.editing,
          editing: false,
        },
        index,
      );
  };

  const doCloseOptionsModal = () =>
    setVisibleOptionsModal(false);
  const doConfirmOptionsModal = (options) => {
    doSaveProps({ options: options });
    doCloseOptionsModal();
  };

  const renderQuestionItemBuilder = () => (
    <Grid container spacing={1.6}>
      <Grid item xs={8}>
        <SelectFormItem
          name={`${value.key}-type`}
          label={i18n(
            'entities.questionnaireTemplate.fields.type',
          )}
          options={questionnaireEnumerator.types.map(
            (value) => ({
              value,
              label: i18n(
                `entities.questionnaire.enumerators.types.${value}`,
              ),
            }),
          )}
          value={value.type}
          onChange={(value) =>
            doSaveProps({
              type: value,
              scoreAnswer: [],
              showNestedQuestionsByScoreAnswer: false,
            })
          }
          required={true}
          variant="standard"
          forceValue
        />
        {!!value.type &&
          !questionnaireEnumerator.noScoreAnswerTypes.includes(
            value.type,
          ) && (
            <MDBox mt={1.6}>
              <Grid container spacing={1.6}>
                <Grid item xs={8}>
                  {questionnaireEnumerator.typeDefines[
                    value.type
                  ]?.render({
                    ...value,
                    title: i18n(
                      'entities.questionnaireTemplate.fields.scoreAnswer',
                    ),
                    answer: safeValue(value, 'scoreAnswer'),
                    onChange: (value) =>
                      doSaveProps({
                        scoreAnswer: toArray(value),
                      }),
                  })}
                </Grid>
                <Grid item xs={4}>
                  <InputNumberFormItem
                    name={`${value.key}-score`}
                    label={i18n(
                      'entities.questionnaireTemplate.fields.score',
                    )}
                    variant="standard"
                    value={scoreValue}
                    onChange={setScoreValue}
                    onBlur={() =>
                      doSaveProps({
                        score: scoreValue,
                      })
                    }
                    forceValue
                  />
                </Grid>
              </Grid>
              {value.type === INPUT_TYPE.SELECT && (
                <>
                  <Grid container mt={0.8}>
                    <Grid item xs={6}>
                      <CheckboxFormItem
                        name={`${value.key}-multi-select`}
                        label={i18n(
                          'entities.questionnaireTemplate.fields.multiSelect',
                        )}
                        value={value.multiSelect}
                        onChange={(value) =>
                          doSaveProps({
                            multiSelect: value,
                          })
                        }
                        forceValue
                      />
                    </Grid>
                    <Grid item xs={6} textAlign="right">
                      <MDButton
                        variant="contained"
                        color={color}
                        onClick={() =>
                          setVisibleOptionsModal(true)
                        }
                      >
                        {i18n(
                          'entities.questionnaireTemplate.labels.editOptions',
                        )}
                      </MDButton>
                    </Grid>
                  </Grid>
                  {visibleOptionsModal && (
                    <OptionsModal
                      title={i18n(
                        'entities.questionnaireTemplate.labels.options',
                      )}
                      cancelText={i18n('common.cancel')}
                      okText={i18n('common.save')}
                      onClose={() => doCloseOptionsModal()}
                      onConfirm={(newOptions) =>
                        doConfirmOptionsModal(newOptions)
                      }
                      options={value.options}
                    />
                  )}
                </>
              )}
            </MDBox>
          )}
      </Grid>
      <Grid item xs={4}>
        <CheckboxFormItem
          name={`${value.key}-question-mandatory`}
          label={i18n(
            'entities.questionnaireTemplate.fields.questionMandatory',
          )}
          value={value.questionMandatory}
          onChange={(value) =>
            doSaveProps({ questionMandatory: value })
          }
          forceValue
        />
        <CheckboxFormItem
          name={`${value.key}-attachment`}
          label={i18n(
            'entities.questionnaireTemplate.fields.attachment',
          )}
          value={value.attachment}
          onChange={(value) =>
            doSaveProps({ attachment: value })
          }
          forceValue
        />
        <CheckboxFormItem
          name={`${value.key}-attachment-mandatory`}
          label={i18n(
            'entities.questionnaireTemplate.fields.attachmentMandatory',
          )}
          value={value.attachmentMandatory}
          onChange={(value) =>
            doSaveProps({
              attachmentMandatory: value,
            })
          }
          forceValue
        />
        {!!value.type &&
          !questionnaireEnumerator.noScoreAnswerTypes.includes(
            value.type,
          ) &&
          entity.sections &&
          !!entity.sections.length && (
            <CheckboxFormItem
              name={`${value.key}-show-nested-questions-by-score-answer`}
              label={i18n(
                'entities.questionnaireTemplate.fields.showNestedQuestionsByScoreAnswer',
              )}
              value={value.showNestedQuestionsByScoreAnswer}
              onChange={(value) =>
                doSaveProps({
                  showNestedQuestionsByScoreAnswer: value,
                })
              }
              forceValue
            />
          )}
      </Grid>
    </Grid>
  );

  const renderAnswerItem = () => (
    <Grid container spacing={1.6}>
      <Grid item md={4} xs={12}>
        {questionnaireEnumerator.typeDefines[
          value.type
        ]?.render({
          ...value,
          key: `${value.key}-preview`,
          title: i18n(
            'entities.questionnaireTemplate.fields.answer',
          ),
          answer: safeValue(value, 'answer'),
          required: preview && value.questionMandatory,
          readOnly: readOnly,
          onChange: (newValue) => {
            setAnswer(newValue);
            !questionnaireEnumerator.noScoreAnswerTypes.includes(
              value.type,
            ) &&
              doSaveProps({
                answer: newValue,
              });
          },
          onBlur: () => {
            questionnaireEnumerator.noScoreAnswerTypes.includes(
              value.type,
            ) &&
              doSaveProps({
                answer,
              });
          },
        })}
      </Grid>
      <Grid item md={4} xs={12}>
        {readOnly ? (
          <TextViewItem
            label={i18n(
              'entities.questionnaireTemplate.fields.additionalInformation',
            )}
            value={value.additionalInformation ?? ''}
            multiline
          />
        ) : (
          <TextAreaFormItem
            label={i18n(
              'entities.questionnaireTemplate.fields.additionalInformation',
            )}
            onChange={setAdditionalInformation}
            onBlur={() =>
              doSaveProps({ additionalInformation })
            }
            rows={2}
            value={value.additionalInformation ?? ''}
            variant="standard"
            forceValue
          />
        )}
      </Grid>
      {value.attachment && (
        <Grid item md={4} xs={12}>
          {readOnly ? (
            <FilesViewItem
              columns={1}
              label={i18n(
                'entities.questionnaireTemplate.fields.attachment',
              )}
              value={value.attachments}
            />
          ) : (
            <FilesFormItem
              columns={1}
              name={`${value.key}-files-form-item`}
              label={i18n(
                'entities.questionnaireTemplate.fields.attachment',
              )}
              max={undefined}
              required={value.attachmentMandatory}
              storage={
                Storage.values.questionnaireAttachment
              }
              hidePlaceholder
            />
          )}
        </Grid>
      )}
    </Grid>
  );

  const onClose = () => setBulletModal(false);

  const onConfirm = (values) => {
    doSaveAll({
      bullet: values,
    });
    onClose();
  };

  const bullet = getBulletText(value.bullet, index, prefix);

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
            <Tooltip
              title={i18n(
                'entities.questionnaireTemplate.labels.cloneQuestion',
              )}
              disableInteractive
            >
              <IconButton
                color={color}
                size="small"
                onClick={() =>
                  doCloneQuestion && doCloneQuestion(index)
                }
                tabIndex={-1}
              >
                <ContentCopyIcon />
              </IconButton>
            </Tooltip>
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
                'entities.questionnaireTemplate.labels.addNestedQuestion',
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
        <MDBox my={1.6}>
          {preview || readOnly
            ? renderAnswerItem()
            : renderQuestionItemBuilder()}
        </MDBox>
        {((!preview && !readOnly) ||
          !value.showNestedQuestionsByScoreAnswer ||
          getScoreFromAnswers(value) ===
            getSafeScore(value)) && (
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
        )}
      </MDBox>
      {bulletModal && (
        <BulletModal
          bullet={value.bullet ?? {}}
          color={color}
          index={index}
          onClose={onClose}
          onConfirm={onConfirm}
          prefix={prefix}
          text={titleRef?.current?.value ?? value.title}
        />
      )}
    </MDBox>
  );
};

export default QuestionItem;

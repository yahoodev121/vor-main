import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import {
  JsonExporter,
  JSON_TYPE,
} from 'src/modules/shared/json/jsonExporter';
import {
  getSafeScore,
  getScoreFromAnswers,
  newQuestionnaireEntity,
  summarizeQuestionCount,
} from 'src/view/Questionnaire/common';
import { JsonImporter } from 'src/modules/shared/json/jsonImporter';
import { questionnaireEnumerator } from 'src/view/Questionnaire/enumerators';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { useFormContext } from 'react-hook-form';
import FieldSetViewItem from 'src/view/shared/view/FieldSetViewItem';
import formActions from 'src/modules/form/formActions';
import formSelectors from 'src/modules/form/formSelectors';
import lodash from 'lodash';
import MDAlert from 'src/mui/components/MDAlert';
import MDBox from 'src/mui/components/MDBox';
import MDButton from 'src/mui/components/MDButton';
import MDTypography from 'src/mui/components/MDTypography';
import Message from 'src/view/shared/message';
import PropTypes from 'prop-types';
import Sections from 'src/view/Questionnaire/components/Sections';
import SubSections from 'src/view/Questionnaire/components/SubSections';

const Questionnaire = forwardRef((props: any, ref) => {
  const { sidenavColor } = selectMuiSettings();
  const {
    name,
    onChange,
    preview,
    readOnly,
    value,
    visibleExportButton = true,
    visibleImportButton = true,
  } = props;

  const {
    control: { defaultValuesRef },
    getValues,
    register,
    setValue,
  } = useFormContext();

  const defaultValues = defaultValuesRef.current || {};

  const formValue = name ? getValues(name) : null;

  const generateEmptyQuestionnaire = () => {
    const emptyQuestionnaire = newQuestionnaireEntity();
    setValue(name, emptyQuestionnaire, {
      shouldValidate: false,
      shouldDirty: true,
    });
    return emptyQuestionnaire;
  };

  const getInitialValue = () =>
    ![null, undefined].includes(formValue)
      ? formValue
      : value ||
        defaultValues[name] ||
        generateEmptyQuestionnaire();

  const curValue = getInitialValue();

  const setAttachmentsAsFormValue = (entity) => {
    if (!entity) {
      return;
    }
    if (!entity.sections) {
      entity.sections = [];
    }
    if (!entity.questions) {
      entity.questions = {};
    }
    for (const section of entity.sections) {
      setAttachmentsAsFormValue(
        entity.questions[section.key],
      );
      if (!section.type || !section.attachment) {
        continue;
      }
      const formName = `${section.key}-files-form-item`;
      register(formName);
      setValue(formName, section.attachments ?? [], {
        shouldValidate: false,
        shouldDirty: true,
      });
    }
  };

  useEffect(() => {
    if (name) {
      register({ name });
      setAttachmentsAsFormValue(curValue);
    }
  }, [register, name]);

  const [sections, setSections] = useState(
    curValue.sections || [],
  );
  const [questions, setQuestions] = useState(
    curValue.questions || {},
  );
  const [sectionKey, setSectionKey] = useState(null);
  const [currentSection, setCurrentSection] =
    useState(null);

  const onChangeFormValue = (value) => {
    setValue(name, value, {
      shouldValidate: false,
      shouldDirty: true,
    });
    onChange && onChange(value);
  };

  const getSafeKey = (oKey, oSections = null) => {
    const rSections = oSections ?? sections;
    const existsKey = !!(rSections ?? []).find(
      ({ key }) => oKey === key,
    );
    const defaultKey =
      rSections && rSections.length
        ? rSections[0].key
        : null;
    return existsKey ? oKey : defaultKey;
  };

  const onChangeSection = (entity) => {
    summarizeQuestionCount(entity);
    setSections(entity.sections);
    setQuestions(entity.questions);
    onSelectSection(sectionKey);
    onChangeFormValue(entity);
    dispatch(formActions.doRefresh());
  };

  const onSelectSection = (key) => {
    setSectionKey(key);
    setCurrentSection(
      sections?.find(({ key: oKey }) => oKey === key) ??
        null,
    );
  };

  const onChangeSubSections = (entity) => {
    const newEntity = {
      sections,
      questions: {
        ...questions,
        [sectionKey]: entity,
      },
    };
    summarizeQuestionCount(newEntity);
    setSections(newEntity.sections);
    setQuestions(newEntity.questions);
    onChangeFormValue(newEntity);
  };

  const setAttachmentsOnRelatedQuestion = (entity) => {
    if (!entity) {
      return;
    }
    if (!entity.sections) {
      entity.sections = [];
    }
    if (!entity.questions) {
      entity.questions = {};
    }
    for (const section of entity.sections) {
      setAttachmentsOnRelatedQuestion(
        entity.questions[section.key],
      );
      if (!section.type || !section.attachment) {
        continue;
      }
      section.attachments = (
        getValues(`${section.key}-files-form-item`) ?? []
      ).map((file) => ({
        ...lodash.pick(file, ['id', 'new', 'title']),
        tags: (file.tags ?? []).map((tag) => tag.id ?? tag),
      }));
    }
  };

  const validateQuestions = (entity) => {
    if (!entity) {
      return true;
    }
    if (!entity.sections) {
      entity.sections = [];
    }
    if (!entity.questions) {
      entity.questions = {};
    }
    for (const section of entity.sections) {
      if (!!section.type) {
        if (
          section.questionMandatory &&
          (!section.answer || !section.answer.length)
        ) {
          Message.error(
            i18n(
              'entities.questionnaire.validations.required.answer',
              section.title,
            ),
          );
          return false;
        }
        if (
          section.attachmentMandatory &&
          (!section.attachments ||
            !section.attachments.length)
        ) {
          Message.error(
            i18n(
              'entities.questionnaire.validations.required.attachment',
              section.title,
            ),
          );
          return false;
        }
        if (
          !questionnaireEnumerator.noScoreAnswerTypes.includes(
            section.type,
          ) &&
          section.showNestedQuestionsByScoreAnswer &&
          getScoreFromAnswers(section) !==
            getSafeScore(section)
        ) {
          continue;
        }
      }
      if (
        !validateQuestions(entity.questions[section.key])
      ) {
        return false;
      }
    }
    return true;
  };

  const input = useRef<any>();

  const doExportToJSON = () => {
    JsonExporter.exportAsJSONFile(
      { sections, questions },
      'questionnaireTemplate',
    );
  };

  const doImportFromJSON = () => {
    if (!input) {
      return;
    }
    input.current?.click();
  };

  const dispatch = useDispatch();

  const onHandleChange = (event) => {
    const files = event.target.files;

    if (!files || !files.length) {
      return;
    }

    let file = files[0];

    JsonImporter.doReadFile(file).then((result) => {
      onChangeSection(result);
      onSelectSection(null);
      dispatch(formActions.doRefresh());
    });
  };

  const refresh = useSelector(formSelectors.selectRefresh);

  useEffect(() => {
    setAttachmentsAsFormValue(curValue);
    setSections(curValue.sections || []);
    setQuestions(curValue.questions || {});
    onSelectSection(
      getSafeKey(sectionKey, curValue.sections),
    );
  }, [refresh]);

  useImperativeHandle(ref, () => ({
    isValid() {
      const entity = { sections, questions };
      setAttachmentsOnRelatedQuestion(entity);
      return validateQuestions(entity);
    },
    getQuestionnaire() {
      const entity = { sections, questions };
      summarizeQuestionCount(entity);
      setAttachmentsOnRelatedQuestion(entity);
      return entity;
    },
    doExportToJSON() {
      doExportToJSON();
    },
    doImportFromJSON() {
      doImportFromJSON();
    },
  }));

  return (
    <Grid container spacing={1.6}>
      <Grid item xs={3}>
        <FieldSetViewItem>
          <Sections
            entity={{
              sections,
              questions,
            }}
            onChange={onChangeSection}
            onSelect={onSelectSection}
            preview={preview}
            readOnly={readOnly}
          />
        </FieldSetViewItem>
        {!readOnly && (
          <MDBox
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mt={1.6}
          >
            {visibleImportButton && (
              <MDButton
                variant="contained"
                color={sidenavColor}
                onClick={() => doImportFromJSON()}
              >
                {i18n(`common.import`)}
              </MDButton>
            )}
            <input
              style={{ display: 'none' }}
              accept={`${JSON_TYPE}`}
              type="file"
              onChange={onHandleChange}
              ref={input}
            />
            {visibleExportButton && (
              <MDButton
                variant="contained"
                color={sidenavColor}
                onClick={() => doExportToJSON()}
              >
                {i18n(`common.exportToJSON`)}
              </MDButton>
            )}
          </MDBox>
        )}
      </Grid>
      <Grid item xs={9}>
        {!preview && !readOnly && (
          <MDAlert color="secondary" dismissible>
            <MDTypography
              variant="body2"
              color="white"
              fontWeight="regular"
            >
              {i18n(
                'entities.questionnaire.hints.questionnaire',
              )}
            </MDTypography>
          </MDAlert>
        )}
        {Boolean(sectionKey) &&
        Boolean(questions[sectionKey]) ? (
          <SubSections
            title={currentSection?.title}
            entity={questions[sectionKey]}
            onChange={onChangeSubSections}
            preview={preview}
            readOnly={readOnly}
          />
        ) : (
          <MDAlert color="secondary" dismissible>
            <MDTypography
              variant="body2"
              color="white"
              fontWeight="regular"
            >
              {i18n(
                `entities.questionnaire.hints.${
                  readOnly
                    ? 'view'
                    : preview
                    ? 'answer'
                    : 'edit'
                }SectionInDetail`,
              )}
            </MDTypography>
          </MDAlert>
        )}
      </Grid>
    </Grid>
  );
});

Questionnaire.defaultProps = {
  visibleExportButton: true,
  visibleImportButton: true,
};

Questionnaire.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func,
  preview: PropTypes.bool,
  readOnly: PropTypes.bool,
  value: PropTypes.array,
  visibleExportButton: PropTypes.bool,
  visibleImportButton: PropTypes.bool,
};

export default Questionnaire;

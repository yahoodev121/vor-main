import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import RadioButtonFormItem from 'src/view/shared/form/items/RadioButtonFormItem';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';
import TextAreaFormItem from 'src/view/shared/form/items/TextAreaFormItem';
import TextViewItem from 'src/view/shared/view/TextViewItem';

const renderComponent = (Component, props) => {
  return props.readOnly ? (
    <TextViewItem
      {...props}
      multiline={Component === TextAreaFormItem}
      value={
        Array.isArray(props.value)
          ? props.value.join(', ')
          : props.value
      }
    />
  ) : (
    <Component {...props} variant="standard" forceValue />
  );
};

const defaultProps = ({
  answer,
  key,
  multiSelect,
  onBlur,
  onChange,
  readOnly,
  required,
  title,
}) => ({
  label: title,
  mode: multiSelect ? 'multiple' : undefined,
  name: key,
  onBlur,
  onChange,
  readOnly,
  required,
  value: answer,
});

const generateRadioOptions = (values) =>
  (values || []).map((value) => ({ value, label: value }));

export const INPUT_TYPE = {
  INPUT: 'input',
  TEXTAREA: 'textarea',
  CONFIRM3: 'yes/no/N/A',
  CONFIRM2: 'yes/no',
  SELECT: 'select',
};

export const questionnaireEnumerator = {
  noScoreAnswerTypes: [
    INPUT_TYPE.INPUT,
    INPUT_TYPE.TEXTAREA,
  ],
  types: [
    INPUT_TYPE.INPUT,
    INPUT_TYPE.TEXTAREA,
    INPUT_TYPE.CONFIRM3,
    INPUT_TYPE.CONFIRM2,
    INPUT_TYPE.SELECT,
  ],
  typeDefines: {
    input: {
      Component: InputFormItem,
      solid: true,
      values: null,
      render: (props) =>
        renderComponent(InputFormItem, defaultProps(props)),
    },
    textarea: {
      Component: TextAreaFormItem,
      solid: true,
      values: null,
      render: (props) =>
        renderComponent(
          TextAreaFormItem,
          defaultProps(props),
        ),
    },
    'yes/no/N/A': {
      Component: RadioButtonFormItem,
      solid: true,
      values: ['Yes', 'No', 'N/A'],
      render: (props) =>
        renderComponent(RadioButtonFormItem, {
          ...defaultProps(props),
          bgColor: 'success',
          color: 'white',
          options: generateRadioOptions(
            questionnaireEnumerator.typeDefines[
              'yes/no/N/A'
            ].values,
          ),
        }),
    },
    'yes/no': {
      Component: RadioButtonFormItem,
      solid: true,
      values: ['Yes', 'No'],
      render: (props) =>
        renderComponent(RadioButtonFormItem, {
          ...defaultProps(props),
          bgColor: 'success',
          color: 'white',
          options: generateRadioOptions(
            questionnaireEnumerator.typeDefines['yes/no']
              .values,
          ),
        }),
    },
    select: {
      Component: SelectFormItem,
      values: [],
      render: (props) =>
        renderComponent(SelectFormItem, {
          ...defaultProps(props),
          options: props.options || [],
        }),
    },
  },
};

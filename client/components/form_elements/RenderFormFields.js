import {
  FormBuilderTextInput as TextInput,
  SelectInput,
  CheckBoxInput,
  RadioInput,
  TextAreaInput,
} from '../shared';

const INPUT_TYPE = {
  text: TextInput,
  checkbox: CheckBoxInput,
  radio: RadioInput,
  select: SelectInput,
  textarea: TextAreaInput,
};

export default function RenderFormFields({
  form_elements,
  register = () => {},
}) {
  const buildComponent = (element) => {
    let FieldComponent = INPUT_TYPE[element.field_type] || TextInput;
    return <FieldComponent key={element.id} register={register} {...element} />;
  };
  return form_elements.map((element) => buildComponent(element));
}

/* eslint-disable react/require-default-props */
import { FC, ChangeEventHandler } from 'react';
import { StyledComponent } from 'styled-components';

// Styles
import {
  FirstFormGroup,
  FormGroup,
  Label,
  Input as InputField,
  LastFormGroup,
} from './styles';

type Props = {
  forId: string;
  labelText: string;
  inputType: 'password' | 'text';
  formGroupPosition?: 'first' | 'last';
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value: string;
  name: string;
};

type StyledComponentType = StyledComponent<'div', any, {}, never>;

const Input: FC<Props> = ({
  forId,
  labelText,
  inputType,
  formGroupPosition,
  onChange,
  value,
  name,
}) => {
  let FormGroupType: StyledComponentType = FormGroup;
  const labelUp: boolean = !(value === '');

  if (formGroupPosition) {
    FormGroupType = formGroupPosition === 'first' ? FirstFormGroup : LastFormGroup;
  }

  return (
    <FormGroupType>
      <Label htmlFor={forId} up={labelUp}>
        {labelText}
      </Label>
      <InputField
        name={name}
        type={inputType}
        id={forId}
        onChange={onChange}
        value={value}
        autoComplete="off"
      />
    </FormGroupType>
  );
};

export default Input;

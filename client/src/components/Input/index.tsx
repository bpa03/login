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
  disabled: boolean;
  error: boolean;
};

type StyledComponentType = StyledComponent<'div', any, { hasError: boolean }, never>;

const Input: FC<Props> = ({
  forId,
  labelText,
  inputType,
  formGroupPosition,
  onChange,
  value,
  name,
  disabled,
  error,
}) => {
  let FormGroupType: StyledComponentType = FormGroup;
  const labelUp: boolean = !(value === '');

  if (formGroupPosition) {
    FormGroupType = formGroupPosition === 'first' ? FirstFormGroup : LastFormGroup;
  }

  return (
    <FormGroupType hasError={error}>
      <Label htmlFor={forId} up={labelUp} hasError={error}>
        {labelText}
      </Label>
      <InputField
        name={name}
        type={inputType}
        id={forId}
        onChange={onChange}
        value={value}
        autoComplete="off"
        disabled={disabled}
      />
    </FormGroupType>
  );
};

export default Input;

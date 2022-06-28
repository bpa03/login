/* eslint-disable react/require-default-props */
import { FC, ChangeEventHandler, useMemo } from 'react';
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
  error: { message: string; param: string }[];
};

type StyledComponentType = StyledComponent<
  'div',
  any,
  { hasError: boolean },
  never
>;

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

  const fieldError = useMemo(
    () => error.find((err) => err.param === name),
    [error],
  );
  const hasError = !!fieldError;

  return (
    <FormGroupType hasError={hasError}>
      <Label htmlFor={forId} up={labelUp} hasError={hasError}>
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

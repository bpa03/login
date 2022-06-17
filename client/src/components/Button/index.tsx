import { FC, ReactNode } from 'react';

// Styles
import { ButtonField } from './styles';

interface Props {
  buttonType: 'submit' | 'button';
  children: ReactNode | string;
  disabled: boolean;
}

const Button: FC<Props> = ({ buttonType, children, disabled }) => (
  <ButtonField type={buttonType} disabled={disabled}>
    {children}
  </ButtonField>
);

export default Button;

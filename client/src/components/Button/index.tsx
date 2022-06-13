import { FC, ReactNode } from 'react';

// Styles
import { ButtonField } from './styles';

type Props = {
  buttonType: 'submit' | 'button';
  children: ReactNode | string;
};

const Button: FC<Props> = ({ buttonType, children }) => (
  <ButtonField type={buttonType}>{children}</ButtonField>
);

export default Button;

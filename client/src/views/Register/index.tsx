import { FC, useState } from 'react';
// Generic Components
import Input from 'components/Input';
import Button from 'components/Button';
// Hooks
import { useNavigate } from 'react-router-dom';
import useForm from 'hooks/useForm';
import useAuth from 'hooks/useAuth';
import { useAppDispatch } from 'app/hooks';
// Thunk Action Creator
import { thunkRegisterUser, setCredentials, setError } from 'app/features/auth';
import { ErrorResponse } from 'app/services/interfaces';

// Styles
import {
  Container,
  BgImage,
  Form,
  FormWrapper,
  FormTitle,
  FormSlogan,
} from './styles';

type FormType = {
  email: string;
  password: string;
  repeatPassword: string;
  name: string;
  lastName: string;
};

const Register: FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [errors, setErrors] = useState<ErrorResponse | null>(null);
  const [formValues, handleChange, handleSubmit] = useForm<FormType>(
    {
      email: '',
      password: '',
      name: 'Baldassare',
      lastName: 'Pugliese',
      repeatPassword: '',
    },
    async ({
      email, password, name, lastName,
    }): Promise<void> => {
      try {
        const credentialsRegister = {
          email, password, name, lastName,
        };
        const res = await dispatch(
          thunkRegisterUser(credentialsRegister),
        ).unwrap();
        if (res.success) {
          dispatch(setCredentials(res));
          navigate('/dashboard', { replace: true });
        }
      } catch (error) {
        dispatch(setError());
        setErrors(error as ErrorResponse);
      }
    },
  );

  const { email, password, repeatPassword } = formValues;
  const { authLoading } = auth;

  return (
    <Container>
      <FormWrapper>
        <div>
          <FormTitle>Registrarse</FormTitle>
          <FormSlogan>
            Regístrate para empezar a usar nuestros servicios
          </FormSlogan>
        </div>
        <Form onSubmit={handleSubmit}>
          <div>
            <Input
              labelText="Username"
              name="email"
              forId="email"
              inputType="text"
              formGroupPosition="first"
              onChange={handleChange}
              value={email}
              disabled={authLoading}
            />
            <Input
              labelText="Password"
              name="password"
              forId="password"
              inputType="password"
              onChange={handleChange}
              value={password}
              disabled={authLoading}
            />
            <Input
              labelText="Repeat Password"
              name="repeatPassword"
              forId="repeat-password"
              inputType="password"
              formGroupPosition="last"
              onChange={handleChange}
              value={repeatPassword}
              disabled={authLoading}
            />
          </div>
          <div>
            <Button buttonType="submit" disabled={authLoading}>
              Registrarse
            </Button>
          </div>
        </Form>
      </FormWrapper>
      <BgImage />
    </Container>
  );
};

export default Register;

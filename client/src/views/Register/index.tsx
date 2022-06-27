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
  FormLink,
  Span,
  LinkWrapper,
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
      name: '',
      lastName: '',
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

  const {
    email, password, repeatPassword, name, lastName,
  } = formValues;
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
              labelText="Name"
              name="name"
              forId="name"
              inputType="text"
              onChange={handleChange}
              value={name}
              disabled={authLoading}
            />
            <Input
              labelText="Lastname"
              name="lastName"
              forId="lastName"
              inputType="text"
              onChange={handleChange}
              value={lastName}
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
          <LinkWrapper>
            <Span>¿Tienes cuenta?</Span>
            <FormLink to="/login">Inicia Sesión</FormLink>
          </LinkWrapper>
          <div>
            <Button buttonType="submit" disabled={authLoading}>
              Iniciar Sesión
            </Button>
          </div>
        </Form>
      </FormWrapper>
      <BgImage />
    </Container>
  );
};

export default Register;

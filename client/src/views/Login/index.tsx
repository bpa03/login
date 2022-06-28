import { FC, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
// Generic Components
import Input from 'components/Input';
import Button from 'components/Button';
// Hooks
import { useNavigate } from 'react-router-dom';
import useForm from 'hooks/useForm';
import useAuth from 'hooks/useAuth';
import { useAppDispatch } from 'app/hooks';
// Thunk Action creator
import { thunkLoginUser, setError, setCredentials } from 'app/features/auth';
import { ErrorResponse } from 'app/services/interfaces';

// Styles
import {
  Container,
  Form,
  FormSlogan,
  FormTitle,
  FormWrapper,
  BgImage,
  FormLink,
  Span,
  LinkWrapper,
} from './styles';

interface FormType {
  email: string;
  password: string;
}

const Login: FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [hasError, setHasError] = useState<boolean | null>(null);
  const [formValues, handleChange, handleSubmit] = useForm<FormType>(
    {
      email: '',
      password: '',
    },
    async ({ email, password }): Promise<void> => {
      try {
        const credentialsLogin = { email, password };
        const response = await dispatch(
          thunkLoginUser(credentialsLogin),
        ).unwrap();
        if (response.success) {
          dispatch(setCredentials(response));
          navigate('/dashboard', { replace: true });
        }
      } catch (error) {
        dispatch(setError());
        setHasError(true);
        const err = error as ErrorResponse;
        toast(err.message, {
          type: 'error',
        });
      }
    },
  );

  const { email, password } = formValues;
  const { authLoading } = auth;

  return (
    <Container>
      <FormWrapper>
        <div>
          <FormTitle>Iniciar Sesión</FormTitle>
          <FormSlogan>
            Inicia Sesión para seguir usando nuestros servicios
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
              error={!!hasError}
            />
            <Input
              labelText="Password"
              name="password"
              forId="password"
              inputType="password"
              formGroupPosition="last"
              onChange={handleChange}
              value={password}
              disabled={authLoading}
              error={!!hasError}
            />
          </div>
          <LinkWrapper>
            <Span>¿Aún no tienes cuenta?</Span>
            <FormLink to="/register">Registrate</FormLink>
          </LinkWrapper>
          <div>
            <Button buttonType="submit" disabled={authLoading}>
              Iniciar Sesión
            </Button>
          </div>
        </Form>
      </FormWrapper>
      <BgImage />
      <ToastContainer
        autoClose={3000}
        closeButton
        closeOnClick
      />
    </Container>
  );
};

export default Login;

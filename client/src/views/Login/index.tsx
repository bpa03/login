import { FC } from 'react';
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
} from './styles';

interface FormType {
  email: string;
  password: string;
}

const Login: FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
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
        dispatch(setError({ errors: error as ErrorResponse }));
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
            />
          </div>
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

export default Login;

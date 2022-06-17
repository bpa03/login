import { FC } from 'react';
import Input from 'components/Input';
import Button from 'components/Button';
// Hooks
import useForm from 'hooks/useForm';
import useAuth from 'hooks/useAuth';
import { useAppDispatch } from 'app/hooks';
import { useNavigate } from 'react-router-dom';
// Thunk Action Creator
import { thunkRegisterUser } from 'app/features/auth';

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
};

const Register: FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [formValues, handleChange, handleSubmit] = useForm<FormType>(
    {
      email: '',
      password: '',
      repeatPassword: '',
    },
    async (values) => {
      dispatch(
        thunkRegisterUser({
          email: values.email,
          password: values.password,
        }),
      );
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

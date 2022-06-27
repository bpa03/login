import { FC, useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

// Hooks
import useAuth from 'hooks/useAuth';
import { useAppDispatch } from '../hooks';
// Thunk Action creators
import { setCredentials, setError, thunkAuthorizeUser } from '../features/auth';
import { ErrorResponse } from '../services/interfaces';

const RequireAuth: FC<{}> = () => {
  const auth = useAuth();
  const dispatch = useAppDispatch();
  const [errors, setErrors] = useState<ErrorResponse | null>(null);
  const { authLoading, isAuth } = auth;

  useEffect(() => {
    if (auth.isAuth && auth.token) {
      return;
    }

    const request = async () => {
      try {
        const response = await dispatch(thunkAuthorizeUser(null)).unwrap();
        dispatch(setCredentials(response));
      } catch (err) {
        dispatch(setError());
        setErrors(err as ErrorResponse);
      }
    };

    request();
  }, []);

  if ((!isAuth || authLoading) && !errors) {
    return null;
  }

  if (!isAuth) {
    return <Navigate to="/login" replace state={{ redirected: true }} />;
  }

  return <Outlet />;
};

export default RequireAuth;

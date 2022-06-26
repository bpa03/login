import { FC, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

// hooks
import { useAppDispatch } from '../hooks';
// Thunk action creators
import { thunkAuthorizeUser, setCredentials, setError } from './auth';

const IsAuthenticated: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const request = async () => {
      try {
        const response = await dispatch(thunkAuthorizeUser(null)).unwrap();
        if (response.success) {
          dispatch(setCredentials(response));
          navigate('/', { replace: true });
        }
      } catch (error) {
        setLoading(false);
        dispatch(setError());
      }
    };

    request();
  }, []);

  if (loading) {
    return null;
  }

  return <Outlet />;
};

export default IsAuthenticated;

import { FC, useEffect, useState } from 'react';
import {
  Outlet, useNavigate, useLocation, Location,
} from 'react-router-dom';

// hooks
import { useAppDispatch } from '../hooks';
// Thunk action creators
import { thunkAuthorizeUser, setCredentials, setError } from './auth';

interface LocationType extends Location {
  state: {
    fromLogout?: boolean;
    redirected?: boolean;
  };
}

const IsAuthenticated: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation() as LocationType;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const state = location.state ?? {};
    const { fromLogout = false, redirected = false } = state;

    if (fromLogout || redirected) {
      setLoading(false);
      return;
    }

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

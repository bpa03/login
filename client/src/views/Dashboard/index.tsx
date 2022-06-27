import { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Hooks
import { useAppDispatch } from 'app/hooks';
import useAuth from 'hooks/useAuth';
// Thunk Actions creators
import { deleteCredentials, thunkLogoutUser } from 'app/features/auth';
import { ErrorResponse } from 'app/services/interfaces';

const Dashboard: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const auth = useAuth();
  const [errors, setErrors] = useState<ErrorResponse | null>(null);

  const logoutUser = async () => {
    try {
      await dispatch(thunkLogoutUser(null));
      dispatch(deleteCredentials());
      navigate('/login', { replace: false, state: { fromLogout: true } });
    } catch (error) {
      setErrors(error as ErrorResponse);
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <Link to="/">Home</Link>
      <br />
      <button onClick={logoutUser} disabled={auth.authLoading}>
        Click here to logout
      </button>
    </div>
  );
};

export default Dashboard;

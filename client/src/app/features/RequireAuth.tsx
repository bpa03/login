import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from 'hooks/useAuth';

const RequireAuth: FC<{}> = () => {
  const auth = useAuth();
  if (!auth.isAuth) {
    return <Navigate to="/register" replace />;
  }

  return <Outlet />;
};

export default RequireAuth;

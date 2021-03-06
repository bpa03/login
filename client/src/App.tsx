import { FC, Fragment } from 'react';
import { Routes, Route } from 'react-router-dom';
import RequireAuth from 'app/features/RequireAuth';
import IsAuthenticated from 'app/features/IsAuthenticated';
// Global Styles
import GlobalStyles from './GlobalStyles';
// Views
import Register from '@/views/Register';
import Login from '@/views/Login';
import Dashboard from '@/views/Dashboard';
import Home from '@/views/Home';

const App: FC = () => (
  <Fragment>
    <Routes>
      <Route element={<RequireAuth />}>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
      <Route element={<IsAuthenticated />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
    <GlobalStyles />
  </Fragment>
);

export default App;

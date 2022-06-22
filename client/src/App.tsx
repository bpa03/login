import { FC, Fragment } from 'react';
import { Routes, Route } from 'react-router-dom';
import RequireAuth from 'app/features/RequireAuth';
// Global Styles
import GlobalStyles from './GlobalStyles';
// Views
import Register from '@/views/Register';
import Login from '@/views/Login';

const Home = () => <h1>Home</h1>;
const DashBoard = () => <h1>Dashboard</h1>;

const App: FC = () => (
  <Fragment>
    <Routes>
      <Route element={<RequireAuth />}>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<DashBoard />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
    <GlobalStyles />
  </Fragment>
);

export default App;

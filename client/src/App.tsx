import { FC, Fragment } from 'react';
import { Routes, Route } from 'react-router-dom';

// Global Styles
import GlobalStyles from './GlobalStyles';
// Views
import Register from '@/views/Register';

const Home = () => <h1>Home</h1>;
const Login = () => <h1>Login</h1>;

const App: FC = () => (
  <Fragment>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
    <GlobalStyles />
  </Fragment>
);

export default App;

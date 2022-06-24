import { FC } from 'react';
import { Link } from 'react-router-dom';

const Home: FC = () => (
  <div>
    <h1>Home</h1>
    <Link to="/dashboard">
      Dashboard
    </Link>
  </div>
);

export default Home;

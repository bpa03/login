import { FC } from 'react';
import { Link } from 'react-router-dom';

const Dashboard: FC = () => (
  <div>
    <h1>Dashboard</h1>
    <Link to="/">
      Home
    </Link>
  </div>
);

export default Dashboard;

import express, { Application } from 'express';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({
  debug: true,
  override: true,
  path: path.resolve(__dirname, '../.env'),
});

const App: Application = express();
App.set('PORT', process.env.PORT || 3000);

// Middlewares
App.use(express.json());
App.use(express.urlencoded({ extended: true }));

App.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello, World! '});
})

App.listen(App.get('PORT'), () => {
  console.log('Server listen on port ' + App.get('PORT'));
})

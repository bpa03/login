import express, { Application as ExpressApp } from 'express';

// Env file config
import './config';
// Database
import connect from './database';
class Application {
  application: ExpressApp = express();

  constructor() {
    this.middlewares();
    this.loadConfig();
    this.loadRoutes();
    this.loadDB();
  }

  private middlewares(): void {
    this.application.use(express.json());
    this.application.use(express.urlencoded({ extended: true }));
  }

  private loadConfig(): void {
    this.application.set('PORT', process.env.PORT ?? 3000);
  }

  private loadDB(): void {
    connect();
  }

  private loadRoutes(): void {
    this.application.get('/', (req, res) => {
      res.status(200).json({ message: 'Hello, World! ' });
    });
  }

  public runServer(): void {
    const PORT: number = this.application.get('PORT') as number;
    this.application.listen(PORT, () => {
      console.log('Server running on PORT ' + PORT);
    });
  }
}

export default new Application();

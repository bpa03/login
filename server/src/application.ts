import express, { Application as ExpressApp } from 'express';
import path from 'path';
import dotenv from 'dotenv';

class Application {
  application: ExpressApp = express();

  constructor() {
    this.loadConfig();
    this.middlewares();
    this.loadRoutes();
    this.application.set('PORT', process.env.PORT || 3000);
  }

  private middlewares(): void {
    this.application.use(express.json());
    this.application.use(express.urlencoded({ extended: true }));
  }

  private loadConfig(): void {
    dotenv.config({
      path: path.resolve(__dirname, '../.env'),
      debug: true,
    });
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

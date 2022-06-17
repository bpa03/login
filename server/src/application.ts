import express, { Application as ExpressApp } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { errorLogger, errorMiddleware } from './middlewares/errorMiddleware';
// Env file config
import './config';
// Routes
import routes from './routes';
class Application {
  application: ExpressApp = express();

  constructor() {
    this.middlewares();
    this.loadConfig();
    this.loadRoutes();
    this.loadErrorHandlers();
  }

  private middlewares(): void {
    this.application.use(cors({
      origin: 'http://localhost:3000',
    }))
    this.application.use(express.json());
    this.application.use(express.urlencoded({ extended: true }));
    if (process.env.NODE_ENV === 'development') {
      this.application.use(
        morgan('dev')
      );
    }
  }

  private loadConfig(): void {
    this.application.set('PORT', process.env.PORT ?? 3000);
  }

  private loadRoutes(): void {
    this.application.use('/api', routes);
  }

  private loadErrorHandlers(): void {
    this.application.use(errorLogger);
    this.application.use(errorMiddleware);
  }

  public runServer(): void {
    const PORT: number = this.application.get('PORT') as number;
    this.application.listen(PORT, () => {
      console.log('Server running on PORT ' + PORT);
    });
  }
}

export default new Application();

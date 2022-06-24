import express, { Application as ExpressApp } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import session from 'express-session';

// Env file config
import './config';
// Session Store
import { connectDB } from './database/index';
import { Store, CookiesOptions } from './models/Sessions';
import { errorLogger, errorMiddleware } from './middlewares/errorMiddleware';
// Routes
import routes from './routes';

class Application {
  application: ExpressApp = express();
  prefix: string = 'v1';

  constructor() {
    this.connectDB();
    this.middlewares();
    this.loadConfig();
    this.loadRoutes();
    this.loadErrorHandlers();
  }

  private middlewares(): void {
    this.application.use(
      cors({
        origin: 'http://localhost:3000',
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        maxAge: 60 * 60 * 1000 * 24,
        optionsSuccessStatus: 204,
      })
    );
    this.application.use(express.json());
    this.application.use(express.urlencoded({ extended: true }));
    this.application.use(
      session({
        store: Store,
        secret: process.env.SESSION_SECRET ?? '',
        name: 'SSID',
        cookie: CookiesOptions,
      })
    );
    if (process.env.NODE_ENV === 'development') {
      this.application.use(morgan('dev'));
    }
  }

  private loadConfig(): void {
    this.application.set('PORT', process.env.PORT ?? 3000);
  }

  private loadRoutes(): void {
    this.application.use('/api/' + this.prefix, routes);
  }

  private async connectDB() {
    await connectDB();
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

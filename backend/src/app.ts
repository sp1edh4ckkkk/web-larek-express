import express, {
    Request,
    Response,
    NextFunction,
  } from 'express';
  import cors from 'cors';
  import mongoose from 'mongoose';
  import path from 'path';
  import { errors } from 'celebrate';
  
  import { DB_ADDRESS, PORT } from './config';
  import router from './routes';
  import errorHandler from './middlewares/error-handler';
  import NotFoundError from './errors/not-found-error';
  import { requestLogger, errorLogger } from './middlewares/logger';
  
  const app = express();
  
  app.use(cors());
  app.use(express.json());
  
  const publicPath = path.join(__dirname, 'public');
  app.use(express.static(publicPath));
  
  app.use(requestLogger);
  
  app.use(router);
  
  app.use(
    (_req: Request, _res: Response, next: NextFunction) => {
      next(new NotFoundError('Маршрут не найден'));
    },
  );
  
  app.use(errorLogger);
  
  app.use(errors());
  
  app.use(errorHandler);
  
  mongoose.connect(DB_ADDRESS)
    .then(() => app.listen(Number(PORT)))
    .catch(() => {});
  
  export default app;
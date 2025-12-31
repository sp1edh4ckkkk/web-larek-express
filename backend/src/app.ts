import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import { DB_ADDRESS, PORT } from './config';
import { requestLogger, errorLogger } from './middlewares/logger';
import routesProduct from './routes/products';
import routesOrder from './routes/orders';
import errorHandler from './middlewares/error-middleware';
import NotFoundError from './controllers/errors/not-found-error';

const app = express();
mongoose.connect(DB_ADDRESS);

app.use(requestLogger);

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/product', routesProduct);
app.use('/order', routesOrder);

app.use((_req: Request, _res: Response, next: NextFunction) => {
  next(new NotFoundError('Ресурс не найден'));
});

app.use(errorLogger);

app.use(errorHandler);

app.listen(PORT, () => { console.log(`Listening on port ${PORT}`); });
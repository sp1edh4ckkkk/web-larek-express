import { Request, Response, NextFunction } from 'express';
import { Error as MongooseError } from 'mongoose';
import BadRequestError from '../errors/bad-request-error';
import ConflictError from '../errors/conflict-error';
import NotFoundError from '../errors/not-found-error';

const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof BadRequestError) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  if (err instanceof NotFoundError) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  if (err instanceof ConflictError) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  if (err instanceof MongooseError.ValidationError) {
    return res.status(400).json({ message: 'Ошибка валидации данных при создании товара' });
  }
  return res.status(500).json({ message: 'Непредвиденная ошибка на сервере.' });
};

export default errorHandler;

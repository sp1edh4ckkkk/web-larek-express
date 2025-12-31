import { Request, Response, NextFunction } from 'express';
import { Error as MongooseError } from 'mongoose';
import BadRequestError from '../errors/bad-request-error';
import NotFoundError from '../errors/not-found-error';
import ConflictError from '../errors/conflict-error';

const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  if (error instanceof BadRequestError) {
    res.status(error.statusCode).json({ message: error.message });
    return;
  }

  if (error instanceof NotFoundError) {
    res.status(error.statusCode).json({ message: error.message });
    return;
  }

  if (error instanceof ConflictError) {
    res.status(error.statusCode).json({ message: error.message });
    return;
  }

  if (error instanceof MongooseError.ValidationError) {
    res
      .status(400)
      .json({ message: 'Ошибка валидации данных при создании товара' });
    return;
  }

  if (error instanceof Error && error.message.includes('E11000')) {
    res
      .status(409)
      .json({ message: 'Ошибка: товар с таким title уже существует' });
    return;
  }

  res.status(500).json({ message: 'Ошибка сервера по умолчанию' });
};

export default errorHandler;

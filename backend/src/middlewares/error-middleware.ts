import { Request, Response, NextFunction } from 'express';
import { isCelebrateError } from 'celebrate';
import BadRequestError from '../controllers/errors/bad-request-error';
import NotFoundError from '../controllers/errors/not-found-error';
import ConflictError from '../controllers/errors/conflict-error';

const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (isCelebrateError(err)) {
    if (err.details.has('body')) {
      const errors = err.details.get('body')?.message;
      if (errors && errors.length > 0) {
        return res.status(400).json({ message: errors });
      }
    }
    return res.status(400).json({ message: 'Ошибка валидации данных запроса' });
  }

  if (err instanceof BadRequestError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  if (err instanceof NotFoundError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  if (err instanceof ConflictError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  return res.status(500).json({ message: 'Непредвиденная ошибка не сервере' });
};

export default errorHandler;
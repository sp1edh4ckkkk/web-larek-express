import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import { RequestHandler, ErrorRequestHandler } from 'express';

export const requestLogger: RequestHandler = expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: 'request.log' }),
  ],
  format: winston.format.json(),
});

export const errorLogger: ErrorRequestHandler = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: 'error.log' }),
  ],
  format: winston.format.json(),
});

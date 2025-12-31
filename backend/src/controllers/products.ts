import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Product from '../models/product';
import BadRequestError from './errors/bad-request-error';
import ConflictError from './errors/conflict-error';

export const getProducts = (_req: Request, res: Response, next: NextFunction) => Product.find({})
  .select('title image.fileName image.originalName category description price _id')
  .then((productsList) => res.status(200).send({ items: productsList, total: productsList.length }))
  .catch((err) => next(err));

export const createProduct = (req: Request, res: Response, next: NextFunction) => {
  const bodyObject = req.body;

  return Product.create(bodyObject)
    .then((product) => res.status(201).send({ product }))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError(err.message));
      }

      if (err instanceof Error && err.message.includes('E11000')) {
        next(new ConflictError('Товар с таким названием уже существует'));
      }

      next(err);
    });
};
import {
  Request,
  Response,
  NextFunction,
} from 'express';
import mongoose, { Error as MongooseError } from 'mongoose';
import Product from '../models/product';
import BadRequestError from '../errors/bad-request-error';
import ConflictError from '../errors/conflict-error';

type ImageInfo = {
  fileName: string;
  originalName: string;
};

type CreateProductBody = {
  title: string;
  image: ImageInfo;
  category: string;
  description?: string;
  price?: number | null;
};

export const getProducts = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const products = await Product.find();
    res.json({
      items: products,
      total: products.length,
    });
  } catch (error) {
    next(error as Error);
  }
};

export const createProduct = async (
  req: Request<unknown, unknown, CreateProductBody>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      title,
      image,
      category,
      description,
      price,
    } = req.body;

    const product = await Product.create({
      title,
      image,
      category,
      description,
      price,
    });

    res.status(201).json(product);
  } catch (error: unknown) {
    if (error instanceof MongooseError.ValidationError
      || error instanceof mongoose.Error.ValidationError) {
      next(new BadRequestError('Ошибка валидации данных при создании товара'));
      return;
    }

    if (error instanceof Error && error.message.includes('E11000')) {
      next(new ConflictError('Ошибка: товар с таким title уже существует'));
      return;
    }

    next(error as Error);
  }
};

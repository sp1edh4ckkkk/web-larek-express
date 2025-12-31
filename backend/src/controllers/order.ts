import { Request, Response, NextFunction } from 'express';
import { faker } from '@faker-js/faker';
import mongoose from 'mongoose';
import Product from '../models/product';
import BadRequestError from '../errors/bad-request-error';

type OrderBody = {
  payment: 'card' | 'online';
  email: string;
  phone: string;
  address: string;
  total: number;
  items: string[];
};

const createOrder = async (
  req: Request<unknown, unknown, OrderBody>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { total, items } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      next(new BadRequestError('Список товаров не может быть пустым'));
      return;
    }

    const products = await Product.find({ _id: { $in: items } });

    if (products.length !== items.length) {
      next(new BadRequestError('Некоторые товары не найдены'));
      return;
    }

    const prices = products.map((p) => p.price);

    if (prices.some((p) => p === null || p === undefined)) {
      next(new BadRequestError('В заказе есть товар без цены'));
      return;
    }

    const sum = (prices as number[]).reduce((acc, p) => acc + p, 0);

    if (sum !== total) {
      next(new BadRequestError('Сумма заказа не совпадает с total'));
      return;
    }

    const orderId = faker.string.uuid();

    res.status(200).json({
      id: orderId,
      total: sum,
    });
  } catch (err: unknown) {
    if (err instanceof mongoose.Error.CastError) {
      next(new BadRequestError('Неверный формат id товара'));
      return;
    }

    next(err as Error);
  }
};

export default createOrder;
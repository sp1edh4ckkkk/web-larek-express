import { NextFunction, Request, Response } from 'express';
import { isEmail } from 'validator';
import { faker } from '@faker-js/faker';
import Product from '../models/product';
import BadRequestError from './errors/bad-request-error';

enum TPayment {
    Card = 'card',
    Online = 'online',
}

interface IOrder {
  payment: TPayment,
  email: string,
  phone: string,
  address: string,
  total: number,
  items: string[],
}

type TOrderKeys = keyof IOrder;

interface IResOrder {
    id: string,
    total: number
}

export const validateData = async (data: IOrder): Promise<string> => {
  const {
    payment, email, total, items,
  } = data;

  const fields: TOrderKeys[] = Object.keys(data) as TOrderKeys[];

  const isFieldEmpty = fields.find((key) => {
    if (!data[key] && key !== 'items') {
      return key;
    }
    return false;
  });

  if (isFieldEmpty) {
    return `Поле ${isFieldEmpty} не может быть пустым`;
  }

  if (!Object.values(TPayment).includes(payment)) {
    return 'Некорректный тип оплаты в поле payment';
  }

  if (!isEmail(email)) {
    return 'Некорректный email';
  }

  if (items.length !== 0) {
    const products = items.map(async (item) => {
      try {
        const product = await Product.findById(item).select('title price');
        if (!product) {
          return `Товар ${item} не найден`;
        }

        if (product.price === null) {
          return `Товар '${product.title}' нельзя купить`;
        }

        return product.price;
      } catch {
        return 'Непредвиденная ошибка на сервере';
      }
    });

    const dbProductAnswers = await Promise.all(products);

    const productError = dbProductAnswers.find((answer) => typeof answer === 'string');
    if (productError) {
      return productError.toString();
    }
    const price = dbProductAnswers.reduce((sum: number, productAnswer:
      string | number | undefined) => {
      if (typeof productAnswer === 'number') {
        return sum + productAnswer;
      }
      return sum;
    }, 0);

    if (price !== total) {
      return `Общая стоимость товаров ${price} не соответствует сумме заказа ${total}`;
    }
  } else {
    return 'Поле items не может быть пустым';
  }

  return '';
};

export const postOrder = async (req: Request, res: Response, next: NextFunction) => {
  const { body } = req;
  const validationResult = await validateData(body);
  if (validationResult) {
    return next(new BadRequestError(validationResult));
  }
  const responce: IResOrder = {
    id: faker.string.uuid(),
    total: body.total,
  };

  return res.status(200).json({ ...responce });
};

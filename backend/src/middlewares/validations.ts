import { celebrate, Joi, Segments } from 'celebrate';

export const validateCreateOrder = celebrate({
  [Segments.BODY]: Joi.object({
    payment: Joi.string().valid('card', 'online').required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    address: Joi.string().required(),
    total: Joi.number().min(0).required(),
    items: Joi.array()
      .items(
        Joi.string()
          .length(24)
          .hex()
          .required(),
      )
      .min(1)
      .required(),
  }).required(),
});

export const validateCreateProduct = celebrate({
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(2).max(30).required(),
    image: Joi.object({
      fileName: Joi.string().required(),
      originalName: Joi.string().required(),
    }).required(),
    category: Joi.string().required(),
    description: Joi.string().allow('').optional(),
    price: Joi.number().allow(null).optional(),
  }).required(),
});

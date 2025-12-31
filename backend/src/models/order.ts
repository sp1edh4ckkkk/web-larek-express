import Joi from 'joi';

const orderSchemaJoi = Joi.object({
  payment: Joi.string().valid('card', 'online').required().messages({
    'any.required': 'Поле payment обязательное',
    'string.empty': 'Поле payment не может быть пустым',
    'string.base': 'Поле payment должно быть строкой',
    'string.valid': 'Недопустимое значение поля (выберите "card" или "online")',
  }),
  email: Joi.string().email().required().messages({
    'any.required': 'Поле email обязательное',
    'string.empty': 'Поле email не может быть пустым',
    'string.base': 'Поле email должно быть строкой',
    'string.email': 'Некорректный адрес электронной почты',
  }),
  phone: Joi.string().required().messages({
    'any.required': 'Поле phone обязательное',
    'string.empty': 'Поле phone не может быть пустым',
    'string.base': 'Поле phone должно быть строкой',
  }),
  address: Joi.string().required().messages({
    'any.required': 'Поле address обязательное',
    'string.empty': 'Поле address не может быть пустым',
    'string.base': 'Поле address должно быть строкой',
  }),
  total: Joi.number().positive().required().messages({
    'any.required': 'Поле total обязательное',
    'number.base': 'Поле total должно быть числом',
    'number.positive': 'Поле total должно быть положительным числом',
  }),
  items: Joi.array().items(Joi.string()).min(1).required()
    .messages({
      'any.required': 'Поле items обязательное',
      'array.min': 'Список заказов должен содержать хотя бы 1 товар',
    }),
});

export default orderSchemaJoi;
import Joi from 'joi';

const imageSchemaJoi = Joi.object({
  fileName: Joi.string().required().messages({
    'any.required': 'Название файла изображения обязательно',
    'string.empty': 'Название файла не может быть пустым',
    'string.base': 'Название файла должно быть строкой',
  }),
  originalName: Joi.string().required().messages({
    'any.required': 'Название изображения обязательно',
    'string.empty': 'Название изображения не может быть пустым',
    'string.base': 'Название изображения должно быть строкой',
  }),
});

const productSchemaJoi = Joi.object({
  title: Joi.string().min(2).max(30).required()
    .messages({
      'any.required': 'Поле title обязательное',
      'string.empty': 'Поле title не может быть пустым',
      'string.min': 'Название должно содержать минимум 2 символа',
      'string.max': 'Название не должно превышать длину в 30 символов',
      'string.base': 'Поле title должно быть строкой',
    }),
  image: imageSchemaJoi.required().messages({
    'any.required': 'Поле image не может быть пустым',
  }),
  category: Joi.string().required().messages({
    'any.required': 'Поле category обязательное',
    'string.empty': 'Поле category не может быть пустым',
    'string.base': 'Поле category должно быть строкой',
  }),
  description: Joi.string().optional().messages({
    'string.empty': 'Поле decription не может быть пустым, если указано',
    'string.base': 'Поле description должно быть строкой',
  }),
  price: Joi.number().positive().optional().messages({
    'number.base': 'Поле price должно быть числом',
    'number.positive': 'Поле price должно быть положительным числом',
  }),
});

export default productSchemaJoi;

import mongoose, { Schema, Document } from 'mongoose';

type ImageInfo = {
  fileName: string;
  originalName: string;
};

export interface IProduct extends Document {
  title: string;
  image: ImageInfo;
  category: string;
  description?: string;
  price?: number | null;
}

const productSchema = new Schema<IProduct>({
  title: {
    type: String,
    unique: true,
    required: [true, 'Поле "title" должно быть заполнено.'],
    minlength: [2, 'Минимальная длина поля "title" - 2 символа.'],
    maxlength: [30, 'Максимальная длина поля "title" - 30 символов.'],
  },
  image: {
    fileName: {
      type: String,
      required: [true, 'Поле "image.fileName" должно быть заполнено.'],
    },
    originalName: {
      type: String,
      required: [true, 'Поле "image.originalName" должно быть заполнено.'],
    },
  },
  category: {
    type: String,
    required: [true, 'Поле "category" должно быть заполнено.'],
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    default: null,
  },
}, {
  versionKey: false,
  collection: 'product',
});

export default mongoose.model<IProduct>('product', productSchema);
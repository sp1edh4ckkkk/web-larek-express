import dotenv from 'dotenv';

dotenv.config();

const {
  DB_ADDRESS = 'mongodb://127.0.0.1:27017/weblarek',
  PORT = '3000',
} = process.env;

export { DB_ADDRESS, PORT };

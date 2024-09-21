// Libraries
import { config } from 'dotenv';

// Dot env config
config();

export default {
  API_PREFIX: process.env.API_PREFIX,
  NODE_ENV: process.env.NODE_ENV,
  APP_PORT: process.env.APP_PORT,
  DB_PASSWORD: process.env.DB_PASSWORD,
};

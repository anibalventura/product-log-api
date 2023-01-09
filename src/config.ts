import * as dotenv from 'dotenv';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  baseRoute: '/api',
  jwtSecret: process.env.JWT_SECRET,
};

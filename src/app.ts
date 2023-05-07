import express, { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import productRoutes from './routes/products.routes';
import updateRoutes from './routes/update.routes';
import loggerMiddleware from './middlewares/logger.middleware';
import authMiddleware from './middlewares/auth.middleware';
import errorMiddleware from './middlewares/error.middleware';
import userRoutes from './routes/user.routes';

const app = express();

// Config.
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
app.set('port', process.env.PORT);

// Entry middleware's.
app.use(cors()); // For CORS(Cross-Origin Resource Sharing) requests.
loggerMiddleware(app);
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use(authMiddleware);

// Routes.
app.get(process.env.BASE_ROUTE, (_: Request, res: Response) =>
  res.send({ app: 'Product Log API' })
);
app.use(process.env.BASE_ROUTE, productRoutes);
app.use(process.env.BASE_ROUTE, updateRoutes);
app.use(process.env.BASE_ROUTE, userRoutes);

// Exit middleware's.
app.use(errorMiddleware);

export default app;

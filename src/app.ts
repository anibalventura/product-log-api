import express, { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import config from './config';
import cors from 'cors';
import productRoutes from './routes/products.routes';
import updateRoutes from './routes/update.routes';
import updatepointRoutes from './routes/updatepoint.routes';
import loggerMiddleware from './middlewares/logger.middleware';
import authMiddleware from './middlewares/auth.middleware';
import errorMiddleware from './middlewares/error.middleware';
import userRoutes from './routes/user.routes';

const app = express();

// Config.
dotenv.config({ path: `.env.${config.env}` });
app.set('port', config.port);

// Entry middleware's.
app.use(cors()); // For CORS(Cross-Origin Resource Sharing) requests.
loggerMiddleware(app);
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use(authMiddleware);

// Routes.
app.get(config.baseRoute, (_: Request, res: Response) =>
  res.send({ app: 'ChangeLog API' })
);
app.use(config.baseRoute, productRoutes);
app.use(config.baseRoute, updateRoutes);
app.use(config.baseRoute, updatepointRoutes);
app.use(config.baseRoute, userRoutes);

// Exit middleware's.
app.use(errorMiddleware);

export default app;

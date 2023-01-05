import express from 'express';
import * as dotenv from 'dotenv';
import config from './config';
import cors from 'cors';
import productRoutes from './routes/products.route';
import updateRoutes from './routes/update.route';
import updatepointRoutes from './routes/updatepoint.route';
import loggerMiddleware from './middlewares/logger.middleware';

const app = express();

// Settings.
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
app.set('port', config.port);

// Entry middleware's.
app.use(cors())
loggerMiddleware(app);
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// Routes.
app.get('/api', (_, res) => res.send({ app: 'ChangeLog API'}));
app.use('/api', productRoutes);
app.use('/api', updateRoutes);
app.use('/api', updatepointRoutes);

// Start server.
app.listen(3000, () => {
  console.log(`Server running with ${process.env.NODE_ENV} environment on http://localhost:${config.port}/api`);
});
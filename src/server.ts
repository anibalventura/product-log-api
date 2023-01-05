import express from 'express';
import productRoutes from './routes/products.route';
import updateRoutes from './routes/update.route';
import updatepointRoutes from './routes/updatepoint.route';

const app = express();

app.get('/api', (_, res) => res.send('ChangeLog API'));
app.use('/api', productRoutes);
app.use('/api', updateRoutes);
app.use('/api', updatepointRoutes);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000/api');
});
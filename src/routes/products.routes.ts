import { Router } from 'express';
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from '../controllers/products.controller';

const router: Router = Router();
const baseRoute: string = '/product';

router.route(`${baseRoute}`).get(getProducts).post(createProduct);

router
  .route(`${baseRoute}/:id`)
  .get(getProduct)
  .put(updateProduct)
  .delete(deleteProduct);

export default router;

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

router.get(`${baseRoute}`, getProducts);
router.get(`${baseRoute}/:id`, getProduct);
router.post(`${baseRoute}`, createProduct);
router.put(`${baseRoute}/:id`, updateProduct);
router.delete(`${baseRoute}/:id`, deleteProduct);

export default router;

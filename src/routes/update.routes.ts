import {
  getUpdates,
  getUpdate,
  createUpdate,
  updateUpdate,
  deleteUpdate,
} from './../controllers/update.controller';
import { Router } from 'express';

const router: Router = Router();
const baseRoute: string = '/update';

router.get(`${baseRoute}`, getUpdates);
router.get(`${baseRoute}/:id`, getUpdate);
router.post(`${baseRoute}`, createUpdate);
router.put(`${baseRoute}/:id`, updateUpdate);
router.delete(`${baseRoute}/:id`, deleteUpdate);

export default router;

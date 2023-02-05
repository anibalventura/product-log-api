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

router.route(`${baseRoute}`).get(getUpdates).post(createUpdate);

router
  .route(`${baseRoute}/:id`)
  .get(getUpdate)
  .put(updateUpdate)
  .delete(deleteUpdate);

export default router;

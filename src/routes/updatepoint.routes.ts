import {
  getUpdatePoints,
  getUpdatePoint,
  createUpdatePoint,
  updateUpdatePoint,
  deleteUpdatePoint,
} from './../controllers/updatePoint.controller';
import { Router } from 'express';

const router: Router = Router();
const baseRoute: string = '/update-point';

router.route(`${baseRoute}`).get(getUpdatePoints).post(createUpdatePoint);

router
  .route(`${baseRoute}/:id`)
  .get(getUpdatePoint)
  .put(updateUpdatePoint)
  .delete(deleteUpdatePoint);

export default router;

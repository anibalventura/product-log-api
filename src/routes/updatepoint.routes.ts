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

router.get(`${baseRoute}`, getUpdatePoints);
router.get(`${baseRoute}/:id`, getUpdatePoint);
router.post(`${baseRoute}`, createUpdatePoint);
router.put(`${baseRoute}/:id`, updateUpdatePoint);
router.delete(`${baseRoute}/:id`, deleteUpdatePoint);

export default router;

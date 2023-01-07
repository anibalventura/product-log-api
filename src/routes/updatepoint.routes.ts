import {
  getUpdatePoints,
  getUpdatePoint,
  createUpdatePoint,
  updateUpdatePoint,
  deleteUpdatePoint,
} from './../controllers/updatePoint.controller';
import { Router } from 'express';

const router = Router();

router.get('/update-point', getUpdatePoints);
router.get('/update-point/:id', getUpdatePoint);
router.post('/update-point', createUpdatePoint);
router.put('/update-point/:id', updateUpdatePoint);
router.delete('/update-point/:id', deleteUpdatePoint);

export default router;

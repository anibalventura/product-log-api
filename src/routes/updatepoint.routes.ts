import {
  getUpdatePoints,
  getUpdatePoint,
  createUpdatePoint,
  updateUpdatePoint,
  deleteUpdatePoint,
} from './../controllers/updatePoint.controller';
import { Router } from 'express';

const router = Router();

router.get('/updatepoint', getUpdatePoints);
router.get('/updatepoint/:id', getUpdatePoint);
router.post('/updatepoint', createUpdatePoint);
router.put('/updatepoint/:id', updateUpdatePoint);
router.delete('/updatepoint/:id', deleteUpdatePoint);

export default router;

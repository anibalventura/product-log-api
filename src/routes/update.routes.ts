import {
  getUpdates,
  getUpdate,
  createUpdate,
  updateUpdate,
  deleteUpdate,
} from './../controllers/update.controller';
import { Router } from 'express';

const router = Router();

router.get('/update', getUpdates);
router.get('/update:id', getUpdate);
router.post('/update', createUpdate);
router.put('/update:id', updateUpdate);
router.delete('/update:id', deleteUpdate);

export default router;

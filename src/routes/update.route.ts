import { Router } from 'express';

const router = Router();

router.get('/update', () => { });
router.get('/update:id', () => { });
router.post('/update', () => { });
router.put('/update:id', () => { });
router.delete('/update:id', () => { });

export default router;
import { Router } from 'express';

const router = Router();

router.get('/product', () => {  });
router.get('/product:id', () => { });
router.post('/product', () => { });
router.put('/product:id', () => { });
router.delete('/product:id', () => { });

export default router;
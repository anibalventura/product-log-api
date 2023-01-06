import { createUser, loginUser } from './../controllers/user.controller';
import { Router } from 'express';

const router = Router();

router.post('/user/create', createUser);
router.post('/user/login', loginUser);

export default router;

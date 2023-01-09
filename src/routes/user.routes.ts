import { createUser, loginUser } from './../controllers/user.controller';
import { Router } from 'express';

const router: Router = Router();
const baseRoute: string = '/user';

router.post(`${baseRoute}/create`, createUser);
router.post(`${baseRoute}/login`, loginUser);

export default router;

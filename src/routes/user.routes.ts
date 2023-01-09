import {
  createUser,
  deleteUser,
  loginUser,
} from './../controllers/user.controller';
import { Router } from 'express';

const router: Router = Router();
const baseRoute: string = '/user';

router.post(`${baseRoute}/`, createUser);
router.post(`${baseRoute}/login`, loginUser);
router.delete(`${baseRoute}/:username`, deleteUser);

export default router;

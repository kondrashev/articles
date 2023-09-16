import { Router } from 'express';

import endpoints from '../../constants/endpoints';
// eslint-disable-next-line new-cap
const router = Router();
import UserController from '../controllers/userController';
router.get(endpoints.authorization, UserController.authorization);
router.post(endpoints.checkAuthorization, UserController.checkAuthorisation);
export default router;

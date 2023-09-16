import { Router } from 'express';

import endpoints from '../../constants/endpoints';
// eslint-disable-next-line new-cap
const router = Router();
import UserController from '../controllers/userController';
import checkRole from '../middleware/checkRoleMiddleware';
router.get(endpoints.authorization, UserController.authorization);
router.post(endpoints.checkAuthorization, UserController.checkAuthorisation);
router.post(endpoints.addUser, UserController.addUser);
router.get(endpoints.getUsers, checkRole('ADMIN'), UserController.getUsers);
export default router;

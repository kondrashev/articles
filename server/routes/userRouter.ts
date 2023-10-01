import { Router } from 'express';

import endpoints from '../../constants/endpoints';
import UserValidator from '../validators/index';
// eslint-disable-next-line new-cap
const router = Router();
import UserController from '../controllers/userController';
import checkRole from '../middleware/checkRoleMiddleware';
import errorHandler from '../middleware/ErrorHandlingMiddleware';
router.get(endpoints.authorization, UserController.authorization);
router.post(endpoints.checkAuthorization, UserController.checkAuthorisation);
router.post(endpoints.addUser, UserValidator.checkAddUser(), errorHandler, UserController.addUser);
router.get(endpoints.getUsers, checkRole('ADMIN'), UserController.getUsers);
router.post(endpoints.deleteUsers, checkRole('ADMIN'), UserController.deleteUsers);
router.post(endpoints.uploadFile, checkRole('AUTHOR'), UserController.uploadFile);
export default router;

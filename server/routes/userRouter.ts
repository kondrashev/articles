import { Router } from 'express';
// eslint-disable-next-line new-cap
const router = Router();
import UserController from '../controllers/userController';
router.get('/', UserController.authorization);
router.post('/check', UserController.checkAuthorisation);
export default router;

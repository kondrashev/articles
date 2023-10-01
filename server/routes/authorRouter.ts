import { Router } from 'express';

import endpoints from '../../constants/endpoints';
// eslint-disable-next-line new-cap
const router = Router();
import AuthorController from '../controllers/authorController';
import checkRole from '../middleware/checkRoleMiddleware';
router.post(endpoints.addArticle, checkRole('AUTHOR'), AuthorController.addArticle);
router.get(endpoints.getArticles, checkRole('AUTHOR'), AuthorController.getArticles);
export default router;

import { Router } from 'express';

import endpoints from '../../constants/endpoints';
import UserValidator from '../validators/index';
// eslint-disable-next-line new-cap
const router = Router();
import AuthorController from '../controllers/authorController';
import checkRole from '../middleware/checkRoleMiddleware';
import errorHandler from '../middleware/ErrorHandlingMiddleware';
router.post(endpoints.addArticle, checkRole('AUTHOR'), UserValidator.checkAddArticle(), errorHandler, AuthorController.addArticle);
router.get(endpoints.getArticles, checkRole('AUTHOR'), AuthorController.getArticles);
router.post(endpoints.deleteArticles, checkRole('AUTHOR'), AuthorController.deleteArticles);
router.post(endpoints.updateArticle, checkRole('AUTHOR'), AuthorController.updateArticle);
export default router;

import { Router } from 'express';

import endpoints from '../../constants/endpoints';
// eslint-disable-next-line new-cap
const router = Router();
import PublicController from '../controllers/publicController';
router.get(endpoints.listArticles, PublicController.listArticles);
export default router;

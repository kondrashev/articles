import { Router } from 'express';

import endpoints from '../../constants/endpoints';
// eslint-disable-next-line new-cap
const router = Router();
import authorRouter from '../../server/routes/authorRouter';
import publicRouter from '../../server/routes/publicRouter';
import userRouter from '../../server/routes/userRouter';
router.use(endpoints.userRouter, userRouter);
router.use(endpoints.authorRouter, authorRouter);
router.use(endpoints.publicRouter, publicRouter);
export default router;

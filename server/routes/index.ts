import { Router } from 'express';

import endpoints from '../../constants/endpoints';
// eslint-disable-next-line new-cap
const router = Router();
import userRouter from '../../server/routes/userRouter';
router.use(endpoints.userRouter, userRouter);
export default router;

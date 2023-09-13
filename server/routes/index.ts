import { Router } from 'express';
// eslint-disable-next-line new-cap
const router = Router();
import userRouter from '../../server/routes/userRouter';
router.use('/panel', userRouter);
export default router;

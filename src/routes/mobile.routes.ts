import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { authMiddleware } from '../middleware/auth.middleware';
import {
  createMobileTrade,
  getMobileProfile,
  getMobileTrade,
  listMobileTrades,
  registerDevice,
  storePushToken,
} from '../controllers/mobile.controller';

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
});

const router = Router();

router.use(limiter);

router.post('/device/register', authMiddleware, registerDevice);
router.post('/push-token', authMiddleware, storePushToken);
router.get('/profile', authMiddleware, getMobileProfile);
router.get('/trades', authMiddleware, listMobileTrades);
router.get('/trades/:id', authMiddleware, getMobileTrade);
router.post('/trades', authMiddleware, createMobileTrade);

export { router as mobileRoutes };

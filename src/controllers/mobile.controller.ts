import { Response, NextFunction } from 'express';
import { AuthRequest } from '../services/auth.service';
import {
  createTrade,
  getProfile,
  getTrade,
  listTrades,
  registerDevice as registerDeviceService,
  storePushToken as storePushTokenService,
} from '../services/mobile.service';
import { AppError, ErrorCode } from '../errors/errorCodes';

export async function registerDevice(req: AuthRequest, res: Response, next: NextFunction) {
  const walletAddress = req.user?.walletAddress;
  if (!walletAddress) {
    return next(new AppError(ErrorCode.AUTH_ERROR, 'Unauthorized', 401));
  }

  try {
    const payload = req.body;
    const result = await registerDeviceService(walletAddress, payload);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function storePushToken(req: AuthRequest, res: Response, next: NextFunction) {
  const walletAddress = req.user?.walletAddress;
  if (!walletAddress) {
    return next(new AppError(ErrorCode.AUTH_ERROR, 'Unauthorized', 401));
  }

  try {
    const payload = req.body;
    const result = await storePushTokenService(walletAddress, payload);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function getMobileProfile(req: AuthRequest, res: Response, next: NextFunction) {
  const walletAddress = req.user?.walletAddress;
  if (!walletAddress) {
    return next(new AppError(ErrorCode.AUTH_ERROR, 'Unauthorized', 401));
  }

  try {
    const profile = await getProfile(walletAddress);
    res.json(profile);
  } catch (err) {
    next(err);
  }
}

export async function listMobileTrades(req: AuthRequest, res: Response, next: NextFunction) {
  const walletAddress = req.user?.walletAddress;
  if (!walletAddress) {
    return next(new AppError(ErrorCode.AUTH_ERROR, 'Unauthorized', 401));
  }

  try {
    const trades = await listTrades(walletAddress, req.query);
    res.json(trades);
  } catch (err) {
    next(err);
  }
}

export async function getMobileTrade(req: AuthRequest, res: Response, next: NextFunction) {
  const walletAddress = req.user?.walletAddress;
  if (!walletAddress) {
    return next(new AppError(ErrorCode.AUTH_ERROR, 'Unauthorized', 401));
  }

  const tradeId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  if (!tradeId) {
    return next(new AppError(ErrorCode.VALIDATION_ERROR, 'Trade id is required', 400));
  }

  try {
    const trade = await getTrade(walletAddress, tradeId);
    res.json(trade);
  } catch (err) {
    next(err);
  }
}

export async function createMobileTrade(req: AuthRequest, res: Response, next: NextFunction) {
  const walletAddress = req.user?.walletAddress;
  if (!walletAddress) {
    return next(new AppError(ErrorCode.AUTH_ERROR, 'Unauthorized', 401));
  }

  try {
    const payload = req.body;
    const trade = await createTrade(walletAddress, payload);
    res.status(201).json(trade);
  } catch (err) {
    next(err);
  }
}

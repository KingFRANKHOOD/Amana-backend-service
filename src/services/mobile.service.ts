import { AppError, ErrorCode } from '../errors/errorCodes';

export interface RegisterDevicePayload {
  deviceId: string;
  platform: 'ios' | 'android' | 'web';
  appVersion: string;
  osVersion: string;
}

export interface PushTokenPayload {
  pushToken: string;
  provider: 'expo' | 'fcm' | 'apns' | 'firebase';
}

export interface MobileTradeCreatePayload {
  buyerAddress: string;
  sellerAddress: string;
  amount: number;
  assetCode: string;
  deliveryAddress: string;
  lossRatio: number;
}

export async function registerDevice(walletAddress: string, payload: RegisterDevicePayload) {
  if (!payload.deviceId || !payload.platform) {
    throw new AppError(ErrorCode.VALIDATION_ERROR, 'Device registration payload is invalid', 400);
  }

  return {
    walletAddress,
    deviceId: payload.deviceId,
    platform: payload.platform,
    registeredAt: new Date().toISOString(),
  };
}

export async function storePushToken(walletAddress: string, payload: PushTokenPayload) {
  if (!payload.pushToken || !payload.provider) {
    throw new AppError(ErrorCode.VALIDATION_ERROR, 'Push token payload is invalid', 400);
  }

  return {
    walletAddress,
    pushToken: payload.pushToken,
    provider: payload.provider,
    savedAt: new Date().toISOString(),
  };
}

export async function getProfile(walletAddress: string) {
  return {
    walletAddress,
    displayName: `Mobile user ${walletAddress.slice(0, 8)}`,
    mobileFirst: true,
  };
}

export async function listTrades(walletAddress: string, query: any) {
  return {
    walletAddress,
    limit: Number(query.limit ?? 20),
    page: Number(query.page ?? 1),
    trades: [],
  };
}

export async function getTrade(walletAddress: string, tradeId: string) {
  if (!tradeId) {
    throw new AppError(ErrorCode.VALIDATION_ERROR, 'Trade id is required', 400);
  }

  return {
    tradeId,
    walletAddress,
    status: 'pending',
    mobileView: true,
  };
}

export async function createTrade(walletAddress: string, payload: MobileTradeCreatePayload) {
  if (!payload.buyerAddress || !payload.sellerAddress || !payload.amount || !payload.assetCode) {
    throw new AppError(ErrorCode.VALIDATION_ERROR, 'Trade payload is incomplete', 400);
  }

  return {
    tradeId: `trade-${Date.now()}`,
    ...payload,
    createdBy: walletAddress,
    status: 'created',
    createdAt: new Date().toISOString(),
  };
}

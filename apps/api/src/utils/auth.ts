import jwt from 'jsonwebtoken';
import type { Request } from 'express';

export interface JwtPayload {
  sub: string; // user id
  role: 'ADMIN' | 'STAFF' | 'CUSTOMER';
  email?: string;
}

export function getTokenFromReq(req: Request): string | null {
  const header = req.headers['authorization'];
  if (header && header.startsWith('Bearer ')) {
    return header.slice('Bearer '.length);
  }
  const cookie = req.cookies?.['token'];
  return cookie ?? null;
}

export function verifyToken(token: string | null): JwtPayload | null {
  if (!token) return null;
  const secret = process.env.JWT_SECRET || 'dev_replace_me_strong_secret';
  try {
    return jwt.verify(token, secret) as JwtPayload;
  } catch {
    return null;
  }
}

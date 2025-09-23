import type { JwtPayload } from './auth';

export function requireRole(user: JwtPayload | null, roles: Array<'ADMIN' | 'STAFF' | 'CUSTOMER'>) {
  if (!user || !roles.includes(user.role)) {
    const err = new Error('Forbidden');
    // @ts-ignore
    err.code = 'FORBIDDEN';
    throw err;
  }
}

import type { Response, Request } from 'express';
import { getPrisma } from './prisma';
import { getTokenFromReq, verifyToken, type JwtPayload } from './auth';
import { createSessionLoader } from '../dataloaders/sessionLoader';

export interface GraphQLContext {
  req: Request;
  res: Response;
  prisma: ReturnType<typeof getPrisma>;
  user: JwtPayload | null;
  loaders: {
    sessionsByEventId: ReturnType<typeof createSessionLoader>;
  };
}

export async function buildContext(req: Request, res: Response): Promise<GraphQLContext> {
  const prisma = getPrisma();
  const token = getTokenFromReq(req);
  const user = verifyToken(token);
  return {
    req,
    res,
    prisma,
    user,
    loaders: {
      sessionsByEventId: createSessionLoader(prisma),
    },
  };
}

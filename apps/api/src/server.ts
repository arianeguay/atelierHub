import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { buildContext } from './utils/context';
import { resolvers } from './resolvers';
import { logger } from './utils/logger';

const typeDefs = readFileSync(join(process.cwd(), 'apps/api/src/schema/index.graphql'), 'utf8');

export async function startServer({ port = 4000 }: { port?: number } = {}) {
  const app = express();

  app.use(
    cors({
      origin: [process.env.WEB_URL ?? 'http://localhost:3000', process.env.OPS_URL ?? 'http://localhost:4200'],
      credentials: true,
    }),
  );
  app.use(cookieParser());
  app.use(express.json());

  const apollo = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await apollo.start();

  app.use(
    '/graphql',
    expressMiddleware(apollo, {
      context: async ({ req, res }) => buildContext(req, res),
    }),
  );

  app.get('/healthz', (_req, res) => res.json({ ok: true }));

  app.listen(port, () => {
    logger.info({ port }, 'API ready at http://localhost:%d/graphql', port);
  });
}

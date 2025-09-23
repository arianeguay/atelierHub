import 'dotenv/config';
import { startServer } from './server';

(async () => {
  const port = Number(process.env.PORT ?? 4000);
  await startServer({ port });
})();

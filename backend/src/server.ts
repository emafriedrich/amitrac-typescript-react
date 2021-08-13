import { initDatabase } from './db/db';
import app from './app';

const PORT = process.env.APP_PORT || '3000';

export async function startServer() {
  await initDatabase();
  app.listen(PORT, () => {
    console.info(`
      ################################################
      🛡️  Server listening on port: ${PORT} 🛡️
      ################################################
    `);
  });
}

startServer();

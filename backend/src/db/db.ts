import { createConnection } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const production = process.env.ENV === 'production';

export const initDatabase = async () => {
  const entities = [production ? 'dist/models/*.js' : 'src/models/*.ts'];
  try {
    const connection = await createConnection({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      username: process.env.DATABASE_USER,
      port: 3306,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      synchronize: true,
      entities,
      namingStrategy: new SnakeNamingStrategy(),
      timezone: 'Z',
    });
    console.error('Database connection successful');
    return Promise.resolve(connection);
  } catch (ex) {
    console.error('Cannot connect database: ', ex);
  }
};


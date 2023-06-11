import { DataSource } from 'typeorm';
import loadConfig from './config/database.config';
import * as path from 'path';

export const AppDataSource = new DataSource({
  type: 'postgres',
  ...loadConfig(),
  migrations: [path.join(__dirname, '/migrations/*{.ts,.js}')],
  entities: [path.join(__dirname, '/src/**/entities/*{.ts,.js}')],
});

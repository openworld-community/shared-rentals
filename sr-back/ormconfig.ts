import { DataSource } from 'typeorm';
import loadConfig from './config/db';

export const AppDataSource = new DataSource({
  type: 'postgres',
  ...loadConfig(),
  entities: [],
  migrations: [],
});

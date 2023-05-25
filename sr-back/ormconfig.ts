import { DataSource } from 'typeorm';
import loadConfig from './config/database.config';

export const AppDataSource = new DataSource({
  type: 'postgres',
  ...loadConfig(),
  entities: [],
  migrations: [],
});

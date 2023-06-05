import { DataSource } from 'typeorm';
import loadConfig from './config/database.config';
import { TestMigration1684945119367 } from './migrations/1684945119367-TestMigration';
import { CreateUserTable1685958461570 } from 'migrations/1685958461570-CreateUserTable';

export const AppDataSource = new DataSource({
  type: 'postgres',
  ...loadConfig(),
  migrations: [TestMigration1684945119367, CreateUserTable1685958461570],
});

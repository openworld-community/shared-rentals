import { DataSource } from 'typeorm';
import loadConfig from './config/database.config';
import { TestMigration1684945119367 } from './migrations/1684945119367-TestMigration';
import { Area1686312624644 } from './migrations/1686312624644-Area';

export const AppDataSource = new DataSource({
  type: 'postgres',
  ...loadConfig(),
  migrations: [TestMigration1684945119367, Area1686312624644],
});

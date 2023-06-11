import { registerAs } from '@nestjs/config';
import { NODE_ENVS, setEnvVar } from './utility';

export default registerAs('database', () => ({
  host: setEnvVar('DB_HOST', 'localhost'),
  port: setEnvVar('DB_PORT', 5432),
  database: 'shared_rentals',
  username: setEnvVar('DB_USERNAME', 'postgres'),
  password: setEnvVar('DB_PASSWORD', 'postgres'),
  logging: process.env.NODE_ENV !== NODE_ENVS.production,
  synchronize: false,
}));

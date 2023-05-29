import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  host: process.env.DB_HOST || 'localhost',
  port: +process.env.DB_PORT! || 5432,
  database: 'shared_rentals',
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  synchronize: process.env.NODE_ENV !== 'production',
}));

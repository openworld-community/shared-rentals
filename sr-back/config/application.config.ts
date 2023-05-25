import { registerAs } from '@nestjs/config';

export default registerAs('application', () => ({
  port: parseInt(process.env.APP_PORT || '3214', 10),
}));

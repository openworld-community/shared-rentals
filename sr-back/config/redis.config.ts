import { registerAs } from '@nestjs/config';
import { setEnvVar } from './utility';

export default registerAs('redis', () => ({
  host: setEnvVar('REDIS_HOST', 'locahost'),
  port: setEnvVar('REDIS_PORT', 6397),
}));

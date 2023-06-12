import { registerAs } from '@nestjs/config';
import { setEnvVar } from './utility';

export default registerAs('auth', () => ({
  secret: setEnvVar('AUTH_SECRET', 'auth-secret'),
}));

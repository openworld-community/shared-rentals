import { registerAs } from '@nestjs/config';
import { setEnvVar, NODE_ENVS } from './utility';

export default registerAs('application', () => ({
  port: parseInt(setEnvVar('APP_PORT', '3214')),
  env:
    process.env.NODE_ENV === NODE_ENVS.dev
      ? NODE_ENVS.dev
      : NODE_ENVS.production,
}));

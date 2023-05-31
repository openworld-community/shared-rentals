export function setEnvVar(name: string, defaultValue: any) {
  const value = process.env[name] ?? defaultValue;

  if (value === undefined) {
    throw new Error(`${name} not found`);
  }

  return value;
}

export enum NODE_ENVS {
  dev = 'dev',
  // ToDo: место для stage/release-candidate окружения
  production = 'production',
}

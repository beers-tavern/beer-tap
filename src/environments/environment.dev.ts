import { env as base_env } from './environment';

export const env: any = {
  ...base_env,
  production: false,
  apiUrl: 'http://localhost:3000',
};

import { env as base_env } from './environment';

export const env: any = {
  ...base_env,
  production: true,
  apiUrl: 'http://localhost:8080'
};
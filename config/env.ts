import * as dotenv from 'dotenv';
dotenv.config();

export const ENV = {
  BASE_URL: process.env.BASE_URL || 'http://localhost:3000',
  API_BASE_URL: process.env.API_BASE_URL || 'http://localhost:3000/api',
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || 'admin@example.com',
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || 'AdminPass123!',
  TEST_USER_EMAIL: process.env.TEST_USER_EMAIL || 'user@example.com',
  TEST_USER_PASSWORD: process.env.TEST_USER_PASSWORD || 'UserPass123!',
  CI: process.env.CI === 'true',
} as const;

import { ENV } from '../../config/env';
import type { User } from './types';

export const ADMIN_USER: User = {
  email: ENV.ADMIN_EMAIL,
  password: ENV.ADMIN_PASSWORD,
  firstName: 'Admin',
  lastName: 'User',
  role: 'admin',
};

export const TEST_USER: User = {
  email: ENV.TEST_USER_EMAIL,
  password: ENV.TEST_USER_PASSWORD,
  firstName: 'Test',
  lastName: 'User',
  role: 'viewer',
};

export const MANAGER_USER: User = {
  email: 'manager@example.com',
  password: 'ManagerPass123!',
  firstName: 'Manager',
  lastName: 'User',
  role: 'manager',
};

export const USERS_BY_ROLE = {
  admin: ADMIN_USER,
  manager: MANAGER_USER,
  viewer: TEST_USER,
} as const;

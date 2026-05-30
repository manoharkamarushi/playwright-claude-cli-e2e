import { APIRequestContext } from '@playwright/test';
import { BaseApi } from './base.api';
import type { AuthToken, User } from '../data/types';

export class AuthApi extends BaseApi {
  constructor(request: APIRequestContext) {
    super(request);
  }

  async login(email: string, password: string) {
    return this.post<AuthToken>('/auth/login', { email, password });
  }

  async logout(token: string) {
    return this.post<void>('/auth/logout', {}, { Authorization: `Bearer ${token}` });
  }

  async register(user: Omit<User, 'id'>) {
    return this.post<User>('/auth/register', user);
  }

  async refreshToken(refreshToken: string) {
    return this.post<AuthToken>('/auth/refresh', { refreshToken });
  }

  async forgotPassword(email: string) {
    return this.post<void>('/auth/forgot-password', { email });
  }

  async resetPassword(token: string, newPassword: string) {
    return this.post<void>('/auth/reset-password', { token, newPassword });
  }
}

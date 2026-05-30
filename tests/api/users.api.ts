import { APIRequestContext } from '@playwright/test';
import { BaseApi } from './base.api';
import type { User } from '../data/types';

export class UsersApi extends BaseApi {
  constructor(
    request: APIRequestContext,
    private readonly token: string
  ) {
    super(request);
  }

  private get authHeader() {
    return { Authorization: `Bearer ${this.token}` };
  }

  async getAll() {
    return this.get<User[]>('/users', this.authHeader);
  }

  async getById(id: string) {
    return this.get<User>(`/users/${id}`, this.authHeader);
  }

  async create(user: Omit<User, 'id'>) {
    return this.post<User>('/users', user, this.authHeader);
  }

  async update(id: string, updates: Partial<User>) {
    return this.put<User>(`/users/${id}`, updates, this.authHeader);
  }

  async remove(id: string) {
    return this.delete<void>(`/users/${id}`, this.authHeader);
  }
}

import { APIRequestContext } from '@playwright/test';
import { ENV } from '../../config/env';
import type { ApiResponse } from '../data/types';

export abstract class BaseApi {
  protected readonly baseURL: string;

  constructor(protected readonly request: APIRequestContext) {
    this.baseURL = ENV.API_BASE_URL;
  }

  protected async get<T>(path: string, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    const response = await this.request.get(`${this.baseURL}${path}`, { headers });
    return {
      data: await response.json(),
      status: response.status(),
    };
  }

  protected async post<T>(
    path: string,
    body: unknown,
    headers?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    const response = await this.request.post(`${this.baseURL}${path}`, {
      data: body,
      headers: { 'Content-Type': 'application/json', ...headers },
    });
    return {
      data: await response.json(),
      status: response.status(),
    };
  }

  protected async put<T>(
    path: string,
    body: unknown,
    headers?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    const response = await this.request.put(`${this.baseURL}${path}`, {
      data: body,
      headers: { 'Content-Type': 'application/json', ...headers },
    });
    return {
      data: await response.json(),
      status: response.status(),
    };
  }

  protected async delete<T>(path: string, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    const response = await this.request.delete(`${this.baseURL}${path}`, { headers });
    return {
      data: await response.json(),
      status: response.status(),
    };
  }
}

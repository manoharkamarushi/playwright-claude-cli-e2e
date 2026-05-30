export interface User {
  id?: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}

export interface Product {
  id?: string;
  name: string;
  price: number;
  category: string;
  sku: string;
}

export interface Order {
  id?: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
}

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export type UserRole = 'admin' | 'manager' | 'viewer' | 'guest';
export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface AuthToken {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

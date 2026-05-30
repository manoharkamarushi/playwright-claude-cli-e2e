import { faker } from '@faker-js/faker';
import type { User, Address, Product, Order } from './types';

export class UserFactory {
  static create(overrides: Partial<User> = {}): User {
    return {
      email: faker.internet.email(),
      password: faker.internet.password({ length: 12, memorable: false }),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      role: 'viewer',
      ...overrides,
    };
  }

  static createAdmin(overrides: Partial<User> = {}): User {
    return this.create({ role: 'admin', ...overrides });
  }

  static createManager(overrides: Partial<User> = {}): User {
    return this.create({ role: 'manager', ...overrides });
  }

  static createBatch(count: number, overrides: Partial<User> = {}): User[] {
    return Array.from({ length: count }, () => this.create(overrides));
  }
}

export class AddressFactory {
  static create(overrides: Partial<Address> = {}): Address {
    return {
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state({ abbreviated: true }),
      zip: faker.location.zipCode(),
      country: 'US',
      ...overrides,
    };
  }
}

export class ProductFactory {
  static create(overrides: Partial<Product> = {}): Product {
    return {
      name: faker.commerce.productName(),
      price: parseFloat(faker.commerce.price({ min: 1, max: 999 })),
      category: faker.commerce.department(),
      sku: faker.string.alphanumeric(8).toUpperCase(),
      ...overrides,
    };
  }

  static createBatch(count: number, overrides: Partial<Product> = {}): Product[] {
    return Array.from({ length: count }, () => this.create(overrides));
  }
}

export class OrderFactory {
  static create(userId: string, overrides: Partial<Order> = {}): Order {
    const items = Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => ({
      productId: faker.string.uuid(),
      quantity: faker.number.int({ min: 1, max: 10 }),
      price: parseFloat(faker.commerce.price()),
    }));

    return {
      userId,
      items,
      total: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
      status: 'pending',
      ...overrides,
    };
  }
}

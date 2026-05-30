import { test, expect } from '../../fixtures/index';
import { UserFactory } from '../../data/user.factory';

test.describe('Users API', () => {
  test('should fetch all users @smoke', async ({ usersApi }) => {
    const response = await usersApi.getAll();
    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
  });

  test('should create a new user', async ({ usersApi, authToken }) => {
    const newUser = UserFactory.create();
    const response = await usersApi.create(newUser);
    expect(response.status).toBe(201);
    expect(response.data.email).toBe(newUser.email);
  });

  test('should get user by id', async ({ usersApi, createdUser }) => {
    const response = await usersApi.getById(createdUser.id);
    expect(response.status).toBe(200);
    expect(response.data.email).toBe(createdUser.email);
  });

  test('should update user', async ({ usersApi, createdUser }) => {
    const updates = { firstName: 'Updated' };
    const response = await usersApi.update(createdUser.id, updates);
    expect(response.status).toBe(200);
    expect(response.data.firstName).toBe('Updated');
  });

  test('should return 404 for non-existent user', async ({ usersApi }) => {
    const response = await usersApi.getById('non-existent-id-000');
    expect(response.status).toBe(404);
  });
});

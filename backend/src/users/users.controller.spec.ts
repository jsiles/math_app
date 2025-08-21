import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const users: User[] = [
    {
      id: 1,
      identifier: 'admin',
      name: 'Administrator',
      email: 'admin@example.com',
      role: 'admin',
      socialProvider: undefined,
      socialSession: JSON.stringify({ password: bcrypt.hashSync('admin123', 10) }),
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            getUsers: jest.fn().mockResolvedValue(users),
            getUserById: jest.fn().mockImplementation((id) => Promise.resolve(users.find(u => u.id === id) || null)),
            createUser: jest.fn().mockImplementation((data) => Promise.resolve({ ...data, id: 2 })),
            updateUser: jest.fn().mockImplementation((id, data) => {
              const user = users.find(u => u.id === id);
              if (!user) return null;
              return { ...user, ...data };
            }),
            deleteUser: jest.fn().mockImplementation((id) => Promise.resolve(users.some(u => u.id === id))),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should return all users', async () => {
    expect(await controller.getUsers()).toEqual(users);
  });

  it('should return user by id', async () => {
    expect(await controller.getUserById(1)).toEqual(users[0]);
  });

  it('should throw NotFoundException for non-existent user', async () => {
    await expect(controller.getUserById(999)).rejects.toThrow(NotFoundException);
  });

  it('should create a user', async () => {
  const data = { identifier: 'test', name: 'Test', role: 'student' as 'student' };
  expect(await controller.createUser(data)).toMatchObject(data);
  });

  it('should update a user', async () => {
    const data = { name: 'Updated' };
    expect(await controller.updateUser(1, data)).toMatchObject({ ...users[0], ...data });
  });

  it('should throw NotFoundException when updating non-existent user', async () => {
    await expect(controller.updateUser(999, { name: 'Nope' })).rejects.toThrow(NotFoundException);
  });

  it('should delete a user', async () => {
    await expect(controller.deleteUser(1)).resolves.toBeUndefined();
  });

  it('should throw NotFoundException when deleting non-existent user', async () => {
    await expect(controller.deleteUser(999)).rejects.toThrow(NotFoundException);
  });

  it('should login with valid credentials', async () => {
    const body = { identifier: 'admin', password: 'admin123' };
    const result = await controller.login(body);
    expect(result.success).toBe(true);
    expect(result.token).toBeDefined();
    expect(result.user).toMatchObject(users[0]);
  });

  it('should throw UnauthorizedException for invalid login', async () => {
    await expect(controller.login({ identifier: 'admin', password: 'wrong' })).rejects.toThrow(UnauthorizedException);
    await expect(controller.login({ identifier: 'nope', password: 'admin123' })).rejects.toThrow(UnauthorizedException);
  });

  it('should refresh token', async () => {
    const token = jwt.sign({ sub: users[0].id, role: users[0].role }, process.env.JWT_SECRET || 'supersecret', { expiresIn: '1000m' });
    const result = await controller.refresh({ token });
    expect(result.success).toBe(true);
    expect(result.token).toBeDefined();
  });

  it('should throw UnauthorizedException for invalid refresh token', async () => {
    await expect(controller.refresh({ token: 'invalid' })).rejects.toThrow(UnauthorizedException);
  });
});

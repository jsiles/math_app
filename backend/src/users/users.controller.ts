import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';
const JWT_EXPIRES_IN = '1000m';

/**
 * Controller for user endpoints.
 * Provides routes to get, create, update, delete users, login, and refresh token.
 */
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * GET /users
   * Returns a list of users.
   */
  @Get()
  @HttpCode(200)
  async getUsers(): Promise<User[]> {
    return this.usersService.getUsers();
  }

  /**
   * GET /users/:id
   * Returns a user by ID.
   */
  @Get(':id')
  @HttpCode(200)
  async getUserById(@Param('id') id: number): Promise<User> {
    const user = await this.usersService.getUserById(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  /**
   * POST /users
   * Creates a new user.
   */
  @Post()
  @HttpCode(201)
  async createUser(@Body() data: Partial<User>): Promise<User> {
    return this.usersService.createUser(data);
  }

  /**
   * PUT /users/:id
   * Updates an existing user.
   */
  @Put(':id')
  @HttpCode(200)
  async updateUser(@Param('id') id: number, @Body() data: Partial<User>): Promise<User> {
    const updated = await this.usersService.updateUser(id, data);
    if (!updated) throw new NotFoundException('User not found');
    return updated;
  }

  /**
   * DELETE /users/:id
   * Deletes a user by ID.
   */
  @Delete(':id')
  @HttpCode(204)
  async deleteUser(@Param('id') id: number): Promise<void> {
    const deleted = await this.usersService.deleteUser(id);
    if (!deleted) throw new NotFoundException('User not found');
  }

  /**
   * POST /users/login
   * Login endpoint: validates identifier and password, returns JWT token.
   * Status: 200 OK or 401 Unauthorized
   */
  @Post('login')
  @HttpCode(200)
  async login(@Body() body: { identifier: string; password: string }): Promise<{ success: boolean; token?: string; user?: User }> {
    const user = (await this.usersService.getUsers()).find(u => u.identifier === body.identifier);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const session = user.socialSession ? JSON.parse(user.socialSession) : {};
    const valid = session.password && await bcrypt.compare(body.password, session.password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');
    const token = jwt.sign({ sub: user.id, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    return { success: true, token, user };
  }

  /**
   * POST /users/refresh
   * Refreshes JWT token if valid and not expired.
   * Status: 200 OK or 401 Unauthorized
   */
  @Post('refresh')
  @HttpCode(200)
  async refresh(@Body() body: { token: string }): Promise<{ success: boolean; token?: string }> {
    try {
      const payload = jwt.verify(body.token, JWT_SECRET) as any;
      // Generar nuevo token con misma info y nueva expiración
      const newToken = jwt.sign({ sub: payload.sub, role: payload.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
      return { success: true, token: newToken };
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}

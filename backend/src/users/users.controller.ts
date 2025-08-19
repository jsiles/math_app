import { Controller, Get } from '@nestjs/common';

/**
 * Controller for user endpoints.
 * Provides routes to get user data.
 */
@Controller('users')
export class UsersController {
  /**
   * GET /users
   * Returns a list of users.
   */
  @Get()
  getUsers() {
    return [{ id: 1, name: 'John Doe' }];
  }
}

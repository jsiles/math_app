import { Injectable } from '@nestjs/common';

/**
 * Service for user logic.
 * Handles retrieval and management of user data.
 */
@Injectable()
export class UsersService {
  /**
   * Returns a list of sample users.
   */
  getUsers() {
    return [{ id: 1, name: 'John Doe' }];
  }
}

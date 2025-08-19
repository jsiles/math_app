import { SetMetadata } from '@nestjs/common';

/**
 * Custom decorator to specify allowed roles for an endpoint.
 * Usage: @Roles('admin', 'teacher')
 */
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);

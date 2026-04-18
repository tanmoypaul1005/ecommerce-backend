import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Roles = (
  ...roles: Array<'ADMIN' | 'SUPER_ADMIN' | 'CUSTOMER' | 'DELIVERYMAN'>
) =>
  SetMetadata(ROLES_KEY, roles);

import { SetMetadata } from '@nestjs/common';
import { RoleType } from 'src/auth/role.type';

export const Roles = (...roles: RoleType[]) => SetMetadata('roles', roles);

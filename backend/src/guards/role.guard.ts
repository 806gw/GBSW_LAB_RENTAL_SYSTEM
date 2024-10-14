// role.guard.ts

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserEntity } from 'src/entities/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) {
      return true; // roles 데코레이터가 설정되지 않은 경우는 허용
    }

    const request = context.switchToHttp().getRequest();
    console.log(request.user);
    const user = request.user as UserEntity;

    if (!user || !user.authorities) {
      return false; // 사용자 정보가 없거나 권한이 없는 경우 접근 거부
    }

    const hasRole = user.authorities.some((role) => roles.includes(role));
    return hasRole; // 사용자가 적어도 하나의 역할을 가지고 있으면 접근 허용
  }
}

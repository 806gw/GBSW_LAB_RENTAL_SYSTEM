import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import * as jwt from 'jsonwebtoken'
import { RolesEnum } from 'src/util/enum/roles.enum'

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest()
    const authHeader = request.headers['authorization']

    if (!authHeader) {
      throw new UnauthorizedException({
        success: false,
        message: 'Authorization header missing'
      })
    }

    const token = authHeader.split(' ')[1]

    if (!token) {
      throw new UnauthorizedException({
        success: false,
        message: 'Token missing'
      })
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET) as { id: number; role: RolesEnum }
      request.user = { id: decoded.id, role: decoded.role }

      return true
    } catch (e) {
      throw new UnauthorizedException({
        success: false,
        message: `Invalid token : ${e}`
      })
    }
  }
}

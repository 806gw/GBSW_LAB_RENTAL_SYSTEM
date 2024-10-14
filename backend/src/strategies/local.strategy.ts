import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class Localstrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'userid',
      passwordField: 'password',
    });
  }

  async validate(userid: string, password: string) {
    const user = await this.authService.validateUser(userid, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}

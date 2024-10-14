import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() body) {
    const userid = body?.userid;
    const password = body?.password;
    const name = body?.name;
    return this.userService.register(userid, password, name);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getUserInfo(@Param('id') id) {
    const userId = id;

    const user = await this.userService.getUserInfo(userId);

    return user;
  }
}

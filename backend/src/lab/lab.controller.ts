import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { LabService } from './lab.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { User } from 'src/decorators/user.decorator';
import { rentalLabDto } from 'src/dtos/lab.dto';
import { LabInformationEntity } from 'src/entities/lab-info.entity';
import { LabEntity } from 'src/entities/lab.entity';
@Controller('/lab')
export class LabController {
  constructor(private readonly labService: LabService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/rental')
  async rentalRequest(@Body() body: rentalLabDto, @User() user) {
    const userId = user.id;
    const {
      rentalDate,
      rentalStartTime,
      rentalPurpose,
      hopeLab,
      rentalUser,
      rentalUsers,
    } = body;

    const lab = await this.labService.rentalRequest(
      rentalDate,
      rentalStartTime,
      rentalPurpose,
      hopeLab,
      rentalUser,
      rentalUsers,
      userId,
    );

    return lab;
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/cancel/:userId')
  async cancelRequest(@Param('userId') userId, @Req() request) {
    const token = request.headers.authorization.split(' ')[1];
    const decodedToken = await this.labService.verifyToken(token);
    const jwtUserId = decodedToken.id;
    if (userId == jwtUserId) {
      const lab = await this.labService.cancelRequest(userId);
      return { auth: true, userId };
    } else {
      return { Message: '삭제할 수 없는 실습실입니다.', auth: false };
    }
  }

  @Get('/available')
  async getAllLabs(): Promise<LabEntity[]> {
    return await this.labService.getAllLabs();
  }
}

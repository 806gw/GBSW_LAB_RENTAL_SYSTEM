import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
  Body,
} from '@nestjs/common';
import { RolesGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/role.decorator';
import { RoleType } from 'src/auth/role.type';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

class CheckConflictDto {
  labName: string;
  rentalDate: string;
  rentalStartTime: string;
}

class ChangeLabDto {
  userId: number;
  newLabName: string;
}

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Delete('/:userId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.ADMIN)
  async deleteLab(@Param('userId') userId: number) {
    return await this.adminService.cancelRentalLab(userId);
  }

  @Patch('/:userId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.ADMIN)
  async updateLab(@Param('userId') userId: number) {
    return await this.adminService.permitRentalLab(userId);
  }

  @Post('/approvalRental')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.ADMIN)
  async getRentalRequests() {
    return await this.adminService.getApprovalRequest();
  }

  @Post('/deletionRental')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.ADMIN)
  async getAllRentalRequests() {
    return await this.adminService.getDeletionRequest();
  }

  @Post('/checkConflict')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.ADMIN)
  async checkConflict(@Body() checkRequest: CheckConflictDto) {
    return await this.adminService.checkConflict(checkRequest);
  }

  @Put('/changeLab')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.ADMIN)
  async changeLab(@Body() changeLabDto: ChangeLabDto): Promise<string> {
    return await this.adminService.changeLab(changeLabDto);
  }

  @Get('/is-admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.ADMIN)
  async isAdmin() {
    return { isAdmin: true };
  }
}

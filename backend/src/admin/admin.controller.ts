import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RolesGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/role.decorator';
import { RoleType } from 'src/auth/role.type';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  @Delete('/:userId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.ADMIN)
  async deleteLab(@Param('userId') userId) {
    const res = await this.adminService.cancelRentalLab(userId);
    return res;
  }

  @Patch('/:userId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.ADMIN)
  async updateLab(@Param('userId') userId) {
    const res = await this.adminService.permitRentalLab(userId);
    return res;
  }

  @Post('/approvalRental')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.ADMIN)
  async getRentalRequests() {
    const req = await this.adminService.getApprovalRequest();
    return req;
  }

  @Post('/deletionRental')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.ADMIN)
  async getAllRentalRequests() {
    const req = await this.adminService.getDeletionRequest();
    return req;
  }

  @Get('/is-admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.ADMIN)
  async isAdmin() {
    return { isAdmin: true };
  }
}

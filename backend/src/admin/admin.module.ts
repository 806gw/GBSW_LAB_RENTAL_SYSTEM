import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LabEntity } from 'src/entities/lab.entity';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { LabInformationEntity } from 'src/entities/lab-info.entity';
import { UserEntity } from 'src/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([LabEntity, LabInformationEntity, UserEntity]),
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class adminModule {}

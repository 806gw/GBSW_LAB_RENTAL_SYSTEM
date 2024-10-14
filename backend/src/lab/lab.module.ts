import { Module } from '@nestjs/common';
import { LabController } from './lab.controller';
import { LabService } from './lab.service';
import { LabEntity } from 'src/entities/lab.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LabInformationEntity } from 'src/entities/lab-info.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LabEntity, LabInformationEntity])],
  controllers: [LabController],
  providers: [LabService],
})
export class LabModule {}

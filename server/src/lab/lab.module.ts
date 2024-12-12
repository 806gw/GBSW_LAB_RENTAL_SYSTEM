import { Module } from '@nestjs/common'
import { LabService } from './lab.service'
import { LabController } from './lab.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Lab } from './entities/lab.entity'
import { UserModule } from 'src/user/user.module'

@Module({
  imports: [TypeOrmModule.forFeature([Lab]), UserModule],
  controllers: [LabController],
  providers: [LabService]
})
export class LabModule {}

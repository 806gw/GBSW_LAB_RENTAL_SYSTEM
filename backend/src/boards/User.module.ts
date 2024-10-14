import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { UserController } from 'src/boards/user.controller';
import { UserAuthority } from 'src/entities/user-authority.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, UserAuthority])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}

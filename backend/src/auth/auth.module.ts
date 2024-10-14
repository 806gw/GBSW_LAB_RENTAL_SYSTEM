import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserAuthority } from 'src/entities/user-authority.entity';
import { JwtStrategy } from 'src/strategies/jwt.strategy';
import { Localstrategy } from 'src/strategies/local.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, UserAuthority]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (ConfigService: ConfigService) => {
        return {
          secret: ConfigService.get('JWT_SECRET'),
          signOptions: { expiresIn: '12h' },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, Localstrategy],
})
export class AuthModule {}

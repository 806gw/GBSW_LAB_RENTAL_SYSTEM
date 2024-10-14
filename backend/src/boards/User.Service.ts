import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';
import { RoleType } from 'src/auth/role.type';
import { UserAuthority } from 'src/entities/user-authority.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(UserAuthority)
    private readonly userAuthorityRepository: Repository<UserAuthority>,
  ) {}

  async getUserInfo(userId: string) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new BadRequestException('사용자를 찾을 수 없습니다.');
    }

    const userInfo = {
      userid: user.userid,
      name: user.name,
    };

    return userInfo;
  }

  async register(userid: string, password: string, name: string) {
    const existedUser = await this.userRepository.findOne({
      where: {
        userid: userid,
      },
    });

    if (!userid || !password || !name) {
      throw new BadRequestException('입력되지 않은 부분을 확인해주세요');
    }

    if (existedUser) {
      throw new BadRequestException('이미 등록된 사용자입니다.');
    }

    const hashedPassword = await hash(password, 10);

    const user = await this.userRepository.save({
      userid: userid,
      password: hashedPassword,
      name: name,
    });

    const defaultRole = RoleType.USER;
    const userAuthority = this.userAuthorityRepository.create({
      authority_name: defaultRole,
      user_id: user.id,
    });

    await this.userAuthorityRepository.save(userAuthority);

    return user;
  }
}

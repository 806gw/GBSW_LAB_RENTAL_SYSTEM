import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserAuthority } from 'src/entities/user-authority.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(UserAuthority)
    private readonly userAuthority: Repository<UserAuthority>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(userid: string, password: string) {
    const user = await this.userRepository.findOne({
      where: { userid: userid },
      relations: ['authorities'],
    });

    if (!user) {
      throw new BadRequestException('아이디가 잘못되었습니다.');
    }

    const isPasswordMatch = await compare(password, user.password);

    if (!isPasswordMatch) {
      throw new BadRequestException('비밀번호가 일치하지 않습니다.');
    }

    this.convertInAuthorities(user);

    return user;
  }

  async logIn(user: UserEntity) {
    const accessToken = this.jwtService.sign({
      id: user.id,
      userid: user.userid,
      authorities: user.authorities,
    });

    return {
      accessToken: accessToken,
      authorities: user.authorities,
      name: user.name,
    };
  }

  async tokenValidateUser(id: number) {
    const userFind = await this.userAuthority.findOne({
      where: { id: id },
    });

    this.flatAuthorities(userFind);
    return userFind;
  }

  private flatAuthorities(user: any): UserEntity {
    if (user && user.authorities) {
      const authorities: string[] = [];
      user.authorities.forEach((authority) =>
        authorities.push(authority.authorityName),
      );
      user.authorities = authorities;
    }
    return user;
  }

  private convertInAuthorities(user: any): UserEntity {
    if (user && user.authorities) {
      const authorities: string[] = user.authorities.map(
        (authority) => authority.authority_name,
      );
      user.authorities = authorities;
    }
    return user;
  }
}

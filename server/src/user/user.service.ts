import { ConflictException, Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { Repository } from 'typeorm'
import { RolesEnum } from 'src/util/enum/roles.enum'
import * as bcrypt from 'bcryptjs'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly user: Repository<User>
  ) {}

  public async createUser(dto: CreateUserDto, role: RolesEnum): Promise<User> {
    const salt = await bcrypt.genSalt()
    const password = await this.hashPassword(dto.password, salt)

    const userId = await this.user.save({
      username: dto.username,
      password,
      role
    })

    return userId
  }

  public async hashPassword(password: string, salt: string): Promise<string> {
    return await bcrypt.hash(password, salt)
  }

  public async getOneUser(id: number): Promise<User> {
    return await this.user.findOne({
      where: {
        id
      }
    })
  }

  public async findAllUser(): Promise<User[]> {
    return await this.user.find()
  }

  public async checkUsername(username: string): Promise<void> {
    const existing = await this.user.findOne({
      where: [{ username }]
    })

    if (existing) {
      throw new ConflictException({
        success: false,
        message: `${username}은 이미 사용중인 이름 입니다`
      })
    }
  }

  public async updateUserStatus(id: number, updateUserDto: UpdateUserDto): Promise<void> {
    const { ...update } = updateUserDto

    if (update.password) {
      const salt = await bcrypt.genSalt()

      update.password = await this.hashPassword(update.password, salt)
    }
    if (update.username) {
      await this.checkUsername(updateUserDto.username)
    }
    await this.user.update({ id }, update)
  }

  public async deleteUser(id: number): Promise<void> {
    await this.user.delete({ id })
  }

  public async findUserByLogin(login: string, secret = false): Promise<User | undefined> {
    return (
      (await this.user.findOne({
        where: [{ username: login }],
        select: {
          id: true,
          username: true,
          password: secret,
          role: true
        }
      })) ?? undefined
    )
  }
}

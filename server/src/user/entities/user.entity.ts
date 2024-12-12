import { ApiProperty } from '@nestjs/swagger'
import { Lab } from 'src/lab/entities/lab.entity'
import { RolesEnum } from 'src/util/enum/roles.enum'
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User extends BaseEntity {
  @ApiProperty({
    description: '기본키',
    default: '1'
  })
  @PrimaryGeneratedColumn({
    name: 'user_id',
    type: 'integer'
  })
  public readonly id: number

  @ApiProperty({
    description: '사용자 이름(닉네임)',
    default: '김승환 | silofn523'
  })
  @Column({
    name: 'username',
    type: 'varchar',
    nullable: false
  })
  public readonly username: string

  @ApiProperty({
    description: '사용자 패스워드',
    default: '1234'
  })
  @Column({
    name: 'password',
    type: 'varchar',
    nullable: false
  })
  public readonly password: string

  @ApiProperty({
    description: '사용자 권한',
    default: 'user | admin'
  })
  @Column({
    name: 'role_type',
    nullable: false
  })
  public readonly role: RolesEnum

  @OneToMany(() => Lab, (lab) => lab.user, { eager: true })
  public readonly lab: Lab[]
}

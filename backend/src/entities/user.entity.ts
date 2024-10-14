import { Column, Entity, OneToMany } from 'typeorm';
import { CommonBigPKEntity } from './common.entity';
import { UserAuthority } from './user-authority.entity';

@Entity('user')
export class UserEntity extends CommonBigPKEntity {
  @Column('varchar', { unique: false, nullable: false, length: 255 })
  password: string;

  @Column('varchar', { unique: false, nullable: false, length: 50 })
  userid: string;

  @Column('varchar', { unique: false, nullable: false, length: 50 })
  name: string;

  @OneToMany(() => UserAuthority, (userAuthority) => userAuthority.user, {
    eager: true,
  })
  authorities?: any[];
}

import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { UserEntity } from './user.entity';
import { CommonBigPKEntity } from './common.entity';

export enum ApprovalStatus {
  APPROVALWAITING = 'APPROVALWAITING',
  DELETIONWAITING = 'DELETIONWAITING',
  APPROVED = 'APPROVED',
}

@Entity('lab')
export class LabEntity extends CommonBigPKEntity {
  @Column('date', { nullable: false })
  rentalDate: Date;

  @Column('varchar', { nullable: false, length: 30 })
  rentalStartTime: string;

  @Column('varchar', { nullable: false, length: 100 })
  rentalPurpose: string;

  @Column('varchar', { nullable: false, length: 30 })
  hopeLab: string;

  @Column('int', { unique: false, nullable: false })
  userId: number;

  @Column('varchar', { nullable: false, length: 100 })
  rentalUser: string;

  @Column('varchar', { nullable: false, length: 100 })
  rentalUsers: string;

  @Column({
    type: 'enum',
    enum: ApprovalStatus,
  })
  approvalStatus: ApprovalStatus;

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: UserEntity;
}

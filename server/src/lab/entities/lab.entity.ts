import { ApiProperty } from '@nestjs/swagger'
import { User } from 'src/user/entities/user.entity'
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Lab extends BaseEntity {
  @ApiProperty({
    description: '기본키',
    default: '1'
  })
  @PrimaryGeneratedColumn({
    name: 'lap_id'
  })
  public readonly id: number

  @ApiProperty({
    description: '대여 희망시간',
    default: '2024-12-25'
  })
  @Column({
    name: 'rental_Date',
    type: 'date',
    nullable: false
  })
  public readonly rentalDate: Date

  @ApiProperty({
    description: '대표자 이름 기재',
    default: '성홍제'
  })
  @Column({
    name: 'rental_User',
    type: 'varchar',
    nullable: false
  })
  public readonly rentalUser: string

  @ApiProperty({
    description: '사용자 인원 전체 기재',
    default: '성홍제, 유진승'
  })
  @Column({
    name: 'rental_Users',
    type: 'varchar',
    nullable: false
  })
  public readonly rentalUsers: string

  @ApiProperty({
    description: '사용 목적',
    default: '캡스톤'
  })
  @Column({
    name: 'rental_Purpose',
    type: 'varchar',
    nullable: false
  })
  public readonly rentalPurpose: string

  @ApiProperty({
    description: '사용 대여 시간',
    default: '야자시간(19:10 ~ 20:30)'
  })
  @Column({
    name: 'rental_Start_Time',
    type: 'varchar',
    nullable: false
  })
  public readonly rentalStartTime: string

  @ApiProperty({
    description: '삭제여부',
    default: 'false'
  })
  @Column({
    name: 'deletion_Rental',
    type: 'boolean',
    nullable: false
  })
  public readonly deletionRental: boolean

  @ApiProperty({
    description: '승인여부',
    default: 'false'
  })
  @Column({
    name: 'approval_Rental',
    type: 'boolean',
    nullable: false
  })
  public readonly approvalRental: boolean
  @ApiProperty({
    description: '빌릴 랩실 이름',
    default: '3층 임베디드 실습실'
  })
  @Column({
    name: 'lab_Name',
    type: 'varchar',
    nullable: false
  })
  public readonly labName: string

  @ApiProperty({
    description: '유저 고유ID',
    default: '1'
  })
  @Column({
    name: 'user_id',
    type: 'integer',
    nullable: false
  })
  public readonly userId: number

  @ManyToOne(() => User, (user) => user.lab, { onDelete: 'CASCADE', eager: false })
  @JoinColumn({ name: 'user_id' })
  public readonly user: User
}

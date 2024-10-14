import { TinyIntegerDataType } from 'sequelize';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('lab-info')
export class LabInformationEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column('int', { nullable: false, unique: true })
  userId: number;

  @Column('varchar', { nullable: false, unique: true })
  labName: string;

  @Column('tinyint', { nullable: false, default: true })
  Available: TinyIntegerDataType;

  @Column('varchar', { nullable: false, length: 100 })
  rentalPurpose: string;

  @Column('varchar', { nullable: false, length: 100 })
  rentalUser: string;

  @Column('varchar', { nullable: false, length: 100 })
  rentalUsers: string;

  @Column('date', { nullable: false })
  rentalDate: Date;

  @Column('boolean', { nullable: false, default: false })
  deletionRental: Boolean;

  @Column('varchar', { nullable: false, length: 30 })
  rentalStartTime: string;
}

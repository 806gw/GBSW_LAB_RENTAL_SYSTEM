import { PickType } from '@nestjs/swagger';
import { LabEntity } from 'src/entities/lab.entity';

export class rentalLabDto extends PickType(LabEntity, [
  'rentalDate',
  'rentalUser',
  'rentalUsers',
  'rentalStartTime',
  'rentalPurpose',
  'hopeLab',
  'userId',
]) {}

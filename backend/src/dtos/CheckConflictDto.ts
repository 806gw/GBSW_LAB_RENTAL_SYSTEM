import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CheckConflictDto {
  @IsString()
  @IsNotEmpty()
  labName: string;

  @IsDateString() // ISO 형식의 날짜 문자열로 받지만 내부적으로 Date로 처리
  rentalDate: Date;

  @IsString()
  @IsNotEmpty()
  rentalStartTime: string;
}

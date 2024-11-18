import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class ChangeLabDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsString()
  @IsNotEmpty()
  newLabName: string;
}

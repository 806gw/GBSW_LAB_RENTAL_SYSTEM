import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreateLabDto {
  @ApiProperty({
    description: "대여 희망시간",
    default: "2024-12-25",
  })
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  public readonly rentalDate: Date;

  @ApiProperty({
    description: "대표자 이름 기재",
    default: "성홍제",
  })
  @IsString()
  @IsNotEmpty()
  public readonly rentalUser: string;

  @ApiProperty({
    description: "사용자 인원 전체 기재",
    default: "성홍제, 유진승",
  })
  @IsString()
  @IsNotEmpty()
  public readonly rentalUsers: string;

  @ApiProperty({
    description: "사용 목적",
    default: "캡스톤",
  })
  @IsNotEmpty()
  @IsString()
  public readonly rentalPurpose: string;

  @ApiProperty({
    description: "사용 대여 시간",
    default: "야자시간(19:10 ~ 20:30)",
  })
  @IsString()
  @IsNotEmpty()
  public readonly rentalStartTime: string;

  @ApiProperty({
    description: "빌릴 랩실 이름",
    default: "3층 임베디드 실습실",
  })
  @IsString()
  @IsNotEmpty()
  public readonly labName: string;

  // @ApiProperty({
  //   description: '유저 고유ID',
  //   default: '1'
  // })
  // @IsNumber()
  // @IsNotEmpty()
  // public readonly userId: number
}

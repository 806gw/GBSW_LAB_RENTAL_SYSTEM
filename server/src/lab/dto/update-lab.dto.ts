import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateLabDto } from "./create-lab.dto";
import { IsBoolean, IsOptional, IsString } from "class-validator";

export class UpdateLabDto extends PartialType(CreateLabDto) {
  @ApiProperty({
    description: "삭제여부",
    default: "false",
  })
  @IsOptional()
  @IsBoolean()
  public readonly deletionRental: boolean;

  @ApiProperty({
    description: "승인여부",
    default: "false",
  })
  @IsOptional()
  @IsBoolean()
  public readonly approvalRental: boolean;

  @ApiProperty({
    description: "빌릴 랩실 이름",
    default: "3층 임베디드 실습실",
  })
  @IsString()
  @IsOptional()
  public readonly labName: string;
}

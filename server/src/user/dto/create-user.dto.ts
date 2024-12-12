import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator'

export class CreateUserDto {
  @ApiProperty({
    description: '사용자 이름(닉네임)',
    default: '김승환 | silofn523'
  })
  @IsString()
  @MinLength(4)
  @MaxLength(15)
  @IsNotEmpty()
  public readonly username: string

  @ApiProperty({
    description: '사용자 패스워드',
    default: '1234'
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  public readonly password: string
}

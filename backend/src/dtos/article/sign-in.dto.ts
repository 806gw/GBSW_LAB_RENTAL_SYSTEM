import { PickType } from '@nestjs/swagger';
import { UserEntity } from 'src/entities/user.entity';

export class SinginDto extends PickType(UserEntity, ['userid', 'password']) {}

import { ApiProperty } from '@nestjs/swagger';
import { GenderEnum } from 'src/enums/gender.enum';

export class UserDetailResponse {

  @ApiProperty({ description: '用户ID' })
  id: number;

  @ApiProperty({ description: '用户名' })
  username: string;

  @ApiProperty({ description: '性别' })
  gender: GenderEnum;
}

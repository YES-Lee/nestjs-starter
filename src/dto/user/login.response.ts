import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../../database/entities/user.entity';

export class LoginResponse extends UserEntity {
  @ApiProperty({ description: '登录认证令牌' })
  token: string;
}

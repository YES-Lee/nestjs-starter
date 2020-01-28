import { ApiProperty } from '@nestjs/swagger';
import { UserModel } from '../../database/models/user.model';

export class LoginResponse extends UserModel {
  @ApiProperty({ description: '登录认证令牌' })
  token: string;
}

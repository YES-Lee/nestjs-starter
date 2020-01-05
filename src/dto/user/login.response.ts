import { ApiProperty } from '@nestjs/swagger';
import { UserDetailResponse } from './user-detail.response';

export class LoginResponse extends UserDetailResponse {
  @ApiProperty({ description: '登录认证令牌' })
  token: string;
}

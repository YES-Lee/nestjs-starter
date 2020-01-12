import { ApiProperty } from '@nestjs/swagger';

export class LoginRequest {
  @ApiProperty({ description: '用户名' })
  username: string;

  @ApiProperty({ description: '密码' })
  password: string;
}

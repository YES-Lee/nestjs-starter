import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiHeader, ApiBearerAuth } from '@nestjs/swagger';

export function RequireAuth() {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    UseGuards(AuthGuard('jwt'))(target, key, descriptor);
    ApiBearerAuth()(target, key, descriptor);
    // ApiHeader({
    //   name: 'Authorization',
    //   description: '登录认证',
    //   required: true,
    // })(target, key, descriptor);
  };
}

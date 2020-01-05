import { createParamDecorator } from '@nestjs/common';

/**
 * GraphQl的resolver中使用，获取当前登录的用户
 */
export const CurrentUser = createParamDecorator(
  (data, [root, args, ctx, info]) => ctx.req.user,
);

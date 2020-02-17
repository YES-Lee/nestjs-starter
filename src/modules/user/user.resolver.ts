import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/graphql.guard';
import { LoginResult } from '../../graphql/schemas/user/login.result';
import { LoginArgs } from '../../graphql/schemas/user/login.args';
import { UserDetailResult } from '../../graphql/schemas/user/user-detail.result';
import { CurrentUser } from '../../decorators/current-user.decorator';
import { UserListResult } from '../../graphql/schemas/user/list.result';
import { UserListArgs } from '../../graphql/schemas/user/list.args';

@Resolver('User')
export class UserResolver {
  constructor(private userService: UserService) {}

  @Mutation(returns => LoginResult, { description: '用户登录' })
  login(@Args() account: LoginArgs) {
    const result = this.userService.login(account);
    if (result.getErrorCode()) {
      throw new Error(result.getErrorMessage());
    }
    return result.getData();
  }

  @UseGuards(GqlAuthGuard)
  @Query(returns => UserDetailResult, { description: '获取当前登录用户信息' })
  getCurrentUser(@CurrentUser() user: any) {
    const result = this.userService.getCurrent(user.id);
    if (result.getErrorCode()) {
      throw new Error(result.getErrorMessage());
    }
    return result.getData();
  }

  @UseGuards(GqlAuthGuard)
  @Query(returns => UserListResult, { description: '获取用户列表' })
  userList(@Args() data: UserListArgs) {
    return this.userService.getUserList(data).getData();
  }
}

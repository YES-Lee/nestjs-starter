import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UserService } from './user.service';
import { LoginResult } from 'src/graphql/schemas/user/login.result';
import { UserDetailResult } from 'src/graphql/schemas/user/user-detail.result';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { LoginArgs } from 'src/graphql/schemas/user/login.args';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/graphql.guard';

@Resolver('User')
export class UserResolver {

  constructor(
    private userService: UserService
  ) {}

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
}

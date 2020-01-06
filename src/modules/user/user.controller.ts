import { Controller, Post, Body, Get, Request, Query, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiBody, ApiResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { LoginRequest } from 'src/dto/user/login.request';
import { LoginResponse } from 'src/dto/user/login.response';
import { UserService } from './user.service';
import { ApiResponse as ApiResult } from 'src/dto/support/api.response';
import { UserDetailResponse } from 'src/dto/user/user-detail.response';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { RequireAuth } from 'src/decorators/require-auth.decorator.';
import { UserListResponse } from 'src/dto/user/list.response';
import { UserListRequest } from 'src/dto/user/list.request';
import { QueryParseIntPip } from 'src/pipes/query-parse-int.pipe';

@ApiTags('用户')
@Controller('user')
export class UserController {

  constructor(
    private userService: UserService
  ) {}

  @ApiOperation({ summary: '用户登录' })
  @ApiBody({ type: LoginRequest, description: '登录参数' })
  @ApiResponse({ type: LoginResponse })
  @Post('login')
  login(@Body() data: LoginRequest): ApiResult<LoginResponse> {
    return this.userService.login(data);
  }

  @ApiOperation({ summary: '获取当前登录用户信息' })
  @ApiResponse({ type: UserDetailResponse })
  @RequireAuth()
  @Get('getCurrentUser')
  getCurrentUser(@Request() req: any): ApiResult<UserDetailResponse> {
    return this.userService.getCurrent(req.user.id);
  }

  @ApiOperation({ summary: '获取用户列表' })
  @ApiResponse({ type: UserListResponse })
  @RequireAuth()
  @Get('userList')
  getUserList(@Query(new QueryParseIntPip(['page', 'pageSize'])) query: UserListRequest): ApiResult<UserListResponse> {
    console.log(query);
    return this.userService.getUserList(query);
  }
}

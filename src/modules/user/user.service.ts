import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserModel } from 'src/database/models/user.model';
import { GenderEnum } from 'src/enums/gender.enum';
import { LoginRequest } from 'src/dto/user/login.request';
import { AuthService } from '../auth/auth.service';
import { ApiResponse } from 'src/dto/support/api.response';
import { LoginResponse } from 'src/dto/user/login.response';
import { UserDetailResponse } from 'src/dto/user/user-detail.response';
import { UserListResponse } from 'src/dto/user/list.response';
import { UserListRequest } from 'src/dto/user/list.request';

/**
 * 临时数据
 */
const demoUser: UserModel = {
  id: 1,
  username: 'admin',
  password: 'admin',
  gender: GenderEnum.MALE,
} as UserModel;

@Injectable()
export class UserService {
  constructor(private authService: AuthService) {}

  login(account: LoginRequest): ApiResponse<LoginResponse> {
    if (
      account.username === demoUser.username &&
      account.password === demoUser.password
    ) {
      const token = this.authService.sign(demoUser);
      return ApiResponse.success<LoginResponse>({
        id: demoUser.id,
        username: demoUser.username,
        gender: demoUser.gender,
        token,
      });
    } else {
      return ApiResponse.error(10001, '用户名或密码错误');
    }
  }

  getCurrent(id: number): ApiResponse<UserDetailResponse> {
    if (id === demoUser.id) {
      return ApiResponse.success<UserDetailResponse>(demoUser);
    } else {
      throw new UnauthorizedException();
    }
  }

  getUserList(data: UserListRequest): ApiResponse<UserListResponse> {
    return ApiResponse.success({
      count: 1,
      rows: [
        {
          id: demoUser.id,
          username: demoUser.username,
          gender: demoUser.gender,
        },
      ],
    });
  }
}

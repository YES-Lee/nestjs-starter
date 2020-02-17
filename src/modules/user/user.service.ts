import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { UserModel } from '../../database/models/user.model';
import { GenderEnum } from '../../enums/gender.enum';
import { LoginRequest } from '../../dto/user/login.request';
import { LoginResponse } from '../../dto/user/login.response';
import { ApiResponse } from '../../dto/support/api.response';
import { UserListRequest } from '../../dto/user/list.request';
import { UserListResponse } from '../../dto/user/list.response';

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
      } as LoginResponse);
    } else {
      return ApiResponse.error(10001, '用户名或密码错误');
    }
  }

  getCurrent(id: number): ApiResponse<UserModel> {
    if (id === demoUser.id) {
      return ApiResponse.success<UserModel>(demoUser);
    } else {
      throw new UnauthorizedException();
    }
  }

  getUserList(data: UserListRequest): ApiResponse<UserListResponse> {
    const user = new UserModel();
    user.id = demoUser.id;
    user.username = demoUser.username;
    user.gender = demoUser.gender;
    return ApiResponse.success({
      count: 1,
      rows: [
        user
      ],
    });
  }
}

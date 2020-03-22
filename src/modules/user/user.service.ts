import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { UserEntity } from '../../database/entities/user.entity';
import { GenderEnum } from '../../enums/gender.enum';
import { LoginRequest } from '../../dto/user/login.request';
import { LoginResponse } from '../../dto/user/login.response';
import { ApiResponse } from '../../dto/support/api.response';
import { UserListRequest } from '../../dto/user/list.request';
import { UserListResponse } from '../../dto/user/list.response';
import { USER_REPO } from './user.providers';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    private authService: AuthService,
    @Inject(USER_REPO) private userRepo: Repository<UserEntity>
  ) {}

  async login(account: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    const user = await this.userRepo.findOne({ username: account.username, password: account.password });
    if (!user) {
      throw new Error('用户名或密码错误');
    }
    const token = this.authService.sign({...user});
    return ApiResponse.success({
      ...user,
      token,
    });
  }

  async getCurrent(id: number): Promise<ApiResponse<UserEntity>> {
    const result = await this.userRepo.findOne(id);
    return ApiResponse.success(result);
  }

  async getUserList(data: UserListRequest): Promise<ApiResponse<UserListResponse>> {
    const [rows, count] = await this.userRepo
      .createQueryBuilder()
      .limit(data.pageSize)
      .offset((data.page - 1) * data.pageSize)
      .getManyAndCount();

    return ApiResponse.success({
      count,
      rows
    });
  }
}

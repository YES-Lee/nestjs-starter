import { Injectable } from '@nestjs/common';
import { ApiResponse } from './dto/support/api.response';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  testSuccess(): ApiResponse<string> {
    return ApiResponse.success('success!');
  }

  testError(): ApiResponse<string> {
    return ApiResponse.error(10000, '测试错误');
  }
}

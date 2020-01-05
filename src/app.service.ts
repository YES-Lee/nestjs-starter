import { Injectable } from '@nestjs/common';
import { ApiResponse } from './dto/support/api.response';

@Injectable()
export class AppService {

  testSuccess(): ApiResponse<string> {
    return ApiResponse.success('success!');
  }

  testError(): ApiResponse<string> {
    return ApiResponse.error(10000, '测试错误');
  }
}

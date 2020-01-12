import { Injectable } from '@nestjs/common';
import { ApiResponse } from './dto/support/api.response';
import { ConfigService } from '@nestjs/config';
import { SystemInfoResult } from './graphql/schemas/system/info.result';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  testSuccess(): ApiResponse<string> {
    return ApiResponse.success('success!');
  }

  testError(): ApiResponse<string> {
    return ApiResponse.error(10000, '测试错误');
  }

  systemInfo(): SystemInfoResult {
    return {
      version: this.configService.get('app.version'),
      env: process.env.NODE_ENV,
    };
  }
}

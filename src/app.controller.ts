import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import {
  ApiTags,
  ApiResponse,
  ApiBearerAuth,
  ApiSecurity,
  ApiOperation,
} from '@nestjs/swagger';
import { RequireAuth } from './decorators/require-auth.decorator.';

@ApiTags('测试')
@Controller('test')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: '测试接口' })
  @Get()
  testSuccess() {
    return this.appService.testSuccess();
  }

  @ApiOperation({ summary: 'unauthorized' })
  @RequireAuth()
  @Get('unauthorized')
  unauthorized() {
    return 'success';
  }
}

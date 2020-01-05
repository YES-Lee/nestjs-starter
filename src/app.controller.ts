import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiResponse, ApiBearerAuth, ApiSecurity, ApiOperation } from '@nestjs/swagger';
import { RequireAuth } from './decorators/require-auth.decorator.';

@ApiTags('测试')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: '测试接口' })
  @Get()
  testSuccess(@Req() req: any) {
    return this.appService.testSuccess();
  }
}

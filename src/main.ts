import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import { ResponseFormatInterceptor } from './interceptors/response-format.interceptor';
import { UnauthorizedExceptionFilter } from './filters/unauthorized-exception.filter';
import { InternalExceptionFilter } from './filters/internal-exception.filter';
import { NotFoundExceptionFilter } from './filters/not-found-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useLogger(app.get(Logger));

  const config = app.get(ConfigService);

  if (config.get('swagger.enable')) {
    const swaggerOptions = new DocumentBuilder()
      .addBearerAuth()
      .setTitle('Nest种子项目')
      .setDescription('nestjs快速开发框架')
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, swaggerOptions);
    SwaggerModule.setup(config.get('swagger.path'), app, document);
  }

  app.useGlobalInterceptors(new ResponseFormatInterceptor(app.get(Logger)));
  /**
   * 最后注册的filter最先执行
   */
  app.useGlobalFilters(
    new InternalExceptionFilter(app.get(Logger)),
    new UnauthorizedExceptionFilter(),
    new NotFoundExceptionFilter(),
  );

  await app.listen(
    process.env.PORT || app.get(ConfigService).get('app.port') || 3000,
  );
}
bootstrap();

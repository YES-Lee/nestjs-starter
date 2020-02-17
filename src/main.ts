import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import { ResponseFormatInterceptor } from './interceptors/response-format.interceptor';
import { UnauthorizedExceptionFilter } from './filters/unauthorized-exception.filter';
import { InternalExceptionFilter } from './filters/internal-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useLogger(app.get(Logger));

  const config = app.get(ConfigService);

  if (config.get('swagger.enabled')) {
    const swaggerOptions = new DocumentBuilder()
      .addBearerAuth()
      .setTitle('Nest种子项目')
      .setDescription('nest + graphql + sequelize快速开发框架')
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, swaggerOptions);
    SwaggerModule.setup(config.get('swagger.path'), app, document);
  }

  app.useGlobalInterceptors(new ResponseFormatInterceptor(app.get(Logger)));
  app.useGlobalFilters(
    new InternalExceptionFilter(app.get(Logger)),
    new UnauthorizedExceptionFilter()
  );

  await app.listen(
    process.env.PORT || app.get(ConfigService).get('app.port') || 3000,
  );
}
bootstrap();

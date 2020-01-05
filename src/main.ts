import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: false });

  app.useLogger(app.get(Logger));

  const swaggerOptions = new DocumentBuilder().addBearerAuth()
    .setTitle('Nest种子项目')
    .setDescription('nest + graphql + sequelize快速开发框架')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(3000);
}
bootstrap();

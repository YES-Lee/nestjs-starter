import { Module, Global, HttpModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { GraphqlModule } from './graphql/graphql.module';
import { AppResolver } from './app.resolver';
import { appProviders } from './app.providers';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { LoggerModule } from 'nestjs-pino';
import { ConfigModule } from './config/config.module';
import * as pino from 'pino';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    DatabaseModule,
    GraphqlModule,
    AuthModule,
    UserModule,
    HttpModule.register({
      timeout: 60000,
    }),
    LoggerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          enabled: configService.get('log.enabled'),
          timestamp: configService.get('log.timestamp'),
          level: configService.get('log.level'),
          useLevelLabels: configService.get('log.useLevelLabels'),
          prettyPrint: configService.get('log.prettyPrint'),
          stream: pino.destination(configService.get('log.path')),
        };
      },
    }),
    ConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver, ...appProviders],
  exports: [AuthModule],
})
export class AppModule {}

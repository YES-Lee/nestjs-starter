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
import * as pino from 'pino';

@Global()
@Module({
  imports: [
    DatabaseModule,
    GraphqlModule,
    AuthModule,
    UserModule,
    HttpModule.register({
      timeout: 60000
    }),
    LoggerModule.forRoot({
      enabled: true,
      timestamp: true,
      prettyPrint: process.env.NODE_ENV !== 'production',
      level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
      useLevelLabels: true,
    }, process.env.NODE_ENV === 'production' && pino.destination(__dirname + '/app.log'))
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService,
    AppResolver,
    ...appProviders
  ],
  exports: [
    AuthModule
  ]
})
export class AppModule {}

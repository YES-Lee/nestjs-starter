import { Module, Global } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { GraphqlModule } from './graphql/graphql.module';
import { AppResolver } from './app.resolver';
import { appProviders } from './app.providers';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';

@Global()
@Module({
  imports: [
    DatabaseModule,
    GraphqlModule,
    AuthModule,
    UserModule
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

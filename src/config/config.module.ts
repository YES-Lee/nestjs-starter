import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import defaultConfig from './config.default';

const env = process.env.NODE_ENV;
// tslint:disable-next-line: no-var-requires
let alterConfig = env ? require(`./config.${env}`).default : () => ({});
alterConfig = alterConfig ? alterConfig : () => ({});

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      load: [
        defaultConfig,
        alterConfig
      ]
    })
  ]
})
export class ConfigModule {}

import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import defaultConfig from './config.default';
import * as fs from 'fs';

const env = process.env.NODE_ENV;

let alterConfig = () => ({});
if (env) {
  const files = fs.readdirSync('./');
  for (const f of files) {
    if (f.indexOf(`config.${env}`)) {
      // tslint:disable-next-line: no-var-requires
      alterConfig = require(`./config.${env}`).default;
      break;
    }
  }
}

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      load: [defaultConfig, alterConfig],
    }),
  ],
})
export class ConfigModule {}

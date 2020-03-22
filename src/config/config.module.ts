import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import defaultConfig from './config.default';
import * as fs from 'fs';
import * as _ from 'lodash';

const env = process.env.NODE_ENV;

const config = _.cloneDeep(defaultConfig);
if (env) {
  const files = fs.readdirSync('./');
  for (const f of files) {
    if (f.indexOf(`config.${env}`)) {
      // tslint:disable-next-line: no-var-requires
      _.merge(config, require(`./config.${env}`).default);
    }
  }
}

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      load: [() => config],
    }),
  ],
})
export class ConfigModule {}

/**
 * 配置
 */
export interface Config {
  /**
   * app配置
   */
  app?: {
    /**
     * app 版本
     */
    version?: string;
    /**
     * 应用端口，默认值为3000
     */
    port?: number;
    [key: string]: any;
  };
  /**
   * 日志模块配置
   */
  log?: {
    /**
     * 是否开启日志
     */
    enabled?: boolean;
    /**
     * 是否记录时间戳
     */
    timestamp?: boolean;
    /**
     * 是否显示日志级别标签
     */
    useLevelLabels?: boolean;
    /**
     * 是否格式化日志
     */
    prettyPrint?: boolean,
    /**
     * 日志级别
     */
    level?: 'verbose' | 'info' | 'debug' | 'error';
    /**
     * 日志输出路径
     */
    path?: string;
    [key: string]: any;
  };
  /**
   * swagger
   */
  swagger?: {
    /**
     * 是否开启swagger
     */
    enable?: boolean;
    /**
     * swagger 访问路径
     */
    path?: string;
    [key: string]: any;
  };
  [key: string]: any;
}

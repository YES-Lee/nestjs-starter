import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';
import { createConnection } from 'typeorm';

export const databaseProviders: Provider[] = [
  {
    provide: 'ORM',
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
      return createConnection({
        type: configService.get('database.dialect'),
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.database'),
        entities: [path.resolve(__dirname, './entities/**/*.entity{.ts,.js}')],
        /**
         * 注意⚠️⚠️⚠️：该选项设置为true时，typeorm会通过entity自动创建数据表，慎用⚠️⚠️⚠️
         */
        synchronize: false
      });
    }
  }
];

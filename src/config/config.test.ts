import { Config } from './config.module';

const config: Config = {
  app: {
    port: 3100,
  },
  log: {
    enabled: false
  },
  database: {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'prod-user',
    password: '123456',
    database: 'test',
  },
  swagger: {
    enable: false
  }
};

export default config;

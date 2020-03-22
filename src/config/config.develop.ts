import { Config } from './config.module';

const config: Config = {
  database: {
    dialect: 'mysql',
    host: 'localhost',
    port: 3307,
    username: 'root',
    password: '123456',
    database: 'test',
  },
};

export default config;

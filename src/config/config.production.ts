import * as path from 'path';

export default () => ({
  app: {
    port: 3100,
  },
  log: {
    enabled: true,
    timestamp: true,
    useLevelLabels: true,
    prettyPrint: false,
    level: 'debug',
    path: path.resolve(__dirname, '../app.log'),
  },
  database: {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'prod-user',
    password: '123456',
    database: 'test',
  },
  graphql: {
    debug: false,
    playground: false,
  },
  swagger: {
    enable: false
  }
});

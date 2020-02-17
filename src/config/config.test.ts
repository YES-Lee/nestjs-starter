export default () => ({
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
  graphql: {
    debug: false,
    playground: false,
  },
  swagger: {
    enable: false
  }
});

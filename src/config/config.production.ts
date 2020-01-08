export default () => ({
  log: {
    level: 'debug',
    path: __dirname + '/app.log'
  },
  database: {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'prod-user',
    password: '123456',
    database: 'test',
  }
});

export default () => ({
  log: {
    level: 'debug',
    path: __dirname + '/app.log',
    prettyPrint: false
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

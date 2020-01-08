export default () => ({
  app: {
    version: '0.1.1',
    port: 3000
  },
  log: {
    level: 'info',
    path: __dirname + '/app.log',
    prettyPrint: true
  }
});

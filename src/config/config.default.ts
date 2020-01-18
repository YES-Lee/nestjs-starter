import * as path from 'path';

export default () => ({
  app: {
    version: '0.1.1',
    port: 3001,
  },
  log: {
    level: 'info',
    path: path.resolve(__dirname, '../app.log'),
    prettyPrint: true,
  },
  graphql: {
    debug: true,
    playground: true,
  },
});

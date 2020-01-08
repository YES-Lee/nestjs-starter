/* tslint:disable */

module.exports = {
  apps : [
    {
      name: 'nest-seed-dev',
      script: 'dist/main.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'develop',
        PORT: 3000
      }
    },
    {
      name: 'nest-seed-prod',
      script: 'dist/main.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3100
      }
    }
  ]
};

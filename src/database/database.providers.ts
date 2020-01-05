import { Provider } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import models from './models';

export const databaseProviders: Provider[] = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '123456',
        database: 'test',
        models,
        define: {
          // 自动添加时间戳字段 (updatedAt, createdAt)
          timestamps: true,
          // 自动转换字段名字为下划线命名
          underscored: false,
          // Enable optimistic locking.  When enabled, sequelize will add a version count attribute
          // to the model and throw an OptimisticLockingError error when stale instances are saved.
          // Set to true or a string with the attribute name you want to use to enable.
          version: false,
          createdAt: 'created_at',
          // I want updatedAt to actually be called updateTimestamp
          updatedAt: 'updated_at',
          // And deletedAt to be called destroyTime (remember to enable paranoid for this to work)
          deletedAt: 'deleted_at',
          // don't delete database entries but set the newly added attribute deletedAt
          // to the current date (when deletion was done). paranoid will only work if
          // timestamps are enabled
          paranoid: true,
          getterMethods: {
          },
        },
      });

      return sequelize;
    },
  },
];

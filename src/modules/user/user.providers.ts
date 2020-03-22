import { Provider } from '@nestjs/common';
import { Connection } from 'typeorm';
import { UserEntity } from '../../database/entities/user.entity';

export const USER_REPO = 'USER_REPOSITORY';

export const userProviders: Provider[] = [
  {
    provide: USER_REPO,
    inject: ['ORM'],
    useFactory: (connection: Connection) => connection.getRepository(UserEntity)
  }
];

import { Provider } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';

export const appProviders: Provider[] = [
  {
    provide: 'PUB_SUB',
    useValue: new PubSub()
  }
];

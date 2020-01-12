import { Provider } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';

export const PUB_SUB_PROVIDER = 'PUB_SUB';

export const appProviders: Provider[] = [
  {
    provide: PUB_SUB_PROVIDER,
    useValue: new PubSub(),
  },
];

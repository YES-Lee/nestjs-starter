import { Resolver, Query, Subscription, Mutation, Args } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { PUB_SUB_PROVIDER } from './app.providers';
import { PubSub } from 'graphql-subscriptions';
import { SUBSCRIPTION } from './lib/constant';

@Resolver('App')
export class AppResolver {

  constructor(
    @Inject(PUB_SUB_PROVIDER) private pubSub: PubSub
  ) {}

  @Query(returns => String, { description: '测试接口' })
  test() {
    return 'SUCCESS!';
  }

  @Subscription(returns => String, {
    resolve: value => value
  })
  onTestMessage() {
    return this.pubSub.asyncIterator(SUBSCRIPTION.SEND_TEST_MESSAGE);
  }

  @Mutation(returns => String, { description: '发送测试信息' })
  sendTestMessage(@Args('message') message: string) {
    this.pubSub.publish(SUBSCRIPTION.SEND_TEST_MESSAGE, message);
    return 'success';
  }
}

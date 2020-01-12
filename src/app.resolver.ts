import { Resolver, Query, Subscription, Mutation, Args } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { PUB_SUB_PROVIDER } from './app.providers';
import { PubSub } from 'graphql-subscriptions';
import { SUBSCRIPTION } from './lib/constant';
import { SystemInfoResult } from './graphql/schemas/system/info.result';
import { AppService } from './app.service';

@Resolver('App')
export class AppResolver {
  constructor(
    @Inject(PUB_SUB_PROVIDER) private pubSub: PubSub,
    private appService: AppService,
  ) {}

  @Query(returns => String, { description: '测试接口' })
  test() {
    return 'SUCCESS!';
  }

  @Subscription(returns => String, {
    resolve: value => value,
  })
  onTestMessage() {
    return this.pubSub.asyncIterator(SUBSCRIPTION.SEND_TEST_MESSAGE);
  }

  @Mutation(returns => String, { description: '发送测试信息' })
  sendTestMessage(@Args('message') message: string) {
    this.pubSub.publish(SUBSCRIPTION.SEND_TEST_MESSAGE, message);
    return 'success';
  }

  @Query(returns => SystemInfoResult, { description: '环境变量' })
  systemInfo() {
    return this.appService.systemInfo();
  }
}

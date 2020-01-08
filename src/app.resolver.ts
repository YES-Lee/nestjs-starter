import { Resolver, Query, Subscription, Mutation, Args } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { PUB_SUB_PROVIDER } from './app.providers';
import { PubSub } from 'graphql-subscriptions';
import { SUBSCRIPTION } from './lib/constant';
import * as pkg from '../package.json';
import { ConfigService } from '@nestjs/config';

@Resolver('App')
export class AppResolver {

  constructor(
    @Inject(PUB_SUB_PROVIDER) private pubSub: PubSub,
    private configService: ConfigService
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

  @Query(returns => String, { description: '环境变量' })
  info() {
    return JSON.stringify({
      version: pkg.version,
      env: process.env.NODE_ENV || '',
      config: this.configService.get('database')
    });
  }
}

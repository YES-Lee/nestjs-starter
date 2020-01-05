import { Resolver, Query } from '@nestjs/graphql';

@Resolver('App')
export class AppResolver {

  @Query(returns => String, { description: '测试接口' })
  test() {
    return 'SUCCESS!';
  }
}

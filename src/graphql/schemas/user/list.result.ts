import { ObjectType, Field } from 'type-graphql';
import { IPageResult } from '../support/page.result';
import { UserDetailResult } from './user-detail.result';

@ObjectType({
  description: '用户列表',
  /**
   * @important 这里的配置是必须的
   */
  implements: IPageResult
})
export class UserListResult implements IPageResult<UserDetailResult> {
  count: number;

  @Field(type => [UserDetailResult])
  rows: UserDetailResult[];
}

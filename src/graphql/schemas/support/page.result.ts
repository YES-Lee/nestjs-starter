import { InterfaceType, Field, Int } from 'type-graphql';

@InterfaceType({
  description: '分页接口返回数据接口',
})
export abstract class IPageResult<T> {
  @Field(type => Int)
  count: number;
  /**
   * @important 由于graphql不具有泛型，需要在子类中指定rows类型
   */
  abstract rows: T[];
}

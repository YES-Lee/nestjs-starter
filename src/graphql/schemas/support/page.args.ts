import { Field, Int, ArgsType } from 'type-graphql';

/**
 * 分页接口统一参数格式，所有分页接口子类继承
 */
@ArgsType()
export class IPageArgs {
  @Field(type => Int, { description: '页码', defaultValue: 1 })
  page: number;

  @Field(type => Int, { description: '每页数量', defaultValue: 10 })
  pageSize: number;
}

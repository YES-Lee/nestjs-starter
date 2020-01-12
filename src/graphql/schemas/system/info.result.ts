import { ObjectType, Field } from 'type-graphql';

@ObjectType({
  description: '系统信息',
})
export class SystemInfoResult {
  @Field({ description: '版本' })
  version: string;
  @Field({ description: '环境变量' })
  env: string;
}

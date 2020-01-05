import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class LoginArgs {

  @Field({ description: '用户名', nullable: false })
  username: string;

  @Field({ description: '密码', nullable: false })
  password: string;
}

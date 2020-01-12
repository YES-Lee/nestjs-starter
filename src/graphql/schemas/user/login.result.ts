import { UserModel } from 'src/database/models/user.model';
import { ObjectType, Field } from 'type-graphql';

@ObjectType({
  description: '登录返回结果',
})
export class LoginResult extends UserModel {
  @Field({ description: '登录认证令牌' })
  token: string;
}

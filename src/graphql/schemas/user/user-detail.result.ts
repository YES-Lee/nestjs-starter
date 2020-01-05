import { ObjectType } from 'type-graphql';
import { UserModel } from 'src/database/models/user.model';

@ObjectType({
  description: '用户信息'
})
export class UserDetailResult extends UserModel {}

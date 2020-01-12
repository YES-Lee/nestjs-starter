import {
  Table,
  PrimaryKey,
  AutoIncrement,
  Column,
  Model,
} from 'sequelize-typescript';
import { ObjectType, Field, Int } from 'type-graphql';
import { ApiProperty } from '@nestjs/swagger';
import { GenderEnum } from 'src/enums/gender.enum';

@Table({
  tableName: 'user',
})
@ObjectType({
  description: '用户信息',
})
export class UserModel extends Model<UserModel> {
  @Field(type => Int)
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Field({ description: '用户名' })
  @Column
  username: string;

  @Column
  password: string;

  @Field(type => GenderEnum, { description: '性别' })
  @Column
  gender: GenderEnum;
}

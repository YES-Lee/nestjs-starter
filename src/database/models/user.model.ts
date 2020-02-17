import {
  Table,
  PrimaryKey,
  AutoIncrement,
  Column,
  Model,
} from 'sequelize-typescript';
import { ObjectType, Field, Int } from 'type-graphql';
import { ApiProperty } from '@nestjs/swagger';
import { GenderEnum } from '../../enums/gender.enum';

@Table({
  tableName: 'user',
})
@ObjectType({
  description: '用户信息',
})
export class UserModel extends Model<UserModel> {
  @ApiProperty({ description: '用户ID' })
  @Field(type => Int)
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ApiProperty({ description: '用户名' })
  @Field({ description: '用户名' })
  @Column
  username: string;

  @Column
  password: string;

  @ApiProperty({ enum: GenderEnum, description: '性别' })
  @Field(type => GenderEnum, { description: '性别' })
  @Column
  gender: GenderEnum;
}

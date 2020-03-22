import { ApiProperty } from '@nestjs/swagger';
import { GenderEnum } from '../../enums/gender.enum';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({
  name: 'test_user',
})
export class UserEntity {
  @ApiProperty({ description: '用户ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: '用户名' })
  @Column()
  username: string;

  @Column()
  password: string;

  @ApiProperty({ enum: GenderEnum, description: '性别' })
  @Column({
    type: 'enum',
    enum: GenderEnum,
    default: GenderEnum.MALE
  })
  gender: GenderEnum;

  @ApiProperty()
  @Column({ type: 'datetime' })
  created_at: Date;

  @ApiProperty()
  @Column({ type: 'datetime' })
  updated_at: Date;

  @ApiProperty()
  @Column({ type: 'datetime' })
  deleted_at: Date;
}

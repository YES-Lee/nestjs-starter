# 数据库模型

`src/database/entities`目录存放`typeorm`实体类，一个类对应一个数据表。

## 创建实体

1. 创建一个类。并添加与数据库一致的字段；
2. 添加类装饰器。类装饰器`@Entity({ name: 'test_user' })`，`name`选项缺省值为类名，如果类名和表名不一致，必须设定`name`变量。
3. 添加成员变量装饰器。`@Column`

实例：

```typescript
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
```

## 相关文档

* typeorm [https://typeorm.io](https://typeorm.io)

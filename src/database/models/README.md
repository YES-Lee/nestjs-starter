# 数据库模型

`src/database/models`目录存放数据库对象映射模型（sequelize），一个模型对应一个数据表。模型可以同时用作`graphql`类型，**但是禁止直接用于`RESTFUL`接口返回结果，具体返回内容需要在查询时限制敏感信息**

## 添加模型

1. 创建一个类。并添加与数据库一致的字段；
2. 添加类装饰器。类装饰器`@Table({ tableName: 'user' })`，`tableName`选项缺省值为类名，如果类名和表名不一致，必须设定`tableName`变量。
3. 添加成员变量装饰器。`@Column`

实例：

```typescript
import { Table, Column, AutoIncrement, PrimaryKey, Model } from 'sequelize-typescript';
import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType({ // type-graphql类型
  description: '用户'
})
@Table({ // sequelize模型
  tableName: 'user'
})
export class User extends Model<User> {

  @Field(type => Int) // type-graphql类型
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Field({ description: '用户名' })
  @Column
  username: string;

  @Field({ description: '用户昵称' })
  @Column
  nickname: string;

  @Field({ description: '用户真实姓名' })
  @Column
  real_name: string;
}
```

## 相关文档

* sequelize-typescript [https://github.com/RobinBuschmann/sequelize-typescript](https://github.com/RobinBuschmann/sequelize-typescript)
* type-graphql [https://typegraphql.ml/](https://typegraphql.ml/)

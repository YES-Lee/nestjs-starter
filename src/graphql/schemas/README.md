# GraphQl 接口类型

`src/graphql/schemas`目录定义`graphql`接口类型

## support

该目录下定义了全局统一的数据格式，如分页接口等，业务接口必须严格继承/实现support中定义的抽象类

## 命名规则

文件命名格式统一为`{业务名称}.{类型名称}.ts`

### 请求参数

请求参数分为两种类型，一种为`args`，另一种为`input`，区别在于两种方式在请求的时候传输的参数不同，`args`类型里的字段会展开为`resolver`方法的参数列表，而`input`类型定义的是`resolver`中的一个参数，如下面的列子：（[文档（https://typegraphql.ml/docs/faq.html#is-inputtype-different-from-argstype）](https://typegraphql.ml/docs/faq.html#is-inputtype-different-from-argstype)）

* `args`类型

  ```typescript
  @ArgsType()
  class UserListArgs {
    @Field(type => Int)
    page: number;
    @Field(type => Int)
    pageSize: number;
  }

  @Query()
  userList(@Args() args: UserListArgs) {}

  // 实际请求时传输的参数是

  {
    page: 1,
    pageSize: 10
  }

  ```

* `input`类型

  ```typescript
  @ArgsType()
    class UserListArgs {
      @Field(type => Int)
      page: number;
      @Field(type => Int)
      pageSize: number;
    }

    @Query()
    userList(@Args('userListArgs') args: UserListArgs) {}

    // 实际请求时传输的参数是

    {
      userListArgs: {
        page: 1,
        pageSize: 10
      }
    }

  ```

### 响应

响应类型统一为`ObjectType`，`support`中定义了分页接口统一返回格式`IPageResult`，由于`graphql`不具有泛型，因此在实现`IPageResult`时，必须显示指定`rows`的类型，如：

```typescript
@ObjectType({
  implements: IPageResult,
  description: '用户列表'
})
export class UserListResult implements IPageResult<User> {
  count: number;
  @Field(type => [User])
  rows: User[];
}
```

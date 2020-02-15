# Nest快速开发框架

集成了如下技术：

* ORM：sequelize
* 接口：graphql
* 认证：passport
* 文档：swagger
* 日志工具：nest-pino

**开发之前请详细阅读项目中的所有文档（各个目录下的`README.md`）文件，以及熟悉[相关技术](#相关技术)中提到的所有技术。**

## 开发

```bash

git clone https://github.com/YES-Lee/nest-seed-proj.git # 拉取代码
cd nest-seed-proj
yarn install
yarn start:dev

```

swagger地址：`http://localhost:3000/swagger`
graphql plaground地址：`http://localhost:3000/graphql`

## 项目结构

``` text
src
├─ config // 配置模块
├─ database // 数据库模块
│  └─ models // 存放sequelize/graphql数据库模型
├─ decorators // 自定义装饰器目录
├─ dto // restful 接口模型目录
├─ graphql // graphql 模块
├─ enums // 枚举目录
├─ filters // error filters
├─ interceptors // interceptors
├─ pipes // pipes
└─ modules // 业务逻辑模块目录，所有业务相关逻辑都放到该目录对应的模块
```

所有业务相关的逻辑都应存放于`modules`目录下，接口按照功能模块划分，通常以表为参考，即一张表（除关系表外）对应一个功能模块。例如：用户相关的功能，应该全部位于`/modules/user/`目录下。

## 接口规范(restful api)

### 接口返回格式

接口返回格式统一为

```typescript
{
  error_code: number; // 错误码，只有异常时才会返回
  error_message: string; // 错误信息，只有异常时才会返回
  data: any;
  timestamp: any; // 时间戳
}
```

### 相关工具

在`src/dto/support/ApiResponse.ts`导出的类包含了API请求结果相关的工厂方法，比如

```typescript
// 请求成功
const result = ApiResponse.success(data)

// 请求失败
const result = ApiResponse.error(10001, '请求失败')
```

## 接口规范(graphql)

`graphql`类型定义为自动化生成（`schema.gql`），可以复用`database/models`下的数据库模型，**graphql定义的是http接口层对象，不应该返回的（如：password）等敏感字段，不建议定义grqphql类型**

## 部署

部署app方式有多种，这里提供一个`pm2`管理方式，有三种部署方式，根据不同场景选择使用

### 编译部署

1. 编译：`npm run build`
2. 拷贝`package.json`, `pm2.config.js`到`dist`目录（需要修改`pm2.config.js文件`）
3. `dist`目录上传到服务器
4. 到`dist`目录执行`npm install --production`
5. 启动：`pm2 pm2.config.js`

### 仓库部署

1. 在服务器拉取仓库
2. `npm install`
3. `npm run build`,
4. `pm2 pm2.config.js`

### docker部署

## 相关指令

### 创建模块

`nest g module modules/{your_module_name}`

### 创建服务

`nest g service modules/{your_service_name}`

### 创建控制器

`nest g controller modules/{your_controller_name}`

### 创建resolver

`nest g resolver modules/{your_resolver_name}`

## 相关技术

* 基础1 [nodejs] [https://nodejs.org/en/docs/](https://nodejs.org/en/docs/)
* 基础2 [typescript] [https://www.tslang.cn/docs/home.html](https://www.tslang.cn/docs/home.html)
* 项目框架 [nestjs] [https://docs.nestjs.com/](https://docs.nestjs.com/)
* 框架平台 [express] [https://expressjs.com/](https://expressjs.com/)
* 数据库ORM框架 [sequelize] [https://sequelize.org/v5/](https://sequelize.org/v5/)
* sequelize扩展 [sequelize-typescript] [https://github.com/RobinBuschmann/sequelize-typescript](https://sequelize.org/v5/)
* 登录认证 [Passport.js] [http://www.passportjs.org/](http://www.passportjs.org/)
* 数据接口 [GraphQl] [https://graphql.cn/](https://graphql.cn/)
* GraphQl扩展 [type-graphql] [https://typegraphql.ml/](https://typegraphql.ml/)
* 文档 [swagger-ui-express] [https://www.npmjs.com/package/swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express)
* WebSocket [socket.io] [https://socket.io](https://socket.io)

# 业务模块

通常情况下，将业务按照功能、类型等模块化，所有业务模块（特性模块）都在此目录下。严格遵守规范。

一个特性模块通常包括如下几个主要文件：

* `xxx.module.ts`：模块入口
* `xxx.controller.ts`: 模块控制器，Restful API使用
* `xxx.service.ts`: 模块服务，封装可复用逻辑、数据库操作等
* `xxx.providers.ts`：自定义提供商，提供可注入的依赖
* `xxx.resolver.ts`：GraqhQl的resolver

## 常用命令

### 创建业务模块

```bash
nest g module modules/{模块名}
```

### 创建控制器/服务/resolver

```bash
nest g (controller | service | resolver) modules/{模块名}
```

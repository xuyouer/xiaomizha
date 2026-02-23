# 小咪楂 (xiaomizha)

小咪楂 (xiaomizha) 是一个基于 Vite + TypeScript + Vue 3 + Ant Design Vue 构建的现代化后台管理系统前端。该系统与后端微服务架构（基于 Spring Cloud）无缝对接，提供完整的用户管理、权限控制、资源管理等功能。

## 技术栈

- ⚡️ [Vite](https://vite.dev/) - 构建工具
- 🎯 [Vue 3](https://vuejs.org/) + [Pinia](https://pinia.vuejs.org/) - 响应式框架与状态管理
- 📘 [TypeScript](https://www.typescriptlang.org/) - 类型安全
- 🎨 [Ant Design Vue](https://antdv.com/) - 企业级 UI 组件库
- 🚀 [Vue Router](https://router.vuejs.org/) - 路由管理
- 🔄 [Axios](https://axios-http.com/) - HTTP 客户端
- 🌍 [Vue I18n](https://vue-i18n.intlify.dev/) - 国际化支持
- 🎭 [Sass](https://sass-lang.com/) - CSS 预处理器

## 项目结构

```
xiaomizha/
├── public/             # 静态资源
├── src/
│   ├── api/           # API 接口定义
│   ├── assets/        # 静态资源
│   ├── components/    # 公共组件
│   ├── locales/       # 国际化配置
│   ├── plugins/       # 插件
│   ├── router/        # 路由配置与守卫
│   │   ├── modules/   # 路由模块
│   │   └── index.ts   # 路由入口
│   ├── stores/        # Pinia 状态管理
│   ├── styles/        # 样式文件
│   │   ├── components/ # 组件样式
│   │   ├── mixins/     # 样式混合
│   │   ├── views/      # 页面样式
│   │   └── index.scss  # 样式入口
│   ├── types/         # TypeScript 类型定义
│   ├── utils/         # 工具函数
│   ├── views/         # 页面组件
│   │   ├── admin/      # 后台管理页面
│   │   ├── user/       # 用户相关页面
│   │   └── Home.vue    # 首页
│   ├── App.vue        # 根组件
│   ├── main.ts        # 入口文件
│   └── style.css      # 全局样式
├── index.html         # HTML 模板
├── package.json       # 项目依赖
├── tsconfig.json      # TypeScript 配置
├── vite.config.ts     # Vite 配置
└── xiaomizha.sql      # 数据库初始化脚本
```

## 快速开始

### 环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0 或 pnpm >= 8.0.0

### 安装依赖

使用 npm：

```bash
npm install
```

或使用 pnpm：

```bash
pnpm install
```

### 启动开发服务器

```bash
npm run dev
# 或
pnpm dev
```

开发服务器：`http://localhost:3000`

### 构建生产版本

```bash
npm run build
# 或
pnpm run build
```

构建产物将生成在 `dist` 目录。

### 预览生产构建

```bash
npm run preview
# 或
pnpm run preview
```

## 功能特性

### 核心功能

- **用户认证**：登录 / 登出、JWT 认证、401 自动跳转登录
- **仪表盘**：系统概览、关键指标展示
- **用户管理**：用户列表、详情查看、创建、编辑、删除
- **角色管理**：角色列表、权限配置、创建、编辑、删除
- **资源管理**：资源列表、分类管理、创建、编辑、删除
- **用户名管理**：用户名信息管理、用户名历史记录
- **系统配置**：系统参数配置、VIP 等级配置
- **用户反馈**：反馈列表、处理状态管理
- **个人中心**：个人信息查看与修改

### 技术特性

- **路由守卫**：基于 Token 的权限控制
- **状态管理**：Pinia 全局状态管理
- **请求封装**：Axios 拦截器，统一处理请求与响应
- **国际化**：多语言支持
- **类型安全**：TypeScript 类型定义
- **路径别名**：`@/` 对应 `src/` 目录
- **响应式设计**：适配不同屏幕尺寸

## 环境变量

| 变量                  | 说明             | 默认值                    |
|---------------------|----------------|------------------------|
| `VITE_API_BASE_URL` | 生产环境后端 API 基础地址 | `http://localhost:8092` |
| `VITE_APP_TITLE`    | 应用标题           | `小咪楂后台管理系统`            |
| `VITE_APP_VERSION`  | 应用版本           | `1.0.0`                |

### 配置文件

- 开发环境：`.env.development`
- 生产环境：`.env.production`

示例 `.env.production`：

```env
VITE_API_BASE_URL=http://your-backend-server:8092
VITE_APP_TITLE=小咪楂后台管理系统
VITE_APP_VERSION=1.0.0
```

## 开发指南

### 代码规范

- **组件命名**：大驼峰命名法，如 `UserManagement.vue`
- **变量命名**：小驼峰命名法，如 `userService`
- **常量命名**：全大写，下划线分隔，如 `API_BASE_URL`
- **函数命名**：小驼峰命名法，如 `getUserList`
- **类型命名**：大驼峰命名法，如 `UserInfo`

### 新增页面

1. 在 `src/views/` 目录下创建页面组件
2. 在 `src/router/modules/` 目录下注册路由
3. 在 `src/styles/views/` 目录下添加样式文件

### 新增 API 接口

1. 在 `src/api/` 目录下创建接口模块
2. 在 `src/types/api.ts` 中定义接口类型
3. 使用 `@/utils/request` 封装请求

### 国际化

1. 在 `src/locales/lang/` 目录下添加语言文件
2. 在组件中使用 `i18n.global.t('key')` 进行国际化

## 部署说明

### 前端部署

1. 构建生产版本：
   ```bash
   npm run build
   ```

2. 将 `dist` 目录下的文件部署到 Web 服务器，如 Nginx、Apache 等。

3. Nginx 配置示例：
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       location / {
           root /path/to/dist;
           index index.html;
           try_files $uri $uri/ /index.html;
       }
       
       location /api/ {
           proxy_pass http://your-backend-server:8092/;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
       }
   }
   ```

### 后端依赖

前端需要对接以下后端服务：

- **xuyou-user**：用户服务，默认端口 8092
- **xuyou-gateway**：网关服务，可选
- **xuyou-eureka**：服务注册中心，可选

## 浏览器兼容性

- Chrome (最新版本)
- Firefox (最新版本)
- Safari (最新版本)
- Edge (最新版本)

## 许可证

[MIT](LICENSE)

## 贡献

欢迎提交 Issue 和 Pull Request 来改进这个项目。

## 联系方式

- 项目维护者：[xuyouer](https://github.com/xuyouer) & [zzx-super](https://github.com/zzx-super)
- 项目地址：[https://github.com/xuyouer/xiaomizha](https://github.com/xuyouer/xiaomizha)
- 问题反馈：[https://github.com/xuyouer/xiaomizha/issues](https://github.com/xuyouer/xiaomizha/issues)

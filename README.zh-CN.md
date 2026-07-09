# selflearning-pages

基于 [Astro](https://astro.build) + [Starlight](https://starlight.astro.build) 构建的多语言自学文档站点。

**站点地址：** [https://selflearning-pages.pages.dev/](https://selflearning-pages.pages.dev/)

## 技术栈

- **Astro** `^7.0.2`
- **@astrojs/starlight** `^0.41.3`
- **sharp** `^0.35.3`

## 命令

| 命令 | 作用 |
|---|---|
| `npm install` | 安装依赖 |
| `npm run dev` | 启动开发服务器（`localhost:4321`） |
| `npm run build` | 构建到 `dist/` |
| `npm run preview` | 预览构建产物 |

## 项目结构

```
src/content/docs/
├── en/       # 英文
└── zh-cn/    # 简体中文
```

## 国际化

语言目录使用**小写**（如 `zh-cn`），BCP-47 标签在配置中通过 `lang` 设置。

新增语言：创建 `src/content/docs/<locale>/` 并在 `astro.config.mjs` 的 `locales` 中注册。

## 贡献指南

欢迎贡献

1. Fork 并克隆仓库。
2. `git checkout -b feat/your-feature`。
3. 在 `src/content/docs/<locale>/` 下添加或修改页面。
4. 新目录需在 `astro.config.mjs` 的 `sidebar` 中注册。
5. 用 `npm run build` 验证。
6. 发起 Pull Request。

## MDX 语法

### 前置元数据

```mdx
---
title: 我的页面
description: 简短描述。
---
```

可选字段：`template: splash`、`hero`、`sidebar`、`pagefind: false`。

### Starlight 组件

```mdx
import { Card, CardGrid } from '@astrojs/starlight/components';

<CardGrid stagger>
  <Card title="标题" icon="pencil">内容</Card>
</CardGrid>
```

### 其他

- 代码块：`` ```语言 ``。
- 链接：`[文本](/zh-cn/page/)`。
- 图片：相对于文件路径引用。
- 表格：标准 Markdown 语法。
- `.mdx` 支持 JSX；`.md` 不支持。
- `sidebar.slug` 是相对于 `src/content/docs/` 的路径（不含扩展名）。

## 许可证

[CC0 1.0 通用](LICENSE) — 公共领域。

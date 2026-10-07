# Yiming Zhou Portfolio

使用 React + Vite 构建的响应式工业设计师作品集。

## 开发

```sh
npm ci
npm run dev -- --port 5173
```

## 生产构建

```sh
npm run build
npm run preview -- --port 4173
```

构建结果在 `dist/`，可部署到支持静态网站的服务。无需后台服务或密钥。

## 内容维护

- `src/main.jsx`：四个板块、Product 作品数据、弹窗及导航。
- `src/style.css`：桌面和手机布局、视觉样式。
- `public/product-board.png`：根据用户参考图生成的演示背景，并非原图。
- 当前作品名称、年份与简介为演示内容，应替换为真实项目资料。UI | UX 和 Other 为待补充板块；About Me 使用可编辑的介绍文案。
- 字体通过 Google Fonts 加载，无法访问时使用本机字体。

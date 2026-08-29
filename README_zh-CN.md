# 幄特斯普工作室企业门户

幄特斯普工作室（Waterspo Studio）的中英双语企业门户，基于 Next.js 16、React、TypeScript 与 Tailwind CSS 构建。

## 功能

- 英文页面使用 `/` 根路径，中文页面使用 `/zh`；对不执行代理的托管平台提供预渲染兜底
- 每个文档都带有正确的 `lang` 属性，包括重定向兜底页
- 信号编辑式设计系统：奶白 / 石板灰 / 信号红令牌、语义化 CSS 变量与本地子集化字体
- `SignalField` 动效原语：滚动触发的线条绘制、指针视差，并在降低动效偏好下保持静态
- 产品页使用 AVIF / WebP / JPEG 响应式截图
- 支持亮色、深色与跟随系统主题
- 可复用的编辑式 UI 与站点组件
- 服务、关于、联系与技术实验室页面
- 可运行的 SSR、ISR、SSG、Streaming、Node Function 与 Edge Function 实验

## 本地开发

```bash
pnpm install
pnpm dev
```

访问 <http://localhost:3000>。

## 验证

```bash
pnpm lint          # biome check
pnpm test          # 基于 node --test 覆盖 src/lib
pnpm build
```

面向已启动的开发或生产服务器：

```bash
pnpm smoke http://127.0.0.1:3000     # 路由、语言与元数据契约
```

真实浏览器检查（需要 `CHROME_PATH`，例如 Playwright 管理的 Chromium）：

```bash
CHROME_PATH=$HOME/.cache/ms-playwright/chromium-*/chrome-linux64/chrome \
  node scripts/qa-browser.mjs http://127.0.0.1:3000
```

设置 `QA_SKIP_SHOTS=1` 可跳过整页截图，仅运行交互检查。

## 字体与媒体

字体与产品截图均由仓库内的源文件构建，不会在请求时安装。

```bash
node scripts/subset-fonts.mjs        # -> public/fonts
node scripts/capture-product-screens.mjs   # 重新抓取线上产品站点
node scripts/build-product-media.mjs # -> public/product-media
```

`scripts/subset-fonts.mjs` 依赖 `pyftsubset`：

```bash
uv tool install --index https://pypi.org/simple "fonttools[woff]"
```

内置字体的许可声明见 `public/fonts/LICENSES.txt`，截图的来源说明见 `public/product-media/README.md`。

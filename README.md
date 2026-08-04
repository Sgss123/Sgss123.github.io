# mfjip612-github-io

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
bun install
```

### Compile and Hot-Reload for Development

```sh
bun run dev
```

### Type-Check, Compile and Minify for Production

```sh
bun run build
```

## Deployment

部署平台为 Tencent EdgeOne Makers。

EdgeOne Makers 通过 Git 集成自动拉取仓库并构建部署，无需手动执行 CLI 命令。将仓库连接到 EdgeOne Makers 项目后，推送到 `main` 分支即可自动触发构建与发布。

本地调试边缘函数（可选）：

```sh
bun run dev:edgeone   # 通过 edgeone CLI 本地调试 edge-functions
```

配置文件：`edgeone.json`（构建配置）、`edge-functions/`（边缘函数）、`.env.edgeone.example`（环境变量参考）

首次使用：

1. 在 EdgeOne Makers 控制台选择「Import Git Repository」并授权仓库
2. 配置构建命令（`bun run build`）与输出目录（`dist/client`），或由 `edgeone.json` 自动识别
3. 在控制台「Environment Variables」中配置所需环境变量（参考 `.env.edgeone.example`）
4. 推送到 `main` 分支即自动部署


# 北漂浮生

`Phaser + Electron` 的单机生存经营游戏，同时支持导出 GitHub Pages 静态网页版。

## 本地运行

```bash
npm install
npm start
```

## 构建桌面版

```bash
npm run pack
```

桌面版输出目录：

- `outputs/build/mac-arm64/北漂浮生.app`
- `outputs/build/北漂浮生-1.0.0-arm64-mac.zip`

## 构建 GitHub Pages 版本

```bash
npm run web:build
```

生成目录：

- `docs/`

GitHub Pages 发布方式：

1. 新建一个 GitHub 仓库。
2. 把当前项目推上去。
3. 在仓库 `Settings -> Pages` 里选择：
   - `Deploy from a branch`
   - Branch 选 `main`
   - Folder 选 `/docs`
4. 保存后等待 GitHub Pages 发布。

发布后地址通常是：

```text
https://<你的 GitHub 用户名>.github.io/<仓库名>/
```

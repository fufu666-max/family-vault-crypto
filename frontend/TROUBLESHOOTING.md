# 故障排除指南

## 编译卡住问题

如果页面一直显示 "Compiling / ..." 无法加载：

### 快速修复

1. **停止服务器** (Ctrl+C)
2. **清除缓存**:
   ```bash
   cd D:\Cursor-Ku\demo22\pro22\frontend
   rm -rf .next
   ```
3. **使用 Webpack 而不是 Turbopack**:
   ```bash
   npm run dev:webpack
   ```

### 详细步骤

#### 方法 1: 使用 Webpack (推荐)
```bash
cd D:\Cursor-Ku\demo22\pro22\frontend
npm run dev:webpack
```

#### 方法 2: 完全重建
```bash
cd D:\Cursor-Ku\demo22\pro22\frontend
rm -rf .next node_modules
npm install
npm run dev
```

#### 方法 3: 检查端口占用
```bash
# 检查端口 3000 是否被占用
netstat -ano | findstr :3000
# 如果被占用，终止进程或使用其他端口
```

#### 方法 4: 检查浏览器
- 打开开发者工具 (F12)
- 查看 Console 标签页的错误
- 查看 Network 标签页的请求状态

## 常见错误

### 1. "Cannot read properties of undefined"
- **原因**: FHEVM SDK 未正确加载
- **解决**: 等待几秒钟让 SDK 加载，或检查网络连接

### 2. "Hydration failed"
- **原因**: 服务器和客户端渲染不匹配
- **解决**: 已修复，清除缓存并刷新页面

### 3. 编译一直卡住
- **原因**: Turbopack 处理大型文件时的问题
- **解决**: 使用 `npm run dev:webpack` 而不是 `npm run dev`

## 性能优化

如果编译很慢：
1. 使用 Webpack 模式 (`dev:webpack`)
2. 减少初始加载的组件
3. 使用动态导入延迟加载 FHEVM SDK

## 联系支持

如果以上方法都不行，请提供：
1. 终端完整错误信息
2. 浏览器控制台错误
3. Next.js 版本
4. Node.js 版本


# FHEVM SDK 导入问题修复

## 问题
`@zama-fhe/relayer-sdk/bundle` 在 Next.js/Turbopack 中无法正确导入，报错 "Cannot read properties of undefined (reading 'initSDK')"。

## 解决方案

已更新 `useFhevm.tsx` 使用动态导入，并添加了回退机制：

1. **动态导入**: 使用 `await import()` 而不是静态导入，避免 SSR 问题
2. **回退机制**: 先尝试 `/bundle`，失败则回退到 `/web`
3. **错误处理**: 添加了详细的错误信息以便调试

## 修改的文件

- `frontend/fhevm/useFhevm.tsx` - 使用动态导入
- `frontend/next.config.ts` - 调整 COEP 设置

## 如果问题仍然存在

如果动态导入仍然失败，可以尝试：

1. **清除缓存并重新安装**:
   ```bash
   cd frontend
   rm -rf .next node_modules
   npm install
   ```

2. **使用脚本加载方式**（如模板项目）:
   参考 `fhevm-hardhat-template旧/frontend/fhevm/internal/RelayerSDKLoader.ts`

3. **检查包版本**:
   确保 `@zama-fhe/relayer-sdk` 版本为 `0.2.0`


import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

export default {
  input: "src/index.js", // 指定入口文件
  output: [
    {
      file: "dist/smart-screen-fit.cjs.js", // CommonJS 格式输出
      format: "cjs",
      exports: "named",
    },
    {
      file: "dist/smart-screen-fit.esm.js", // ES Module 格式输出
      format: "esm",
    },
  ],
  plugins: [
    commonjs(),   // 支持 CommonJS 模块
    terser(),     // 压缩代码
  ],
  external: ['vue'], // 将 Vue 标记为外部依赖，避免重复打包
};

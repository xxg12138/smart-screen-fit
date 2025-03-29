# smart-screen-fit

## 🛠 简介

`smart-screen-fit` 是一个轻量级的 Vue Hook 库，专注于动态缩放和响应式布局。   它帮助开发者轻松实现内容在不同尺寸屏幕上的自适应展示，适用于大屏展示、仪表盘设计等场景。

## 📦 安装

使用以下命令安装 `smart-screen-fit`：

```vue
pnpm install smart-screen-fit
或者使用 npm：

bash
npm install smart-screen-fit
```

## 📘 功能

### ⚖️ useScaleWithRatio

**功能简介**：   `useScaleWithRatio` 用于根据窗口大小自动缩放指定的元素，以保持固定的宽高比例。

**使用场景**：   适合需要响应式布局的全屏或部分内容展示场景，例如：

- 📊 多端支持的仪表盘界面
- 🖼 产品详情页面的缩放展示

##### 使用示例

```vue
<template>
  <div ref="scalableElement">
    自适应内容
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useScaleWithRatio } from 'smart-screen-fit';

// 定义 DOM 元素引用
const scalableElement = ref(null);

// 使用 Hook
const { scaleRatio } = useScaleWithRatio(scalableElement, {
  width: 1920, // 设计宽度
  height: 1080, // 设计高度
  debounce: true, // 是否启用防抖
  debounceTime: 100, // 防抖时间（毫秒）
  minScale: 0.5, // 最小缩放比例
  maxScale: 2, // 最大缩放比例
});
</script>
```

参数说明

| 参数名       | 类型    | 默认值    | 是否必填 | 描述                      |
| ------------ | ------- | --------- | -------- | ------------------------- |
| targetRef    | Ref     | -         | 是 ✅     | 🔗 需要缩放的 DOM 元素引用 |
| width        | Number  | 1920      | 否 ⚙️     | 🎨 设计宽度                |
| height       | Number  | 1080      | 否 ⚙️     | 🎨 设计高度                |
| debounce     | Boolean | true      | 否 ⚙️     | 💡 是否启用防抖            |
| debounceTime | Number  | 100       | 否 ⚙️     | ⏱️ 防抖时间（单位：毫秒）  |
| minScale     | Number  | undefined | 否 ⚙️     | ⚖️ 最小缩放比例            |
| maxScale     | Number  | undefined | 否 ⚙️     | ⚖️ 最大缩放比例            |

返回值说明

| 返回值     | 类型 | 描述                 |
| ---------- | ---- | -------------------- |
| scaleRatio | Ref  | 🔄 当前计算的缩放比例 |

### 📐 useShortEdgeScale

**功能简介**：   `useShortEdgeScale` 用于短边优先地动态缩放内容，确保容器内内容自适应大小，同时保持比例一致。

**使用场景**：   适合展示内容高度灵活的页面，例如：

- 🖥️ 自适应的全屏大屏设计
- 📱 移动端和小屏幕的自适应内容

##### 使用示例

```vue
<template>
  <div ref="containerRef" :style="containerStyle">
    <!-- 内容区域 -->
    自适应布局内容
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useShortEdgeScale } from 'smart-screen-fit';

// 定义 DOM 元素引用
const containerRef = ref(null);

// 使用 Hook
const { containerStyle, scale } = useShortEdgeScale(containerRef, {
  width: 1920, // 设计宽度
  height: 1080, // 设计高度
  debounce: true, // 是否启用防抖
  debounceTime: 100, // 防抖时间（毫秒）
  minScale: 0.5, // 最小缩放比例
  maxScale: 2, // 最大缩放比例
});
</script>
```

参数说明

| 参数名       | 类型    | 默认值    | 是否必填 | 描述                      |
| ------------ | ------- | --------- | -------- | ------------------------- |
| targetRef    | Ref     | -         | 是 ✅     | 🔗 需要缩放的 DOM 元素引用 |
| width        | Number  | 1920      | 否 ⚙️     | 🎨 设计宽度                |
| height       | Number  | 1080      | 否 ⚙️     | 🎨 设计高度                |
| debounce     | Boolean | true      | 否 ⚙️     | 💡 是否启用防抖            |
| debounceTime | Number  | 100       | 否 ⚙️     | ⏱️ 防抖时间（单位：毫秒）  |
| minScale     | Number  | undefined | 否 ⚙️     | ⚖️ 最小缩放比例            |
| maxScale     | Number  | undefined | 否 ⚙️     | ⚖️ 最大缩放比例            |

返回值说明

| 返回值         | 类型   | 描述                 |
| -------------- | ------ | -------------------- |
| containerStyle | Object | 🎨 动态绑定的样式对象 |
| scale          | Ref    | 🔄 当前计算的缩放比例 |

## ❓ 常见问题（FAQ）

1. `scaleRatio` **或** `scale` **的值为什么没有变化？**   确保传入的 `targetRef` 是正确的 DOM 元素引用，并且目标元素已经挂载到 DOM 中。
2. **如何优化性能？**   如果频繁调整窗口大小，建议启用防抖功能并设置适当的 `debounceTime`。
3. **可以应用在什么场景？**
   - 动态调整大屏展示内容的比例
   - 自适应布局的仪表盘设计

## 🔗 更多资源

- **GitHub 仓库**：[smart-screen-fit](https://github.com/xxg12138/smart-screen-fit.git)

- **联系作者**：1162149834@qq.com


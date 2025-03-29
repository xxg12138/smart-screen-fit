# smart-screen-fit - useScaleWithRatio

`useScaleWithRatio` 是 `smart-screen-fit` 提供的 Vue Hook，用于根据窗口大小自动缩放指定的元素，以保持固定的宽高比例。适合需要响应式布局的全屏或部分内容展示场景。

## 安装

使用以下命令安装 `smart-screen-fit`：

```bash
pnpm add smart-screen-fit
或者使用 npm：

bash
npm install smart-screen-fit

用方法
导入 Hook
javascript
import { useScaleWithRatio } from 'smart-screen-fit';
使用示例
vue
<template>
  <div ref="scalableElement" class="scalable">
    自适应内容
  </div>
</template>

<script>
import { ref } from 'vue';
import { useScaleWithRatio } from 'smart-screen-fit';

export default {
  setup() {
    const scalableElement = ref(null);

    const { scaleRatio } = useScaleWithRatio(scalableElement, {
      width: 1920, // 设计宽度
      height: 1080, // 设计高度
      debounce: true, // 是否启用防抖
      debounceTime: 100, // 防抖时间
      minScale: 0.5, // 最小缩放比例
      maxScale: 2, // 最大缩放比例
    });

    return { scalableElement };
  },
};
</script>
参数说明
|   参数名   |            类型             |    默认值    | 是否必填 |                 描述                 |
| :--------: | :-------------------------: | :----------: | :------: | :----------------------------------: |
| targetRef  |             Ref             |      -       |    是    |     需要缩放的 DOM 元素引用          |
|   width    |           Number            |     1920     |    否    |             设计宽度                |
|   height   |           Number            |     1080     |    否    |             设计高度                |
|  debounce  |          Boolean            |     true     |    否    |         是否启用防抖               |
| debounceTime |         Number           |     100      |    否    |       防抖时间（单位：毫秒）         |
|  minScale  |           Number            | undefined    |    否    |         最小缩放比例               |
|  maxScale  |           Number            | undefined    |    否    |         最大缩放比例               |
返回值说明

|    返回值    | 类型  |             描述              |
| :----------: | :---: | :---------------------------: |
| scaleRatio   |  Ref  |      当前计算的缩放比例       |

---

### **README for `useAutoScale`**

```markdown
# smart-screen-fit - useAutoScale

`useAutoScale` 是 `smart-screen-fit` 提供的 Vue Hook，用于短边优先地动态缩放内容，确保在容器内内容自适应大小，同时保持比例一致。

## 安装

使用以下命令安装 `smart-screen-fit`：

```bash
pnpm add smart-screen-fit
或者使用 npm：

bash
npm install smart-screen-fit
使用方法
导入 Hook
javascript
import { useAutoScale } from 'smart-screen-fit';
使用示例
vue
<template>
  <div ref="containerRef" class="container" :style="containerStyle">
    <!-- 内容区域 -->
    自适应布局内容
  </div>
</template>

<script>
import { ref } from 'vue';
import { useAutoScale } from 'smart-screen-fit';

export default {
  setup() {
    const containerRef = ref(null);

    const { containerStyle, scale } = useAutoScale(containerRef, {
      width: 1920, // 设计宽度
      height: 1080, // 设计高度
      debounce: true, // 是否启用防抖
      debounceTime: 100, // 防抖时间
      minScale: 0.5, // 最小缩放比例
      maxScale: 2, // 最大缩放比例
    });

    return { containerRef, containerStyle };
  },
};
</script>
参数说明
|    参数名    |      类型      |    默认值    | 是否必填 |             描述             |
| :----------: | :------------: | :----------: | :------: | :--------------------------: |
|  targetRef   |      Ref       |      必须    |    是    |     需要缩放的 DOM 元素引用   |
|    width     |     Number     |     1920     |    否    |          设计宽度           |
|    height    |     Number     |     1080     |    否    |          设计高度           |
|   debounce   |    Boolean     |     true     |    否    |        是否启用防抖         |
| debounceTime |     Number     |     100      |    否    |    防抖时间（单位：毫秒）    |
|   minScale   |     Number     |  undefined   |    否    |        最小缩放比例         |
|   maxScale   |     Number     |  undefined   |    否    |        最大缩放比例         |

返回值说明
|     返回值     |     类型      |             描述              |
| :------------: | :-----------: | :--------------------------: |
| containerStyle |     Object    |       动态绑定的样式对象       |
|     scale      |      Ref      |       当前计算的缩放比例       |
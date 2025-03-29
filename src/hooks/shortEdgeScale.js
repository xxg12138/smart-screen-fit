import { ref, computed, onMounted, onUnmounted } from "vue";

/**
 * 📌 短边优先缩放 Hook
 * 
 * 这个 Hook 主要用于根据窗口大小，等比例缩放目标元素，使其适应屏幕尺寸。
 * 它会监听 `resize` 事件，并根据最短边进行缩放，确保内容不会超出设定尺寸。
 *
 * @param {Ref<HTMLElement>} targetRef 目标 DOM 元素的 ref
 * @param {Object} options 配置项
 * @param {number} options.width 设计稿的宽度，默认为 1920
 * @param {number} options.height 设计稿的高度，默认为 1080
 * @param {boolean} options.debounce 是否启用防抖，默认为 true
 * @param {number} options.debounceTime 防抖时间，默认为 100ms
 * @param {number} [options.minScale] 最小缩放比例（可选）
 * @param {number} [options.maxScale] 最大缩放比例（可选）
 * 
 * @returns {Object} { containerStyle, scale }
 * - `containerStyle`: 计算后的样式对象，可用于 `:style` 绑定
 * - `scale`: 当前缩放比例，可用于其他业务逻辑
 */
export function useShortEdgeScale(targetRef, { 
  width = 1920, 
  height = 1080, 
  debounce = true, 
  debounceTime = 100,
  minScale, 
  maxScale 
} = {}) {
  // 记录当前的缩放比例
  const scale = ref(1);
  let debounceTimer = null; // 防抖定时器

  /**
   * 📌 计算容器的样式
   * 由于 `computed` 会依赖 `scale.value`，当 `scale` 变化时，样式会自动更新。
   */
  const containerStyle = computed(() => ({
    transform: `scale(${scale.value})`, // 通过 `scale()` 进行等比缩放
    transformOrigin: "top center", // 以顶部中心为缩放基准
    width: "100vw",  // 让容器宽度占满视口
    height: "100vh", // 让容器高度占满视口
    display: "flex",
    alignItems: "start",  // 顶部对齐，避免内容偏移
    justifyContent: "center", // 水平居中
  }));

  /**
   * 📌 计算新的缩放比例
   * 这个函数会获取目标元素的宽高，并计算出合适的缩放比例。
   */
  const updateScale = () => {
    const el = targetRef.value; // 获取目标元素
    if (!el) {
      if (process.env.NODE_ENV === "development") {
        console.warn("shortEdgeScale【未传入目标元素引用】");
      }
      return;
    }

    // 获取容器的当前尺寸
    const parentWidth = el.offsetWidth || window.innerWidth; // 如果 `targetRef` 没有宽度，则使用 `window.innerWidth`
    const parentHeight = el.offsetHeight || window.innerHeight; // 同理，防止 `offsetHeight` 为空

    // 计算基于宽度和高度的缩放比例
    const scaleWidth = parentWidth / width;
    const scaleHeight = parentHeight / height;

    // 取最小值，确保内容不会超出视口
    let newScale = Math.min(scaleWidth, scaleHeight);

    // 应用 `minScale` 和 `maxScale` 限制
    if (minScale !== undefined) newScale = Math.max(newScale, minScale);
    if (maxScale !== undefined) newScale = Math.min(newScale, maxScale);

    // 只有当缩放比例变化时才更新 `scale.value`，避免不必要的 `computed` 触发
    if (scale.value !== newScale) {
      scale.value = newScale;
    }
  };

  /**
   * 📌 处理 `resize` 事件
   * - 如果启用了防抖（`debounce = true`），则使用 `setTimeout` 延迟执行 `updateScale`
   * - 如果防抖时间 `debounceTime <= 0`，则直接执行 `updateScale`
   */
  const handleResize = () => {
    if (!debounce || debounceTime <= 0) {
      updateScale(); // 直接执行
      return;
    }
    clearTimeout(debounceTimer); // 清除上一次的 `setTimeout`
    debounceTimer = setTimeout(updateScale, debounceTime); // 设置新的 `setTimeout`
  };

  /**
   * 📌 组件挂载时，初始化缩放，并监听 `resize` 事件
   */
  onMounted(() => {
    updateScale(); // 初始化时计算一次缩放比例
    window.addEventListener("resize", handleResize); // 监听窗口变化
  });

  /**
   * 📌 组件卸载时，清理事件监听和防抖定时器
   */
  onUnmounted(() => {
    window.removeEventListener("resize", handleResize); // 解绑 `resize` 事件
    clearTimeout(debounceTimer); // 清除 `setTimeout`
  });

  // 返回 `containerStyle`，用于绑定到 `:style`，同时返回 `scale`
  return { containerStyle, scale };
}

import { ref, onMounted, onUnmounted } from "vue";

/**
 * 📌 useScaleWithRatio
 *
 * 该 Hook 根据窗口大小等比例缩放目标元素，确保其适应屏幕尺寸。
 * 它监听 `resize` 事件，并基于 `width` 和 `height` 计算适当的缩放比例。
 *
 * @param {Ref<HTMLElement>} targetRef - 目标 DOM 元素的 ref
 * @param {Object} options - 配置项
 * @param {number} options.width - 设计稿的宽度，默认为 1920
 * @param {number} options.height - 设计稿的高度，默认为 1080
 * @param {boolean} options.debounce - 是否启用防抖，默认为 true
 * @param {number} options.debounceTime - 防抖时间，默认为 100ms
 * @param {number} [options.minScale] - 最小缩放比例（可选）
 * @param {number} [options.maxScale] - 最大缩放比例（可选）
 * 
 * @returns {Object} { scaleRatio }
 * - `scaleRatio`: 当前的缩放比例，可用于其他业务逻辑
 */
export function useScaleWithRatio(
  targetRef,
  { 
    width = 1920, 
    height = 1080, 
    debounce = true, 
    debounceTime = 100, 
    minScale, 
    maxScale 
  } = {}
) {
  const scaleRatio = ref(1); // 记录当前缩放比例
  let resizeTimeout; // 用于防抖的定时器

  /**
   * 📌 计算当前屏幕的缩放比例
   *
   * 该函数根据 `window.innerWidth` 和 `window.innerHeight` 计算出适当的缩放比例，
   * 以确保目标元素按照最短边等比缩放。
   *
   * @returns {number} 计算后的缩放比例
   */
  const getScaleRatio = () => {
    const scaleWidth = window.innerWidth / width;
    const scaleHeight = window.innerHeight / height;
    let finalScale = Math.min(scaleWidth, scaleHeight); // 取最小值，确保内容不会超出视口

    // 应用 `minScale` 和 `maxScale` 约束
    if (minScale !== undefined) finalScale = Math.max(finalScale, minScale);
    if (maxScale !== undefined) finalScale = Math.min(finalScale, maxScale);

    return finalScale;
  };

  /**
   * 📌 应用缩放样式到目标元素
   *
   * @param {HTMLElement} element - 需要缩放的目标元素
   * @param {number} scale - 计算出的缩放比例
   */
  const applyStyles = (element, scale) => {
    Object.assign(element.style, {
      transform: `scale(${scale})`, // 设置缩放比例
      transformOrigin: "center top", // 以中心顶部为缩放基准
      display: "flex",
      alignItems: "center", // 垂直居中
      justifyContent: "center", // 水平居中
    });
  };

  /**
   * 📌 计算并更新缩放比例
   *
   * 该函数会检查 `targetRef` 是否存在，并计算新的 `scaleRatio`。
   * 只有当比例发生变化时才会更新，避免不必要的 DOM 操作。
   */
  const computeScale = () => {
    const el = targetRef.value;
    if (!el) {
      if (process.env.NODE_ENV === "development") {
        console.warn("useScaleWithRatio【未传入目标元素引用】");
      }
      return;
    }
    const newScale = getScaleRatio();
    if (scaleRatio.value !== newScale) { // 只有比例变化时才更新
      scaleRatio.value = newScale;
      applyStyles(el, newScale);
    }
  };

  /**
   * 📌 处理 `resize` 事件
   *
   * 如果 `debounce` 启用，则使用 `setTimeout` 延迟执行 `computeScale`
   */
  const handleResize = () => {
    if (!debounce || debounceTime <= 0) {
      computeScale(); // 立即执行
      return;
    }
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(computeScale, debounceTime);
  };

  /**
   * 📌 组件挂载时，初始化缩放，并监听 `resize` 事件
   */
  onMounted(() => {
    computeScale(); // 初始化时计算缩放比例
    window.addEventListener("resize", handleResize); // 监听窗口大小变化
  });

  /**
   * 📌 组件卸载时，清理 `resize` 监听事件和定时器
   */
  onUnmounted(() => {
    window.removeEventListener("resize", handleResize);
    clearTimeout(resizeTimeout);
  });

  return { scaleRatio }; // 返回 `scaleRatio` 以便在组件中使用
}
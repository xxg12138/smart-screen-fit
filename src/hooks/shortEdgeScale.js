import { ref, computed, onMounted, onUnmounted } from "vue";

// 短边优先缩放
export function useShortEdgeScale(targetRef, { 
  width = 1920, 
  height = 1080, 
  debounce = true, 
  debounceTime = 100,
  minScale, 
  maxScale 
} = {}) {
  const scale = ref(1);
  let debounceTimer = null; 

  const containerStyle = computed(() => ({
    transform: `scale(${scale.value})`,
    transformOrigin: "top center",
    width: "100vw",
    height: "100vh",
    display: "flex",
    alignItems: "start",
    justifyContent: "center",
  }));

  const updateScale = () => {
    if (!targetRef.value) {
      if (process.env.NODE_ENV === "development") {
        console.warn("shortEdgeScale【未传入目标元素引用】");
      }
      return;
    }

    const parentWidth = targetRef.value.offsetWidth; // 使用目标元素宽度
    const parentHeight = targetRef.value.offsetHeight; // 使用目标元素高度

    const scaleWidth = parentWidth / width;
    const scaleHeight = parentHeight / height;

    let newScale = Math.min(scaleWidth, scaleHeight);

    // 应用最小和最大缩放限制
    if (minScale !== undefined) {
      newScale = Math.max(newScale, minScale);
    }
    if (maxScale !== undefined) {
      newScale = Math.min(newScale, maxScale);
    }

    if (debounce) {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        scale.value = newScale;
      }, debounceTime);
    } else {
      scale.value = newScale;
    }
  };

  onMounted(() => {
    updateScale();
    window.addEventListener("resize", updateScale); // 响应窗口大小变化
  });

  onUnmounted(() => {
    window.removeEventListener("resize", updateScale);
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
  });
  

  return { containerStyle, scale }; // 返回 scale，供外部进一步使用
}

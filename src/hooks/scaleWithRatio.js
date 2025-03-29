import { ref, onMounted, onUnmounted } from "vue";

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
  const scaleRatio = ref(1);
  let resizeTimeout = null;

  const getScaleRatio = () => {
    const currentWidth = window.innerWidth;
    const currentHeight = window.innerHeight;
    const scaleWidth = currentWidth / width;
    const scaleHeight = currentHeight / height;
    let finalScale = Math.min(scaleWidth, scaleHeight);

    if (minScale !== undefined) finalScale = Math.max(finalScale, minScale);
    if (maxScale !== undefined) finalScale = Math.min(finalScale, maxScale);

    return finalScale;
  };

  const applyStyles = (element, scale) => {
    Object.assign(element.style, {
      transform: `scale(${scale})`,
      transformOrigin: "center top",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    });
  };

  const computeScale = () => {
    if (!targetRef.value) {
      if (process.env.NODE_ENV === "development") {
        console.warn("useScaleWithRatio【未传入目标元素引用】");
      }
      return;
    }
    const finalScale = getScaleRatio();
    scaleRatio.value = finalScale;
    applyStyles(targetRef.value, finalScale);
  };

  const handleResize = () => {
    if (debounce) {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(computeScale, debounceTime);
    } else {
      computeScale();
    }
  };

  onMounted(() => {
    computeScale();
    window.addEventListener("resize", handleResize);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", handleResize);
    if (resizeTimeout) clearTimeout(resizeTimeout);
  });

  return { scaleRatio };
}

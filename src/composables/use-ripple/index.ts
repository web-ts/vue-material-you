function calculateSize(width: number, height: number) {
  return width !== height ? Math.min(width, height) : width;
}

function calculateScale(size: number, width: number, height: number, x: number, y: number) {
  const halfWidth = width / 2;
  const halfHeight = height / 2;

  const w = x > halfWidth ? (x - halfWidth) * 2 + width : (halfWidth - x) * 2 + width;
  const h = y > halfHeight ? (y - halfHeight) * 2 + height : (halfHeight - y) * 2 + height;

  const max = Math.max(w, h);

  return max / size;
}

export default function () {
  // Timeouts used for the ripple animation.
  let animationTimeout: NodeJS.Timeout;
  let opacityTimeout: NodeJS.Timeout;
  /**
   * Reactive ripple state
   */
  const ripple = reactive({
    x: 0,
    y: 0,
    size: 40,
    opacity: 0,
    scale: 1,
    transition: "transform"
  });

  /**
   * Ripple style object to be injected onto the ripple parent
   */
  const rippleStyleObject = computed(() => ({
    "--ripple-pos-x": `${ripple.x}px`,
    "--ripple-pos-y": `${ripple.y}px`,
    "--ripple-width": `${ripple.size}px`,
    "--ripple-height": `${ripple.size}px`,
    "--ripple-opacity": `${ripple.opacity}`,
    "--ripple-scale": `${ripple.scale}`,
    "--transition-property": `${ripple.transition}`
  }));

  /**
   * Start time of the last ripple animation.
   */
  let start: Date;

  function onPointerdown(event: MouseEvent | TouchEvent) {
    // The target element of the event
    const target = event.target as HTMLElement | null;

    if (!target) return;

    clearTimeout(opacityTimeout);
    clearTimeout(animationTimeout);

    // Mouse or touch event.
    const { clientX, clientY } = event instanceof MouseEvent ? event : event.touches[0];
    const { left, top, width, height } = target.getBoundingClientRect();

    // Calculate the ripple size based  on the lowest value between the width and height
    ripple.size = calculateSize(width, height);
    ripple.transition = "transform";
    ripple.x = clientX - left;
    ripple.y = clientY - top;
    ripple.opacity = 0.2;

    ripple.scale = calculateScale(ripple.size, width, height, ripple.x, ripple.y);

    start = new Date();
  }

  function onPointerup(event: MouseEvent | TouchEvent) {
    // The target element of the event
    const target = event.target as HTMLElement | null;

    if (!target) return;
    const { width, height } = target.getBoundingClientRect();
    const end = new Date();
    const elapsed = Math.max(end.getMilliseconds() - start.getMilliseconds(), 0);

    const timeLeft = 200 - elapsed;

    animationTimeout = setTimeout(() => {
      ripple.transition = "opacity";
      ripple.opacity = 0;
      opacityTimeout = setTimeout(() => {
        ripple.scale = 1;
        ripple.size = calculateSize(width, height);
        ripple.x = 0;
        ripple.y = 0;
      }, 200);
    }, timeLeft);
  }

  const events = {
    onMousedown: onPointerdown,
    onTouchdown: onPointerdown,
    onMouseup: onPointerup,
    onTouchup: onPointerup
  };

  return { rippleStyleObject, events };
}

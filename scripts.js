document.addEventListener("DOMContentLoaded", () => {
  const $html = document.documentElement;
  const $items = document.querySelectorAll(".plane .item");

  const SPACE = 0.2; // 20vh

  window.addEventListener("scroll", () => {
    console.log("ZLOG window.pageYOffset", window.pageYOffset);
    $html.style.setProperty("--t", window.pageYOffset);

    $items.forEach(($) => {
      const top = SPACE * window.innerHeight;
      const fromTop = $.getBoundingClientRect().y;

      if (fromTop < top) {
        $.style.opacity = 0;
      } else if (fromTop < top * 2) {
        const factor = ((fromTop - top) / top).toFixed(2);
        $.style.opacity = Math.max(0, factor);
      } else {
        $.style.opacity = 1;
      }
    });
  });

  const throttle = (type, name, obj = window) => {
    let running = false;

    let func = () => {
      if (running) {
        return;
      }

      running = true;

      requestAnimationFrame(() => {
        obj.dispatchEvent(new CustomEvent(name));
        running = false;
      });
    };

    obj.addEventListener(type, func);
  };

  // throttle("scroll", "optimizedScroll");
});

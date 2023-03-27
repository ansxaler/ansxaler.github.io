document.addEventListener("DOMContentLoaded", () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;

  const $html = document.documentElement;
  const $boxes = document.querySelectorAll(".box");
  const $items = document.querySelectorAll(".item");

  const SPACE = 0.2; // 20vh
  const LIMIT = 0.3;
  const LIMIT_INVERSE = 0.7;

  const calculateThings = () => {
    const howFarDown =
      window.pageYOffset / ($html.scrollHeight - window.innerHeight);
    const factor = howFarDown.toFixed(2);

    $html.style.setProperty("--pageY", window.pageYOffset);
    $html.style.setProperty("--factor", factor);

    $items.forEach(($) => {
      const top = SPACE * window.innerHeight;
      const fromTop = $.getBoundingClientRect().y;

      if (fromTop < top) {
        $.style.setProperty("--self", 0);
      } else if (fromTop < top * 2) {
        const factor = ((fromTop - top) / top).toFixed(2);
        $.style.setProperty("--self", Math.max(0, factor));
      } else {
        $.style.setProperty("--self", 1);
      }
    });

    $boxes.forEach(($) => {
      // if ($.getAttribute("id") !== "c") {
      //   return;
      // }

      const visibleHeight = window.innerHeight;
      const fullHeight = $html.scrollHeight;
      const fromTop = $.getBoundingClientRect().y;

      let blur = 1;
      let opacity = 1;
      let scale = fromTop / visibleHeight;

      // Out of view
      if (fromTop > visibleHeight) {
        blur = 1;
        opacity = 1;
      } else if (fromTop > visibleHeight * 0.7) {
        const visiblePercentage =
          (visibleHeight - fromTop) / (visibleHeight * 0.3);
        blur = 1 - visiblePercentage;
        opacity = 1;
      } else if (fromTop > visibleHeight * 0.3) {
        blur = 0;
        opacity = 1;
      } else {
        blur = 0;
        const percentage = fromTop / (visibleHeight * 0.3);
        opacity = percentage;
        blur = 1 - percentage;
      }

      $.style.setProperty("--blur", blur);
      $.style.setProperty("--opacity", opacity);
      $.style.setProperty("--scale", scale);
    });
  };

  window.addEventListener("scroll", () => {
    calculateThings();
  });

  calculateThings();

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

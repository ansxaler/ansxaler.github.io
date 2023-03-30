document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    document.documentElement.classList.add("is-ready");
  }, 300);

  const $cat = document.getElementById("cat");
  const $overlay = document.getElementById("overlay");
  const $top = document.getElementById("top");
  const $bottom = document.getElementById("bottom");

  const scroll = new LocomotiveScroll({
    el: document.querySelector("[data-scroll-container]"),
    // reloadOnContextChange: true,
    smooth: true,
  });

  document.addEventListener("keydown", (e) => {
    // e.preventDefault();

    if (e.key === "j") {
      e.preventDefault();
      return scroll.scrollTo($top);
    }

    if (e.key === "ArrowDown") {
      if (e.metaKey) {
        e.preventDefault();
        console.log("ZLOG e", e);
        return scroll.scrollTo($bottom);
      }
    }
  });

  scroll.on("scroll", (args) => {
    const { currentElements, limit, scroll } = args;
    // args.currentElements  = elements in view
    // args.limit  = maximum scroll possible
    // args.delta  = desired position
    // args.scroll = current position

    const progress = (scroll.y / limit.y).toFixed(2);
    $cat.style.setProperty("--x", progress);
    $overlay.style.opacity = progress;

    Object.values(currentElements).forEach((wagon) => {
      if (wagon.class === "lm-message") {
        const factor = wagon.progress.toFixed(2);
        const half = Math.min(1, factor * 2);
        const third = Math.min(1, factor * 3);
        const quarter = Math.min(1, factor * 4);
        wagon.el.style.setProperty("--factor", factor);
        wagon.el.style.setProperty("--factor-invert", 1 - factor);
        // wagon.el.style.setProperty("--half", half);
        // wagon.el.style.setProperty("--half-invert", 1 - half);
        wagon.el.style.setProperty("--third", third);
        wagon.el.style.setProperty("--third-invert", 1 - third);
        // wagon.el.style.setProperty("--quarter", quarter);
        // wagon.el.style.setProperty("--quarter-invert", 1 - quarter);
      }
    });
  });

  // scroll.on("call", (value, way, obj) => {
  // value = value of data-scroll-call
  // way = enter or exit viewport
  // });
});

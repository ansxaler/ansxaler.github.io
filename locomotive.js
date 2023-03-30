document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    document.documentElement.classList.add("is-ready");
  }, 300);

  const scroll = new LocomotiveScroll({
    el: document.querySelector("[data-scroll-container]"),
    smooth: true,
  });

  scroll.on("scroll", (args) => {
    // args.limit  = maximum scroll possible
    // args.scroll = current position
    // args.delta  = desired position
    // args.currentElements  = elements in view

    const progress = (1 * args.scroll.y) / args.limit.y;

    Object.values(args.currentElements).forEach((wagon) => {
      if (wagon.class === "lm-message") {
        const factor = wagon.progress.toFixed(2);
        const half = Math.min(1, factor * 2);
        const third = Math.min(1, factor * 3);
        const quarter = Math.min(1, factor * 4);
        wagon.el.style.setProperty("--factor", factor);
        wagon.el.style.setProperty("--factor-invert", 1 - factor);
        wagon.el.style.setProperty("--half", half);
        wagon.el.style.setProperty("--half-invert", 1 - half);
        wagon.el.style.setProperty("--third", third);
        wagon.el.style.setProperty("--third-invert", 1 - third);
        wagon.el.style.setProperty("--quarter", quarter);
        wagon.el.style.setProperty("--quarter-invert", 1 - quarter);
      }
    });
  });

  scroll.on("call", (value, way, obj) => {
    // value = value of data-scroll-call
    // way = enter or exit viewport
    if (value === "messageBackground") {
      // console.log("ZLOG obj", obj);
    }
  });
});

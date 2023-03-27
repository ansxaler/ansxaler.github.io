document.addEventListener("DOMContentLoaded", () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;

  const $html = document.documentElement;
  const $cat = document.getElementById("cat");
  const $overlay = document.getElementById("overlay");

  const darkenBackground = () => {
    const howFarDown =
      window.pageYOffset / ($html.scrollHeight - window.innerHeight);
    const factor = howFarDown.toFixed(2);

    $cat.style.setProperty("--x", factor);
    $overlay.style.opacity = factor;
  };

  window.addEventListener("scroll", () => {
    darkenBackground();
  });

  darkenBackground();
});

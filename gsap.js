document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const $messages = document.querySelectorAll(".message");

  $messages.forEach(($) => {
    const $body = $.querySelector(".message-body");

    gsap.to($, {
      scrollTrigger: {
        trigger: $,
        scrub: true,
        pin: true,
        start: "center center",
        end: "bottom -100%",
        toggleClass: "active",
        ease: "power1",
        onUpdate: (self) =>
          $.style.setProperty("--scrollProgress", self.progress),
      },
    });

    // gsap.set($body, {
    //   filter: "blur(20px)",
    //   // y: "30%",
    // });

    // gsap.to($body, {
    //   filter: "blur(0px)",
    // });

    const tween = gsap.from($body, {
      scrollTrigger: {
        trigger: $,
        scrub: 0.5,
        start: "top bottom",
        end: "bottom -300%",
        ease: "power1",
        onUpdate: (self) => {
          const blurAmount = Math.max(0, (0.2 - self.progress) / 0.2);
          // $body.style.setProperty("--scrollProgress", self.progress);
          $body.style.setProperty("--blurAmount", blurAmount);
        },
      },
      // filter: "blur(0px)",
      y: "30%",
    });

    console.log("ZLOG tween.progress()", tween.progress());
  });

  // ScrollTrigger.batch(".message-container", {
  //   trigger: ".message-container",
  //   scrub: true,
  //   pin: true,
  //   start: "center center",
  //   end: "bottom -100%",
  //   toggleClass: "active",
  //   ease: "power2",
  //   onUpdate: (batch) => console.log("progress:", batch),
  // });

  // ScrollTrigger.batch(".message", {
  //   trigger: ".message-container",
  //   scrub: 0.5,
  //   start: "top bottom",
  //   end: "bottom -300%",
  //   ease: "power2",
  // });
});

window,addEventListener("load", function() {

  // プラグイン
  gsap.registerPlugin(ScrollTrigger);

  const area = document.querySelectorAll(".js-area");
  const wrap = document.querySelectorAll(".js-wrap");
  const sections = document.querySelectorAll(".panel");
  const num = sections.length;

  gsap.set(wrap, { width: num * 100 + "%" });
  gsap.set(sections, {width: 100 / num + "%"});

  gsap.to(sections, {
    xPercent: -100 * (sections.length - 1),
    ease: "none",
    scrollTrigger: {
      trigger: ".area",
      start: "top top",
      end: "+=1000",
      pin: true,
      scrub: 1,
    }
  });
});
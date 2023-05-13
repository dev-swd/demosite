window,addEventListener("load", function() {

  var scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
    direction: 'horizontal',
    multiplier: 1, // スクロールの速度（値が小さいほど遅くなる）
    horizontalGesture: true
  });

});


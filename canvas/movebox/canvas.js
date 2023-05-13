window.onload = function() {

  var canvas = document.createElement('canvas');
  canvas.id = 'bg-canvas';
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);

  const fps = 1000/60;
  var x = -200;
  var y = -200;
  var alpha = 0;
  var _alpha = 0.01;

  function animation() {
    var cvs = document.getElementById('bg-canvas');
    var ctx = cvs.getContext("2d");
    ctx.clearRect(0,0,cvs.width,cvs.height);
    x += 2;
    y += 0.5;
    alpha += _alpha;
    ctx.globalAlpha = alpha;
    ctx.fillStyle = 'blue';
    ctx.fillRect(x,y,200,200);
    if (x >= cvs.width) {
      x = -200;
    }
    if (y >= cvs.height) {
      y = -200;
    }
    if (alpha >= 1 || alpha <= 0) {
      _alpha = _alpha * -1;
    }
  }
  var timerId = setInterval(animation,fps);

};

window.onresize = function() {
  var cvs = document.getElementById('bg-canvas');
  cvs.width = window.innerWidth;
  cvs.height = window.innerHeight;
}

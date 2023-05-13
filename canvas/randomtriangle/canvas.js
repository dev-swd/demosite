window.onload = function() {

  var canvas = document.createElement('canvas');
  canvas.id = 'bg-canvas';
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);

  var ctx = canvas.getContext("2d");
  for(var i=0; i<50; i++){
    var
      // 三角形の始点
      startX = rand(0, canvas.width),
      startY = rand(0, canvas.height),
      // 残り２点
      x1 = rand(-300,300),
      y1 = rand(-200,200),
      x2 = rand(-300,300),
      y2 = rand(-200,200),
      // 色
      r = rand(0, 255),
      g = rand(0, 255),
      b = rand(0, 255)
    ;

    ctx.globalAlpha = 0.5;
    ctx.fillStyle = `rgb(${r},${g},${b})`;
    ctx.beginPath();
    ctx.moveTo(startX,startY);
    ctx.lineTo(startX + x1,startY + y1);
    ctx.lineTo(startX + x2,startY + y2);
    ctx.fill();
  }  
};
function rand(min,max) {
  return (Math.random()*(max-min) + min)>>0
}

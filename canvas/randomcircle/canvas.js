window.onload = function() {

  var canvas = document.createElement('canvas');
  canvas.id = 'bg-canvas';
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);

  var ctx = canvas.getContext("2d");
  for(var i=0; i<30; i++){
    var
      // 円の中心
      cx = rand(-50, canvas.width + 50),
      cy = rand(-50, canvas.height + 50),
      // 半径
      ra = rand(10,150),
      // グラデーション範囲
      ra1 = rand(1,ra),
      ra2 = rand(1,ra),
      // グラデーションの色
      r1 = rand(0, 255),
      g1 = rand(0, 255),
      b1 = rand(0, 255),
      r2 = rand(0, 255),
      g2 = rand(0, 255),
      b2 = rand(0, 255)
    ;

    var grad = ctx.createRadialGradient(cx,cy,ra1,cx,cy,ra2);
    grad.addColorStop(0,`rgb(${r1},${g1},${b1})`);
    grad.addColorStop(1,`rgb(${r2},${g2},${b2})`);
    ctx.globalAlpha = 0.5;
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx,cy,ra,0,360*Math.PI/180);
    ctx.fill();
  }  
};
function rand(min,max) {
  return (Math.random()*(max-min) + min)>>0
}

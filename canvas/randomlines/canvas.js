window.onload = function() {

  var canvas = document.createElement('canvas');
  canvas.id = 'bg-canvas';
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);

  var ctx = canvas.getContext("2d");
  for(var i=0; i<100; i++){
    var
      // 線の始点、終点
      startX = rand(-50, canvas.width + 50),
      startY = rand(-50, canvas.height + 50),
      endX = rand(-50, canvas.width + 50),
      endY = rand(-50, canvas.height + 50),
      // 色
      r = rand(0, 255),
      g = rand(0, 255),
      b = rand(0, 255),
      // 線の太さ
      lineWidth = rand(5, 10)
    ;

    ctx.strokeStyle = `rgb(${r},${g},${b})`;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.moveTo(startX,startY);
    ctx.lineTo(endX,endY);
    ctx.stroke();
  }  
};
function rand(min,max) {
  return (Math.random()*(max-min) + min)>>0
}

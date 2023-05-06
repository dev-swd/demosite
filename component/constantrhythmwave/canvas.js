let canvasW = 0;
let canvasH = 0;

window.onload = function() {

  var canvas = document.createElement('canvas');
  canvas.textContent = "Canvasに対応したブラウザを使用してください。";
  canvas.id = 'canvas';
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);

  var ctx = canvas.getContext("2d");

  // アニメーション
  function tick() {
    requestAnimationFrame(tick);
    draw();
  }

  function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.lineWidth = 1;

    const lineNum = 50;    // ライン数

    const segmentNum = 30;   // 分割数
    const amplitude = canvas.height / 3;    // 振り幅
    const time = Date.now() / 1000;   // 媒介変数（時間）
    
    for( var j=0; j<lineNum; j++) {
      ctx.beginPath();

      const h = Math.round((j / lineNum) * 360);
      const s = 100;
      const l = Math.round((j / lineNum) * 100);
      ctx.strokeStyle = `hsl(${h},${s}%,${l}%)`;

      for( var i=0; i<segmentNum; i++) {
        // X座標
        const x = i / (segmentNum - 1) * canvas.width;
        // ラジアン
        const radian = i / segmentNum * Math.PI + time + (0.05 * j);
        // Y座標
        const y = amplitude * Math.sin(radian) + canvas.height / 2;
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
  
    }
  }

  window.addEventListener('resize', resize);
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  tick();
  resize();
}

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

  noise.seed(Math.random());

  // アニメーション
  function tick() {
    requestAnimationFrame(tick);
    draw();
  }

  function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.lineWidth = 1;

    const lineNum = 150;    // ラインの数

    const segmentNum = 150;   // 分割数
    const amplitude = canvas.height / 2;    // 振り幅
    const time = Date.now() / 4000;   // 媒介変数（時間）

    for( var j=0; j<lineNum; j++) {
      const coefficient = 50 + j;
      ctx.beginPath();
      const h = Math.round((j / lineNum) * 360);
      const s = 100;
      const l = Math.round((j / lineNum) * 100);
      ctx.strokeStyle = `hsl(${h},${s}%,${l}%)`;
  
      for( var i=0; i<segmentNum; i++) {
        // X座標
        const x = i / (segmentNum - 1) * canvas.width;
  
        // パーリンノイズでY軸生成
        const px = i / coefficient;
        const py = j / 50 + time;
        const y = amplitude * noise.perlin2(px,py) + canvas.height / 2;
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

window.onload = function() {

  // 波線
  var cvsWave = document.createElement('canvas');
  cvsWave.textContent = "Canvasに対応したブラウザを使用してください。";
  cvsWave.id = 'canvasWave';
  cvsWave.width = window.innerWidth;
  cvsWave.height = window.innerHeight;
  document.body.appendChild(cvsWave);
  var ctxWave = cvsWave.getContext("2d");
  
  // スポットライト
  var cvsSpot = document.createElement('canvas');
  cvsSpot.textContent = "Canvasに対応したブラウザを使用してください。";
  cvsSpot.id = 'canvasSpot';
  cvsSpot.width = window.innerWidth;
  cvsSpot.height = window.innerHeight;
  document.body.appendChild(cvsSpot);
  var ctxSpot = cvsSpot.getContext("2d");
  
  noise.seed(Math.random());

  // アニメーション
  function tick() {
    requestAnimationFrame(tick);

    // 薄く暗くする
    ctxWave.fillStyle = "rgba(0,0,0,0.2)";
    ctxWave.fillRect(0,0,cvsWave.width,cvsWave.height);

    drawWave();

    ctxSpot.clearRect(0,0,cvsSpot.width,cvsSpot.height);
    drawSpot();

    ctxSpot.globalCompositeOperation = "lighter";
    ctxSpot.drawImage(cvsWave,0,0);
  }

  // 波線描画
  function drawWave() {
    ctxWave.lineWidth = 1;

    const lineNum = 10;    // ラインの数

    const segmentNum = 150;   // 分割数
    const amplitude = cvsWave.height / 2;    // 振り幅
    const time = Date.now() / 4000;   // 媒介変数（時間）

    for( var j=0; j<lineNum; j++) {
      const coefficient = 50 + j;
      ctxWave.beginPath();
      const h = Math.round((j / lineNum) * 360);
      const s = 100;
      const l = Math.round((j / lineNum) * 100);
      ctxWave.strokeStyle = `hsl(${h},${s}%,${l}%)`;
  
      for( var i=0; i<segmentNum; i++) {
        // X座標
        const x = i / (segmentNum - 1) * cvsWave.width;
  
        // パーリンノイズでY軸生成
        const px = i / coefficient;
        const py = j / 10 + time;
        const y = amplitude * noise.perlin2(px,py) + cvsWave.height / 2;
        if (i === 0) {
          ctxWave.moveTo(x, y);
        } else {
          ctxWave.lineTo(x, y);
        }
      }
      ctxWave.stroke();
    }
  }

  // スポットライト描画
  function drawSpot() {
    // １個目
    const dx1 = cvsSpot.width / 3 + (cvsSpot.width / 10) * Math.sin(Date.now() / 4000);
    const dy1 = cvsSpot.height / 3;
    const size1 = cvsSpot.width / 2;
    drawCircle(dx1, dy1, size1, "rgba(255,255,255,0.3)");

    // ２個目
    const dx2 = (cvsSpot.width * 3) / 4 + (cvsSpot.width / 15) * Math.cos(Date.now() / 10000);
    const dy2 = (cvsSpot.height * 2) / 3;
    const size2 = cvsSpot.width / 3;
    drawCircle(dx2, dy2, size2, "rgba(255,255,255,0.1)");
  }

  function drawCircle(dx, dy, size, color) {
    // グラデーション
    const grad = ctxSpot.createRadialGradient(dx, dy, 0, dx, dy, size);
    grad.addColorStop(0, color);
    grad.addColorStop(1, "rgba(0,0,0,0)");

    // 円
    ctxSpot.fillStyle = grad;
    ctxSpot.beginPath();
    ctxSpot.arc(dx, dy, size, 0, Math.PI * 2);
    ctxSpot.closePath();
    ctxSpot.fill();
  }

  window.addEventListener('resize', resize);
  function resize() {
    cvsWave.width = window.innerWidth;
    cvsWave.height = window.innerHeight;

    cvsSpot.width = window.innerWidth;
    cvsSpot.height = window.innerHeight;
  }

  tick();
  resize();

}

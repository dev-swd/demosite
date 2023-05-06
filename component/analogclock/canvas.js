window.onload = function() {

  var canvas = document.createElement('canvas');
  canvas.textContent = "Canvasに対応したブラウザを使用してください。";
  canvas.id = 'canvas';
  canvas.width = 500;
  canvas.height = 500;
  document.body.appendChild(canvas);

  var ctx = canvas.getContext("2d");

  ctx.font = '36px sans-serif';

  // 文字の基準位置を中心にする
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  setInterval(function() {

    ctx.clearRect(0,0,canvas.width,canvas.height);

    for ( var i = 1; i<=12; i++) {

      // 基準座標からy軸-180 且つ 30°ずらした位置にテキスト描画
  //    ctx.rotate(30*Math.PI/180);
  //    ctx.fillText(i, 0, -180);
  
      // 文字盤の位置補正のための変更
      // 文字中心を基準座標として-30°してから、基準座標からy軸-180 且つ 30°ずらした位置にテキスト描画
      ctx.save();
      ctx.translate(canvas.width/2, canvas.height/2);   // 図形描画の基準座標をcanvas中央にする
      ctx.rotate(30*i*Math.PI/180);
      ctx.translate(0, -180);
      ctx.rotate(-30*i*Math.PI/180);
      ctx.fillText(i, 0, 0);
      ctx.restore();
  
    }
  
    // 現在時刻
    var date = new Date();
  
    // 秒針
    ctx.save();
    ctx.translate(canvas.width/2, canvas.height/2);   // 図形描画の基準座標をcanvas中央にする
    ctx.lineWidth = 1;
    ctx.strokeStyle = "red";
    ctx.beginPath();
    // 経過秒を角度に換算（6°/秒）して回転
    ctx.rotate(date.getSeconds()*6*Math.PI/180);
    // 原点から１２時の方向に直線
    ctx.moveTo(0,0);
    ctx.lineTo(0,-155);
    ctx.stroke();
    ctx.restore();
  
    // 長針
    ctx.save();
    ctx.translate(canvas.width/2, canvas.height/2);   // 図形描画の基準座標をcanvas中央にする
    ctx.lineWidth = 4;
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    // 経過分を角度に換算（6°/分）して回転
    ctx.rotate(date.getMinutes()*6*Math.PI/180);
    ctx.moveTo(0,0);
    ctx.lineTo(0,-155);
    ctx.stroke();
    ctx.restore();
  
    // 短針
    ctx.save();
    ctx.translate(canvas.width/2, canvas.height/2);   // 図形描画の基準座標をcanvas中央にする
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    // 経過時を経過分考慮で角度に換算（30°/時）して回転
    ctx.rotate((date.getHours() + date.getMinutes()/60)*30*Math.PI/180);
    ctx.moveTo(0,0);
    ctx.lineTo(0,-120);
    ctx.stroke();
    ctx.restore();

  }, 1000/30);



}

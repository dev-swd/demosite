window.onload = function() {

  var canvas = document.createElement('canvas');
  canvas.textContent = "Canvasに対応したブラウザを使用してください。";
  canvas.id = 'canvas';
  canvas.width = 1000;
  canvas.height = 800;
  document.body.appendChild(canvas);

  var ctx = canvas.getContext("2d");

  var
    // 現在位置
    x,y,
    // CSSで指定したborderサイズ（座標調整用）
    borderSize = 1,
    // 描画中フラグ
    isDrawing = false
  ;

  // 線の端を丸める
  ctx.lineCap = 'round';
  // 線の色
  var input_color = document.getElementById('color');
  input_color.addEventListener('change', function() {
    ctx.strokeStyle = this.value;
  });
  // 線の太さ
  var input_width = document.getElementById('width');
  input_width.addEventListener('change', function() {
    ctx.lineWidth = this.value;
  });

  // canvas上でマウスのボタンが押下された際のイベントリスナー
  canvas.addEventListener('mousedown', onDown);
  // マウスポインターがcanvas上で動いた際のイベントリスナー
  canvas.addEventListener('mousemove', onMove);
  // canvas上でマウスのボタンが解放された際のイベントリスナー
  canvas.addEventListener('mouseup', onUp);
  // マウスポインターがcanvasから離れた際のイベントリスナー
  canvas.addEventListener('mouseleave', onLeave);
  // タッチイベントにも対応
  canvas.addEventListener('touchstart', onDown);
  canvas.addEventListener('touchmove', onMove);
  canvas.addEventListener('touchend', onUp);

  function onDown(e) {
    // マウスを押されたら現在位置を記録して、描画中にする
    x = e.pageX - (canvas.offsetLeft + borderSize);
    y = e.pageY - (canvas.offsetTop + borderSize);
    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.lineTo(x,y);
    ctx.stroke();
    isDrawing = true;
  }

  function onMove(e) {
    if(isDrawing) {
      ctx.beginPath();
      ctx.moveTo(x,y);
      x = e.pageX - (canvas.offsetLeft + borderSize);
      y = e.pageY - (canvas.offsetTop + borderSize);
      ctx.lineTo(x,y);
      ctx.stroke();
    }
  }

  function onUp(e) {
    isDrawing = false;
  }

  function onLeave(e) {
    isDrawing = false;
  }

}

// 初期化処理
function button_onClick() {
  var cvs = document.getElementById("canvas");
  var ctx = cvs.getContext("2d");
  ctx.clearRect(0,0,canvas.width,canvas.height);
}

window.onload = function() {

  var canvas = document.createElement('canvas');
  canvas.textContent = "Canvasに対応したブラウザを使用してください。";
  canvas.id = 'canvas';
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);

  var ctx = canvas.getContext("2d");

  // 火花オブジェクト
  var hibanaList = [];
  var hibanaObj = {
    // 火花拡散範囲の半径
    size: 3,
    // 火花拡散範囲の減少率
    reduction_rate: 0.98,
    // 重力加速度
    gravity: 0.05,

    // 更新
    update: function() {
      this.vy += this.gravity;
      this.x += this.vx;
      this.y += this.vy;
      this.size *= this.reduction_rate;
    },

    // 描画
    draw: function() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, Math.PI*2, false);
      ctx.fill();
    }
  };

  // 花火生成
  function createHanabi(x,y) {
    // HSLで色を生成
    var h = rand(0, 360);   //色相：360°全色
    var s = rand(80, 100);  //彩度：80%~100%
    var l = rand(50, 100);  //輝度：50%~100%
    var color = `hsl(${h},${s}%,${l}%)`;

    //250この火花を作成
    for (var i=1; i<250; i++) {
      var speed = rand(0,2.5);
      var angle = rand(0,360)*Math.PI/180;
      var hibana = Object.create(hibanaObj);
      // 位置
      hibana.x = x;
      hibana.y = y;
      // 速度
      hibana.vx = Math.cos(angle)*speed;
      hibana.vy = Math.sin(angle)*speed;
      // サイズ
      hibana.size = hibana.size;
      // 色
      hibana.color = color;

      // リストに設定
      hibanaList.push(hibana);
    }
  };

  // ランダムな値を生成
  function rand(min, max) {
    return (Math.random()*(max-min) + min);
  }  

  // 花火の描画
  function drawHanabi() {
    console.log("interval running");
    // 画面クリア
    ctx.clearRect(0,0,canvas.width,canvas.height);
    // 火花を描画
    hibanaList.forEach(function(hibana){
      // 火花オブジェクトを描画
      hibana.draw();
    });
  }

  // 花火の更新
  function updateHanabi() {
    // 火花を更新
    hibanaList.forEach(function(hibana, i){
      // 火花オブジェクトを更新
      hibana.update();
      // 火花が最小サイズより小さくなるか、canvas範囲外になったら配列から削除
      if (hibana.size < 0.05
        || hibana.x < 0
        || hibana.x > canvas.width
        || hibana.y > canvas.height) {
        hibanaList.splice(i,1);
//        if(hibanaList.length===0){
//          console.log("interval stop");
//          clearInterval(timer);
//        }
      }
    });
  }

  // 花火描画タイマー
  var timer = setInterval(function(){
    drawHanabi();
    updateHanabi();
  }, 1000/60);

  // マウスクリック（花火打ち上げトリガ）
  canvas.addEventListener('click',function(e){
    // クリック座標を取得
    var x = e.pageX - canvas.offsetLeft;
    var y = e.pageY - canvas.offsetTop;
    // クリック地点に花火打ち上げ
    createHanabi(x,y);

  });

  var mainTimer = setInterval(function(){
    console.log("main interval");
    if (rand(1,2)>>0 === 1){
      var x = rand(10, canvas.width-10);
      var y = rand(10, canvas.height-10);
      createHanabi(x,y);
    }
  }, 1500);
}

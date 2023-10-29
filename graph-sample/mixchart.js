/**
 * 
 * @param cvs     canvasタグ
 * @param margin  余白（t:上、b:下、l:左、r:右） 
 * @param scale   目盛（unit:単位、max:最大値）
 * @param graphProp グラフ設定（width:幅、cap：先端形状）
 * @param data  データ配列（title:X軸表示、value:データ値、color:色）
 * @returns 
 */
const mixchart = (cvs, margin, scale, graphProp, data) => {
  // 主線
  const MainLine = 1;
  // 目盛線
  const UnitLine = 0.2;

  if (!cvs.getContext) return;

  const ctx = cvs.getContext("2d");
  
  // 余白
  const mt = margin.t;
  const mb = margin.b;
  const ml = margin.l;
  const mr = margin.r;
  // グラフ高さ、幅
  const graphAreaheight = cvs.getAttribute("height") - (mt + mb);
  const graphAreaWidth = cvs.getAttribute("width") - (ml + mr);
  // Y軸目盛
  const cntY = Math.floor(scale.main.max / scale.main.unit);
  const overY = scale.main.max % scale.main.unit;
  if (overY) {
    cntY += scale.main.unit;
  }
  const unitY = graphAreaheight / cntY;
  // X軸目盛
  const cntX = data.title.length + 1;
  const unitX = graphAreaWidth / cntX;

  // Y軸左線
  ctx.beginPath();
  ctx.lineWidth = MainLine;
  ctx.moveTo(ml, mt);
  ctx.lineTo(ml, graphAreaheight + mt);
  ctx.stroke();

  // Y軸目盛線
  for (var i=0; i<cntY; i++){
    ctx.beginPath();
    ctx.lineWidth = UnitLine;
    ctx.moveTo(ml, mt + (unitY * i));
    ctx.lineTo(graphAreaWidth + ml, mt + (unitY * i));
    ctx.stroke();

    // Y軸目盛ラベル
    if (i<cntY){
      ctx.textAlign = 'right';
      ctx.textBaseline="middle";
      ctx.font = scale.fontSize + 'px serif';
      ctx.fillText(scale.main.unit * (cntY - i) , ml - 5 , mt + (unitY * i));  

      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.font = scale.fontSize + 'px serif';
      ctx.fillText(scale.sub.unit * (cntY - i) , ml + graphAreaWidth + 5 , mt + (unitY * i));  
    }    
  }
  
  // X軸目盛線
  for (var i=1; i<cntX; i++){
    ctx.beginPath();
    ctx.lineWidth = UnitLine;
    ctx.moveTo(ml + (unitX * i), mt);
    ctx.lineTo(ml + (unitX * i), graphAreaheight + mt);
    ctx.stroke();
  }

  // Y軸右線
  ctx.beginPath();
  ctx.lineWidth = MainLine;
  ctx.moveTo(ml + graphAreaWidth, mt);
  ctx.lineTo(ml + graphAreaWidth, graphAreaheight + mt);
  ctx.stroke();

  // 積み上げ棒グラフ
  // ベースの座標から引き算で算定
  for (var i=0; i<data.title.length; i++){
    var zeroPos = mt + graphAreaheight;
    for (var j=data.value.main.length-1; j>=0; j--){
      var rate = 0;
      if (data.value.main[j][i]>scale.main.max){
        rate = 1;
      } else {
        rate = data.value.main[j][i]/scale.main.max;
      }
      var barHeight = graphAreaheight * rate;
      ctx.beginPath();
      ctx.lineWidth = graphProp.width;
      ctx.lineCap = 'butt';
      if (j===0 && graphProp.cap==='round'){
        ctx.moveTo(ml + (unitX * (i + 1)), zeroPos - barHeight + (graphProp.width / 2));          
      } else {
        ctx.moveTo(ml + (unitX * (i + 1)), zeroPos - barHeight);
      }
      ctx.lineTo(ml + (unitX * (i + 1)), zeroPos);
      ctx.strokeStyle=data.color.main[j];
      ctx.stroke();
      zeroPos = zeroPos - barHeight;
      // 丸先端加工
      if (j===0){
        if (graphProp.cap==='round'){
          var radius = graphProp.width / 2
          ctx.beginPath();
          ctx.arc(ml + (unitX * (i + 1)), zeroPos + radius, radius, 0, 180*Math.PI/180, true);
          ctx.fillStyle=data.color.main[0];
          ctx.fill();
        }
      }
    }
  }

  // 折れ線グラフ
  var radius = graphProp.width / 2
  var subMax = scale.sub.unit * cntY;
  var zeroPos = mt + graphAreaheight;
  var _pos = 0;
  // 線
  for (var i=0; i<data.value.sub.length; i++){
    for (var j=0; j<data.title.length; j++){
      var rate = 0;
      if (data.value.sub[i][j]>subMax){
        rate = 1;
      } else {
        rate = data.value.sub[i][j]/subMax;
      }
      var pos = zeroPos - (graphAreaheight * rate);

      if (j>0){
        ctx.beginPath();
        ctx.lineWidth = MainLine;
        ctx.strokeStyle=data.color.sub[i];
        ctx.moveTo(ml + (unitX * j), _pos);
        ctx.lineTo(ml + (unitX * (j + 1)), pos);
        ctx.stroke();
      }

      _pos = pos;
    }
  }
  // 点
  for (var i=0; i<data.value.sub.length; i++){
    for (var j=0; j<data.title.length; j++){
      var rate = 0;
      if (data.value.sub[i][j]>subMax){
        rate = 1;
      } else {
        rate = data.value.sub[i][j]/subMax;
      }
      var pos = zeroPos - (graphAreaheight * rate);

      // 点描画
      ctx.beginPath();
      ctx.arc(ml + (unitX * (j + 1)), pos, radius, 0, 360*Math.PI/180, true);
      ctx.fillStyle=data.color.sub[i];
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle= "#fff";
      ctx.stroke();

      _pos = pos;
    }
  }

  // X軸線
  ctx.beginPath();
  ctx.lineWidth = MainLine;
  ctx.strokeStyle="#000";
  ctx.moveTo(ml, graphAreaheight + mt);
  ctx.lineTo(graphAreaWidth + ml, graphAreaheight + mt);
  ctx.stroke();

  // X軸目盛ラベル
  for (var i=0; i<cntX-1; i++){
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.font = scale.fontSize + 'px serif';
    ctx.fillStyle="#000";
    ctx.fillText(data.title[i], ml + (unitX * (i+1)), graphAreaheight + mt + scale.fontSize);  
  }

}

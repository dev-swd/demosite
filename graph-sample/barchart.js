/**
 * 
 * @param cvs     canvasタグ
 * @param margin  余白（t:上、b:下、l:左、r:右） 
 * @param scale   目盛（unit:単位、max:最大値）
 * @param graphProp グラフ設定（width:幅、cap：先端形状）
 * @param data  データ配列（title:X軸表示、value:データ値、color:色）
 * @returns 
 */
const barchart = (cvs, margin, scale, graphProp, data) => {
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
  const cntY = Math.floor(scale.max / scale.unit);
  const overY = scale.max % scale.unit;
  if (overY) {
    cntY += scale.unit;
  }
  const unitY = graphAreaheight / cntY;
  // X軸目盛
  const cntX = data.title.length + 1;
  const unitX = graphAreaWidth / cntX;

  // Y軸線
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
      ctx.textBaseline = 'middle';
      ctx.font = scale.fontSize + 'px serif';
      ctx.fillText(scale.unit * (cntY - i) , ml - 5 , mt + (unitY * i));  
    }    
  }
  
  // X軸目盛線
  for (var i=1; i<=cntX; i++){
    ctx.beginPath();
    ctx.lineWidth = UnitLine;
    ctx.moveTo(ml + (unitX * i), mt);
    ctx.lineTo(ml + (unitX * i), graphAreaheight + mt);
    ctx.stroke();
  }

  // グラフ
  var bgw = graphProp.width / data.value.length;
  var bgleft = graphProp.width / 2 - bgw / 2;
  for (var i=0; i<data.title.length; i++){
    for (var j=0; j<data.value.length; j++){
      var rate = 0;
      if (data.value[j][i]>scale.max){
        rate = 0;
      } else {
        rate = (scale.max - data.value[j][i])/scale.max;
      }
      var topPos = (graphAreaheight * rate) + mt;
      ctx.beginPath();
      ctx.lineWidth = bgw;
      ctx.lineCap = 'butt';
      if (graphProp.cap === 'round'){
        ctx.moveTo((ml + (unitX * (i + 1)) + j) - bgleft + (bgw * j), topPos + (bgw / 2));
      } else {
        ctx.moveTo((ml + (unitX * (i + 1)) + j) - bgleft + (bgw * j), topPos);
      }
      ctx.lineTo((ml + (unitX * (i + 1)) + j) - bgleft + (bgw * j), graphAreaheight + mt);
      ctx.strokeStyle=data.color[j];
      ctx.stroke();
      if (graphProp.cap === 'round'){
        ctx.beginPath();
        ctx.lineWidth = bgw;
        ctx.lineCap = 'round';
        ctx.moveTo((ml + (unitX * (i + 1)) + j) - bgleft + (bgw * j), topPos + (bgw / 2));
        ctx.lineTo((ml + (unitX * (i + 1)) + j) - bgleft + (bgw * j), topPos + (bgw / 2));
        ctx.strokeStyle=data.color[j];
        ctx.stroke();  
      }
    }
  }

  // X軸、X軸目盛ラベルのエリアをクリア
  ctx.beginPath();
  ctx.clearRect(ml, graphAreaheight + mt - MainLine, graphAreaWidth, mb);
  
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
    ctx.fillText(data.title[i], ml + (unitX * (i+1)), graphAreaheight + mt + scale.fontSize);  
  }


}
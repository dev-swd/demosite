window.onload = function() {

//  const fps = 1000/60;
  const fps = 50;

  const cvs1 = document.getElementById("canvas01");
  if (cvs1.getContext) {
    const ctx1 = cvs1.getContext("2d");
    
    var x1 = 0;
    var max1 = cvs1.width;
    function animation1() {
      ctx1.fillStyle = 'blue';
      ctx1.fillRect(x1,50,200,200);
      x1 += 5;
//      if (x1 + 200 > max1) {
//         clearInterval(timerId1);
      if (x1 + 195 > max1) {
        ctx1.clearRect(0,0,cvs1.width,cvs1.height);
        x1 = 0;
      }
    }
    var timerId1 = setInterval(animation1,fps);

  }

  const cvs2 = document.getElementById("canvas02");
  if (cvs2.getContext) {
    const ctx2 = cvs2.getContext("2d");
    
    var x2 = 0;
    var max2 = cvs2.width;
    function animation2() {
      ctx2.clearRect(0,0,cvs2.width,cvs2.height);
      ctx2.fillStyle = 'blue';
      ctx2.fillRect(x2,50,200,200);
      x2 += 5;
//      if (x2 + 200 > max2) {
//        clearInterval(timerId2);
      if (x2 + 200 > max2) {
        x2 = 0;
      }
    }
    var timerId2 = setInterval(animation2,fps*1.1);

  }

  const cvs3 = document.getElementById("canvas03");
  if (cvs3.getContext) {
    const ctx3 = cvs3.getContext("2d");
    
    var x3 = -200;
    var y3 = -200;
    var alpha3 = 0;
    var _alpha3 = 0.01;
    function animation3() {
      ctx3.clearRect(0,0,cvs3.width,cvs3.height);
      x3 += 2;
      y3 += 1;
      alpha3 += _alpha3;
      ctx3.globalAlpha = alpha3;
      ctx3.fillStyle = 'blue';
      ctx3.fillRect(x3,y3,200,200);
      if (x3 > cvs3.width) {
        x3 = -200;
      }
      if (y3 > cvs3.height) {
        y3 = -200;
      }
      if (alpha3 >= 1 || alpha3 <= 0) {
        _alpha3 = _alpha3 * -1;
      }
    }
    var timerId3 = setInterval(animation3,fps);

  }

  const cvs4 = document.getElementById("canvas04");
  if (cvs4.getContext) {
    const ctx4 = cvs4.getContext("2d");
    
    var angle = 0;
    function animation4() {
      ctx4.clearRect(0,0,cvs4.width,cvs4.height);
      angle += 1;
      ctx4.save();
      ctx4.translate(250,160);
      ctx4.rotate(angle*Math.PI/180);
      ctx4.fillStyle = 'blue';
      ctx4.fillRect(-100,-100,200,200);
      ctx4.restore();
      if (angle > 360) {
        angle = 0;
      }
    }
    var timerId4 = setInterval(animation4,fps);

  }
};


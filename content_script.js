/*chrome.runtime.onMessage.addListener(function(msg) {
  $("body").css("background-color", msg.color);
});*/

/*chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg.ready === "ready") {
        if (confirm('Do you want to have a capture of this screen?')) {
            sendResponse({download : "download"});
        }
    }
});*/

isOn = false;
borderColor = 'rgb(255, 215, 0)';
borderColorSet = {
  'yellow': 'rgb(255, 215, 0)',
  'red': 'rgb(220, 20, 60)',
  'blue': 'rgb(0, 0, 205)'
}

chrome.runtime.onMessage.addListener(function(msg) {
  //$('body').html('<div id="screenshot_layer"></div>');
  //$('body').append('<div id="google_ext_screenshot_layer" style="background: none; width: 1440px; height: 2506px; z-index: 2147483647; position: absolute; top: 0px; left: 0px;"><canvas id="google_ext_screenshot_layer_canvas" width="1440" height="2506" style="background-color: position: absolute; top: 0; margin: 0px; padding: 0px; display: block;　pointer-events: none;"></canvas></div>');
  if (msg.type === 'drawing') {
    if (document.getElementById("google_ext_screenshot_layer_canvas") == null) {
      var screenWidth = document.documentElement.scrollWidth;
      var screenHeight = document.documentElement.scrollHeight;
      $('body').append('<canvas id="google_ext_screenshot_layer_canvas" width="' + String(screenWidth) + '" height="'+ String(screenHeight) +'" style="pointer-events: none; background: none; z-index: 2147483647; position: absolute; top: 0; left: 0px; margin: 0px; padding: 0px; display: block;"></canvas>');
    }
    borderColor = borderColorSet[msg.border_color];
    var canvas = document.getElementById("google_ext_screenshot_layer_canvas");
    var ctx = canvas.getContext("2d");
    //白でぬりつぶす
    ctx.globalAlpha = 0.5;
    ctx.fillStyle = "rgb(102, 102, 102)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    isOn = true;
  }
  if (msg.type === 'reset') {
    var canvas = document.getElementById("google_ext_screenshot_layer_canvas");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
  }
  if (msg.type === 'color_change') {
    /*if (msg.border_color === 'yellow') {
      borderColor = 'rgb(255, 215, 0)';
    } else if (msg.border_color === 'red') {
      borderColor = 'rgb(220, 20, 60)'; //#dc143c
    } else {
      borderColor = 'rgb(0, 0, 205)'; //#0000cd
    }*/
    borderColor = borderColorSet[msg.border_color];
  }
});

$('html').mousemove(function (e) {
  if (isOn) {
    //var mouseX = e.pageX + 10;
    //console.log(jQuery(":hover"));
    jQuery(":hover").each(function () {
       var targetElement = $(this);
       var targetOffset = targetElement.offset();
       var canvas = document.getElementById("google_ext_screenshot_layer_canvas");
       var ctx = canvas.getContext("2d");
       ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
       ctx.globalAlpha = 0.5;
       ctx.fillStyle = "rgb(102, 102, 102)";
       ctx.fillRect(0, 0, canvas.width, canvas.height);

       ctx.save();
       ctx.globalCompositeOperation = 'destination-out';
       ctx.globalAlpha = 1.0;
       //ctx.strokeStyle = 'rgb(00,00,255)';
       ctx.fillRect(targetOffset.left,targetOffset.top,targetElement.outerWidth(),targetElement.outerHeight());
       //ctx.strokeRect(targetOffset.left,targetOffset.top,targetElement.outerWidth(),targetElement.outerHeight());
      // ブレンドモードの設定をもとに戻す。
      ctx.restore();
      ctx.globalAlpha = 1.0;
      //ctx.strokeStyle = 'rgb(255,215,0)';
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = 5;
      ctx.strokeRect(targetOffset.left,targetOffset.top,targetElement.outerWidth(),targetElement.outerHeight());
    });
  }
});

$('html').click(function (e) {
  isOn = false;
});

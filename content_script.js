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

chrome.runtime.onMessage.addListener(function(msg) {
  //$('body').html('<div id="screenshot_layer"></div>');
  //$('body').append('<div id="google_ext_screenshot_layer" style="background: none; width: 1440px; height: 2506px; z-index: 2147483647; position: absolute; top: 0px; left: 0px;"><canvas id="google_ext_screenshot_layer_canvas" width="1440" height="2506" style="background-color: position: absolute; top: 0; margin: 0px; padding: 0px; display: block;　pointer-events: none;"></canvas></div>');
  $('body').append('<canvas id="google_ext_screenshot_layer_canvas" width="1440" height="2506" style="pointer-events: none; background: none; z-index: 2147483647; position: absolute; top: 0; left: 0px; margin: 0px; padding: 0px; display: block;"></canvas>');
  var canvas = document.getElementById("google_ext_screenshot_layer_canvas");
  var ctx = canvas.getContext("2d");
  //白でぬりつぶす
  ctx.globalAlpha = 0.5;
  ctx.fillStyle = "rgb(102, 102, 102)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  isOn = true;
});

$('html').mousemove(function (e) {
  if (isOn) {
    //var mouseX = e.pageX + 10;
    //console.log(jQuery(":hover"));
    jQuery(":hover").each(function () {
       console.log($(this));
       var targetElement = $(this);
       var targetOffset = targetElement.offset();
       var canvas = document.getElementById("google_ext_screenshot_layer_canvas");
       var ctx = canvas.getContext("2d");
       ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
       ctx.globalAlpha = 0.5;
       ctx.fillStyle = "rgb(102, 102, 102)";
       ctx.fillRect(0, 0, canvas.width, canvas.height);
       ctx.globalAlpha = 1.0;
       ctx.strokeStyle = 'rgb(00,00,255)';
       console.log(targetOffset.top)
       console.log(targetOffset.left)
       console.log(targetElement.width())
       console.log(targetElement.height())
       ctx.strokeRect(targetOffset.left,targetOffset.top,targetElement.outerWidth(),targetElement.outerHeight());
    });
  }
});

$('html').click(function (e) {
  isOn = false;
});

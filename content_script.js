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

chrome.runtime.onMessage.addListener(function(msg) {
  //$('body').html('<div id="screenshot_layer"></div>');
  $('body').append('<div id="google_ext_screenshot_layer" style="background: none; width: 1440px; height: 2506px; z-index: 2147483647; position: absolute; top: 0px; left: 0px;"><canvas id="google_ext_screenshot_layer_canvas" width="1440" height="2506" style="background-color: position: absolute; top: 0; margin: 0px; padding: 0px; display: block;"></canvas></div>');
  var canvas = document.getElementById("google_ext_screenshot_layer_canvas");
  var ctx = canvas.getContext("2d");
  //白でぬりつぶす
  ctx.fillStyle = "white";
  ctx.globalAlpha = 0.5;
  ctx.fillStyle = "rgb(102, 102, 102)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
});

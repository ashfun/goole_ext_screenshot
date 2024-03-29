isOn = false;
borderColorSet = {
  yellow: "rgb(255, 215, 0)",
  red: "rgb(220, 20, 60)",
  blue: "rgb(0, 0, 205)"
};
borderColor = borderColorSet["yellow"];

chrome.runtime.onMessage.addListener(function(msg) {
  if (msg.type === "drawing") {
    if (document.getElementById("google_ext_screenshot_layer_canvas") == null) {
      var screenWidth = document.documentElement.scrollWidth;
      var screenHeight = document.documentElement.scrollHeight;
      $("body").append(
        '<canvas id="google_ext_screenshot_layer_canvas" width="' +
          String(screenWidth) +
          '" height="' +
          String(screenHeight) +
          '" style="pointer-events: none; background: none; z-index: 2147483647; position: absolute; top: 0; left: 0px; margin: 0px; padding: 0px; display: block;"></canvas>'
      );
    }
    borderColor = borderColorSet[msg.border_color];
    var canvas = document.getElementById("google_ext_screenshot_layer_canvas");
    var ctx = canvas.getContext("2d");
    ctx.globalAlpha = 0.5;
    ctx.fillStyle = "rgb(102, 102, 102)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    isOn = true;
  }
  if (msg.type === "reset") {
    var canvas = document.getElementById("google_ext_screenshot_layer_canvas");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
  }
});

$("html").mousemove(function(e) {
  if (isOn) {
    jQuery(":hover").each(function() {
      var targetElement = $(this);
      var targetOffset = targetElement.offset();
      var canvas = document.getElementById(
        "google_ext_screenshot_layer_canvas"
      );
      var ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
      ctx.globalAlpha = 0.5;
      ctx.fillStyle = "rgb(102, 102, 102)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.globalCompositeOperation = "destination-out";
      ctx.globalAlpha = 1.0;
      ctx.fillRect(
        targetOffset.left,
        targetOffset.top,
        targetElement.outerWidth(),
        targetElement.outerHeight()
      );
      ctx.restore();
      ctx.globalAlpha = 1.0;
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = 5;
      ctx.strokeRect(
        targetOffset.left,
        targetOffset.top,
        targetElement.outerWidth(),
        targetElement.outerHeight()
      );
    });
  }
});

$("html").click(function(e) {
  isOn = false;
});

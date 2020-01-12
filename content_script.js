chrome.runtime.onMessage.addListener(function(msg) {
  $("body").css("background-color", msg.color);
  /*chrome.tabs.captureVisibleTab(w.id, {format: 'png'}, function(url) {
    console.log(url);
  });
  alert('hello!');*/
});

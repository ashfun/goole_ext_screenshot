$("#black").on("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      color: "black"
    });
  });
});

$("#red").on("click", () => {
  //送れない！！
  // chrome.runtime.sendMessage({ color: "red" });

  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      color: "red"
    });
  });
});

$("#green").on("click", () => {
  //送れない！！
  // chrome.runtime.sendMessage({ color: "red" });

  chrome.tabs.captureVisibleTab(null, {}, function (imageURI) {
     //console.log(image); //the image variable is a base64 encoded image which you should be able to load in either canvas or src attribute of an image.
     var url = imageURI.replace(/^data:image\/[^;]/, 'data:application/octet-stream')
     window.open(url);
  });
});
//https://www.codepool.biz/chrome-extension-to-save-web-page-screenshots-to-local-disk.html

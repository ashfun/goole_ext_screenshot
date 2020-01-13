var cssBorderSet = {
  'yellow': 'solid 5px #ffd700',
  'red': 'solid 5px #dc143c',
  'blue': 'solid 5px #0000cd'
};
$("#focus_mode").on("click", () => {
  if (localStorage.getItem("border_color") != null) {
    borderColor = localStorage.getItem("border_color");
  } else {
    borderColor = 'yellow';
  }
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      type: "drawing",
      border_color: borderColor
    });
  });
  window.close();
});
$("#reset_mode").on("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      type: "reset"
    });
  });
  window.close();
});

$("#screenshot").on("click", () => {
  chrome.tabs.captureVisibleTab(null, {}, function (imageURI) {
     //console.log(image); //the image variable is a base64 encoded image which you should be able to load in either canvas or src attribute of an image.
     var url = imageURI.replace(/^data:image\/[^;]/, 'data:application/octet-stream')
     //window.open(url);
     chrome.downloads.download({
       url: url,
       filename: 'test.png'
     });
  });
});

var select = document.getElementById('border_color');
select.onchange = function()
{
  // 選択されているoption要素を取得する
  var selectedItem = this.options[ this.selectedIndex ];
  //alert( selectedItem.value );
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      type: "color_change",
      border_color: selectedItem.value,
    });
  });
  borderColor = selectedItem.value;
  localStorage.setItem("border_color", borderColor);
  $("#sample_drawing_target").css("border", cssBorderSet[borderColor]);
}
//https://www.codepool.biz/chrome-extension-to-save-web-page-screenshots-to-local-disk.html

$(function(){
  function initialSetup(){
    if (localStorage.getItem("border_color") != null) {
      $("#sample_drawing_target").css("border", cssBorderSet[localStorage.getItem("border_color")]);
      $("#border_color").val(localStorage.getItem("border_color"));
    }
    //$("#text").val(localStorage.getItem("text"));
  }
  initialSetup();
});

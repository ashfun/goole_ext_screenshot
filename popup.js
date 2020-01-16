var cssBorderSet = {
  yellow: "solid 5px #ffd700",
  red: "solid 5px #dc143c",
  blue: "solid 5px #0000cd"
};
$("#focus_mode").on("click", () => {
  if (localStorage.getItem("border_color") != null) {
    borderColor = localStorage.getItem("border_color");
  } else {
    borderColor = "yellow";
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
  chrome.tabs.captureVisibleTab(null, {}, function(imageURI) {
    var url = imageURI.replace(
      /^data:image\/[^;]/,
      "data:application/octet-stream"
    );
    var file_name = "screenshot";
    var date = new Date();
    var date_string = String(date.getTime());
    chrome.tabs.query({ active: true }, function(tab) {
      file_name = String(tab[0].url);
      file_name = file_name.toLowerCase();
      file_name = file_name.replace("/([a-z])+:///", "");
      file_name = file_name.substr(file_name.indexOf("://") + 3);
      file_name = file_name.replace(/[^a-z0-9]/g, "-");
      chrome.downloads.download({
        url: url,
        filename: file_name + date_string + ".png"
      });
    });
  });
});

var select = document.getElementById("border_color");
select.onchange = function() {
  var selectedItem = this.options[this.selectedIndex];
  borderColor = selectedItem.value;
  localStorage.setItem("border_color", borderColor);
  $("#sample_drawing_target").css("border", cssBorderSet[borderColor]);
};

$(function() {
  function initialSetup() {
    if (localStorage.getItem("border_color") != null) {
      $("#sample_drawing_target").css(
        "border",
        cssBorderSet[localStorage.getItem("border_color")]
      );
      $("#border_color").val(localStorage.getItem("border_color"));
    }
  }
  initialSetup();
});

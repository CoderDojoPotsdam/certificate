function updateInput(input) {
  updateImage();
  setCookie(input.id, input.value);
}


function waitForInput() {
  var inputs = document.getElementsByClassName("update");
  for (var i = 0; i < inputs.length; i += 1) {
    var input = inputs[i];
    var savedValue = getCookie(input.id);
    if (savedValue) {
      input.value = savedValue;
    }
    input.onkeyup = function(input){
      return function(){updateInput(input)}
    }(input);
  }
  updateImage();
}

window.addEventListener("load", waitForInput);

function updateImage() {
  var inputs = document.getElementsByClassName("update");
  var url = "coderdojocertificate.svg";
  var query = [];
  for (var i = 0; i < inputs.length; i += 1) {
    var input = inputs[i];
    var id = input.id;
    var text = input.value;
    if (text != "") {
      query.push(encodeURIComponent(id) + "=" + encodeURIComponent(text));
    }
  }
  if (query.length > 0) {
    url += "?" + query.join("&");
  }
  var preview = document.getElementById("preview");
  preview.src = url;
  var preview_link = document.getElementById("preview-link");
  preview_link.href = url;
}

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
  var query = [];
  for (var i = 0; i < inputs.length; i += 1) {
    var input = inputs[i];
    var id = input.id;
    var text = input.value;
    if (text != "") {
      query.push(encodeURIComponent(id) + "=" + encodeURIComponent(text));
    }
  }
  var query_string = "";
  if (query.length > 0) {
    query_string = "?" + query.join("&");
  }
  var preview = document.getElementById("preview");
  preview.src = "coderdojocertificate.svg" + query_string;
  var preview_links = document.getElementsByClassName("preview-link");
  for(var i = 0; i < preview_links.length; i += 1) {
    var preview_link = preview_links[i];
    preview_link.href = preview_link.attributes["src"].value + query_string;
  }
}

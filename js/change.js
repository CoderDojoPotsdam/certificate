
var ID_LOGO_BIG = "logo-big";
var ID_LOGO_SMALL = "logo-small";
var ID_TEXT_CERTIFICATE = "text-cert";
var ID_TEXT_NAME = "text-name";
var ID_TEXT_ACHIEVEMENT = "text-achieve";
var ID_TEXT_DIPLOMA = "text-diploma";
var ID_TEXT_CHAMPION = "text-champion";

function changeImage(id, url) {
  var image_tag = document.getElementById(id);
  image_tag.attributes["xlink:href"].value = url;
  image_tag.attributes["preserveAspectRatio"].value = "meet";
}

function changeText(id, text) {
  var split_text = text.split("\n");
  var element = document.getElementById(id);
  var last_child = null;
  var i;
  for (i = 0; i < element.childElementCount && i < split_text.length; i += 1) {
    var child = last_child = element.children[i];
    child.innerHTML = split_text[i];
  }
  for (; i < split_text.length; i += 1) {
    // use last input
    last_child.innerHTML += " " + split_text[i];
  }
  for (; i < element.childElementCount; i += 1) {
    // remove empty text
    var child = element.children[i];
    child.innerHTML = "";
  }
}


function updateFromQuery() {
  // from http://stackoverflow.com/a/1099670/1320237
  var qs = document.location.search;
  var tokens, re = /[?&]?([^=]+)=([^&]*)/g;
  qs = qs.split("+").join(" ");

  while (tokens = re.exec(qs)) {
    var id = decodeURIComponent(tokens[1]);
    var content = decodeURIComponent(tokens[2]);
    try {
      if (id.startsWith("text-")) {
        changeText(id, content);
      } else if (id.startsWith("logo")) {
        changeImage(id, content);
      }
    } catch(e) {
      alert(e);
    }
  }
}
window.onload = updateFromQuery;

// startsWith compatibility for internet explorer
if (!String.prototype.startsWith) {
  String.prototype.startsWith = function(other) {
    return this.substring(0, other.length) == other;
  }
}


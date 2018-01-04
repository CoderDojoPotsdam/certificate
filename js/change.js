
var ID_LOGO_BIG = "logo-big";
var ID_LOGO_SMALL = "logo-small";
var ID_TEXT_CERTIFICATE = "text-cert";
var ID_TEXT_NAME = "text-name";
var ID_TEXT_ACHIEVEMENT = "text-achieve";
var ID_TEXT_DIPLOMA = "text-diploma";
var ID_TEXT_CHAMPION = "text-champion";

var IDS = [ID_LOGO_BIG, ID_LOGO_SMALL, ID_TEXT_CERTIFICATE, ID_TEXT_NAME, ID_TEXT_ACHIEVEMENT, ID_TEXT_DIPLOMA, ID_TEXT_CHAMPION];

function changeImage(id, url) {
  var image_tag = document.getElementById(id);
  image_tag.attributes["xlink:href"].value = url;
  image_tag.attributes["preserveAspectRatio"].value = "xMidYMid meet"; // https://developer.mozilla.org/de/docs/Web/SVG/Attribute/preserveAspectRatio
  storeImageContentForPrinting(image_tag);
}

function storeImageContentForPrinting(image_tag) {
  var url = image_tag.attributes["xlink:href"].value;
  if (url.startsWith("data:")) { return; };
  httpGetAsync(url, function(data){
    if (url != image_tag.attributes["xlink:href"].value) {
      console.log("The image " + url + " changed.");
      return;
    }
    // see https://stackoverflow.com/a/27284736/1320237
    var blob = new Blob([data], {"type": "image/png"});
    var reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = function() {
      var base64data = reader.result;    
      image_tag.attributes["xlink:href"].value = base64data;
    }
  });
}

function httpGetAsync(theUrl, callback)
{
  // from https://stackoverflow.com/a/4033310/1320237
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.responseType = "arraybuffer";
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState == 4) {
      if (xmlHttp.status == 200) {
        callback(xmlHttp.response);
      } else {
        console.log("httpGetAsync: " + theUrl + " " + xmlHttp.status);
      }
    }
  }
  xmlHttp.open("GET", theUrl, true); // true for asynchronous
  xmlHttp.send(null);
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

function updateFromSpecification(specification) {
  for (var i = 0; i < IDS.length; i+= 1) {
    var id = IDS[i];
    try {
      var content = specification[id];
      if (content !== undefined) {
        if (id.startsWith("text-")) {
          changeText(id, content);
        } else if (id.startsWith("logo")) {
          changeImage(id, content);
        }
      }
    } catch(e) {
      alert(e);
      throw e;
    }
  }
}

function updateFromQuery() {
  // from http://stackoverflow.com/a/1099670/1320237
  var qs = document.location.search;
  var tokens, re = /[?&]?([^=]+)=([^&]*)/g;
  var specification = {};
  qs = qs.split("+").join(" ");
  
  while (tokens = re.exec(qs)) {
    var id = decodeURIComponent(tokens[1]);
    var content = decodeURIComponent(tokens[2]);
    specification[id] = content;
  }
  updateFromSpecification(specification);
}

window.onload = function () {
   updateFromQuery();
   storeImageContentForPrinting(document.getElementById(ID_LOGO_BIG));
   storeImageContentForPrinting(document.getElementById(ID_LOGO_SMALL));
}

// startsWith compatibility for internet explorer
if (!String.prototype.startsWith) {
  String.prototype.startsWith = function(other) {
    return this.substring(0, other.length) == other;
  }
}


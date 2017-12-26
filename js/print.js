/*
 * Print the documents.
 *
 * This requires https://printathpi.quelltext.eu/printathpi.js
 *
 */
 
function getCertificateFileName() {
  var now = new Date();
  var specification = generateSpecification();
  return (specification["text-diploma"] ? specification["text-diploma"] : "DIPLOMA") + " " +
         (specification["text-name"] ? specification["text-name"] : "???") + " " +
         now.getFullYear() + "-" + now.getMonth() + "-" + now.getDate() + " " + now.getHours() + "." + now.getMinutes() + "." + now.getSeconds() +
         ".svg";
}

function getCertificateContent() {
  var preview = document.getElementById("preview");
  var svg = preview.getSVGDocument();
  return svg.rootElement.outerHTML;
}

function printSVGCertificateAtHPI() {
  var name = getCertificateFileName();
  var content = getCertificateContent();
  function onPrint(e) {
    alert(e.target.responseText);
  }
  function onError(e) {
    if (e.target.status == 401) {
      alert("Wrong username or password.");
    } else {
      alert("Could not print.");
    }
  }
  var documents = {};
  documents[name] = content;
  PRINT_AT_HPI_ENDPOINT = "https://printathpi.quelltext.eu/print";
  printathpi(documents, null, null, onPrint, onError);
}

function removePrintAtHPIIfNotAvailable() {
  if (! window.printathpi) {
    var link = document.getElementById("printathpi-link");
    link.style.display = "none";
  }
}

window.addEventListener("load", removePrintAtHPIIfNotAvailable);


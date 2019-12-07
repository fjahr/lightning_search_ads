var readyStateCheckInterval = setInterval(function() {
if (document.readyState === "complete") {
  clearInterval(readyStateCheckInterval);

  console.log("Hello. This message was sent from scripts/inject.js");
  if (window.location.host == "duckduckgo.com") {
      var search = location.search.split("&")[0].substring(3).split("+").join(" ");
      console.log(search);
  }
}
}, 10);

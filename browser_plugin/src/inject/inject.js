chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
    clearInterval(readyStateCheckInterval);

    var search = location.search.split("&")[0].substring(3).split("+").join(" ");

    console.log("Hello. This message was sent from scripts/inject.js");
    console.log(search);

	}
	}, 10);
});

document.addEventListener('DOMContentLoaded', function() {
  chrome.storage.local.get("location", function(data) {
    if (data.location.includes("https://gist.github.com")) {
      document.getElementById('form').classList.toggle('hidden');
    } else if (data.location.includes("https://duckduckgo.com/?q=honey+badger+petting+in+berlin")) {
      document.getElementById('offer').classList.toggle('hidden');
    } else {
      document.getElementById('no-offer').classList.toggle('hidden');
    }
  });

  var formButton = document.getElementById('lightning-ad-form');
  formButton.addEventListener('click', function() {
    var url = "https://api.opennode.co/v2/withdrawals";
    var form = document.querySelector('form');
    var data = new FormData(form);

    var object = {};
    data.forEach((value, key) => {object[key] = value});
    var json = JSON.stringify(object);

    console.log(json);
    var req = new XMLHttpRequest();
    req.open("POST", url);
    req.setRequestHeader("Authorization", "SECRET");
    req.setRequestHeader("Content-Type", "application/json");
    req.send(json);
    console.log(req.response);
  })
}, false);


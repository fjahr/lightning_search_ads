document.addEventListener('DOMContentLoaded', function() {
  var formButton = document.getElementById('lightning-ad-form');
  formButton.addEventListener('click', function() {
    var url = "https://api.opennode.co/v2/withdrawals";
    var form = document.querySelector('form');
    var data = new FormData(form);
    var req = new XMLHttpRequest();
    req.open("POST", url);
    req.setRequestHeader("Authorization", "Foo");
    var response = req.send(data);
    console.log(response);

  })
}, false);

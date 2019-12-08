// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });


//example of using a message handler from the inject scripts
chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
  	chrome.pageAction.show(sender.tab.id);
    sendResponse();
  });

$("#lightning-ad-form").submit(function(event) {
  event.preventDefault();
  url = "https://api.opennode.co/v2/withdrawals";

  var posting = $.post(url, {
    address: $('#invoice').val(),
    type: "ln"
  });
  console.log("foo");

  posting.done(function( data ) {
    console.log(data);
    alert('success');
  });
});


var readyStateCheckInterval = setInterval(function() {
if (document.readyState === "complete") {
  clearInterval(readyStateCheckInterval);
  var search;

  if (window.location.host == "duckduckgo.com") {
    search = location.search.split("&")[0].substring(3).split("+").join(" ");
  }
  console.log(search);

  const digestHex = digestMessage(search).then((hash) => {
    console.log(hash);
  });

  // TODO: send hash to Ad Server, get back ads

  var ads = [
    {
      "url": "https://gist.github.com/fjahr/44a0881a6da4012fd19b7f09df4408a7",
      "text": "The first honey badger padding zoo in Berlin!",
      "sats": 100
    }
  ]

  if (ads.length > 0) {
    // Insert ads into duckduckgo page
    $("div#message").prepend("<div id='lnads'></div>")
    $("div#lnads").append("⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡")
    ads.forEach(function(ad) {
      $("div#lnads").append(
        "<p><a class='lightning-ad' href='" + ad.url + "'>" + ad.text + " (" + ad.sats + " sats for viewing)</a></p>"
      )
    })
    $("div#lnads").append("⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡")
  }

  // TODO: Add listeners to clicks on the ads
  // TODO: Add redeem functionality

}
}, 10);

async function digestMessage(message) {
  const msgUint8 = new TextEncoder().encode(message);                           // encode as (utf-8) Uint8Array
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);           // hash the message
  const hashArray = Array.from(new Uint8Array(hashBuffer));                     // convert buffer to byte array
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
  return hashHex;
}

// would set if secret is available on page
if (document.location.href.includes("gist")){
  chrome.storage.local.set({location: document.location.href});
} else {
  chrome.storage.local.set({location: ""});
}

var readyStateCheckInterval = setInterval(function() {
if (document.readyState === "complete") {
  clearInterval(readyStateCheckInterval);
  var search;

  if (window.location.host == "duckduckgo.com") {
    search = location.search.split("&")[0].substring(3).split("+").join(" ");
    var search_digest;
    console.log(search);
    sha256(search).then(function(digest) {
      console.log(digest)
      search_digest = digest;
    })

    // TODO: send hash to Ad Server, get back ads
    var ad_hash, ad_url, ad_sats, ad_text;
    var url = "https://api.opennode.co/v1/charges";
    $.ajax
    ({
      type: "GET",
      url: url,
      dataType: 'json',
      headers: {
        "Authorization": "SECRET"
      },
      success: function (data){
        chrome.storage.local.set({location: document.location.href});
        console.log("From API:");
        console.log(data);
        console.log(data["data"][0]["name"].split("|")[0]);
        ad_hash = data["data"][0]["name"].split("|")[0];

        if (ad_hash == search_digest) {
          ad_text = data["data"][0]["name"].split("|")[1];
          ad_url = data["data"][0]["name"].split("|")[2];
          ad_sats = data["data"][0]["amount"];

            // Insert ads into duckduckgo page
            $("div#message").prepend("<div id='lnads'></div>")
            $("div#lnads").append("⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡")
            $("div#lnads").append(
              "<p><a class='lightning-ad' target='_blank' href='" + ad_url + "'>" + ad_text + " (" + ad_sats + " sats for viewing)</a></p>"
            )
            $("div#lnads").append("⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡")
        }
      }
    });
  }

  // var ads = [
  //   {
  //     "url": "https://gist.github.com/fjahr/44a0881a6da4012fd19b7f09df4408a7",
  //     "text": "The first honey badger petting zoo in Berlin!",
  //     "sats": 100
  //   }
  // ]
  //
  // if (ads.length > 0) {
  //   // Insert ads into duckduckgo page
  //   $("div#message").prepend("<div id='lnads'></div>")
  //   $("div#lnads").append("⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡")
  //   ads.forEach(function(ad) {
  //     $("div#lnads").append(
  //       "<p><a class='lightning-ad' target='_blank' href='" + ad.url + "'>" + ad.text + " (" + ad.sats + " sats for viewing)</a></p>"
  //     )
  //   })
  //   $("div#lnads").append("⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡")
  // }
  //
  // TODO: Add listeners to clicks on the ads
}
}, 10);

function sha256(str) {
  // Get the string as arraybuffer.
  var buffer = new TextEncoder("utf-8").encode(str)
  return crypto.subtle.digest("SHA-256", buffer).then(function(hash) {
    return hex(hash)
  })
}

function hex(buffer) {
  var digest = ''
  var view = new DataView(buffer)
  for(var i = 0; i < view.byteLength; i += 4) {
    // We use getUint32 to reduce the number of iterations (notice the `i += 4`)
    var value = view.getUint32(i)
    // toString(16) will transform the integer into the corresponding hex string
    // but will remove any initial "0"
    var stringValue = value.toString(16)
    // One Uint32 element is 4 bytes or 8 hex chars (it would also work with 4
    // chars for Uint16 and 2 chars for Uint8)
    var padding = '00000000'
    var paddedValue = (padding + stringValue).slice(-padding.length)
    digest += paddedValue
  }

  return digest
}


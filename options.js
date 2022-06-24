// options.js
// Author: Vlad Usatii @ gemcoin

// Saving keys
function saveKeys() {
   // cancel form submit
   event.preventDefault();

   // save the inputs that we asked for
   var rawPrivKey = document.getElementById("privKey");
   var rawPubKey  = document.getElementById("pubKey");

   privKey = rawPrivKey.value
   pubKey  = rawPubKey.value

   chrome.storage.local.set({'privKey': privKey});
   console.log("Private key is set to " + privKey);

   chrome.storage.local.set({'pubKey': pubKey});
   console.log("Public key is set to " + pubKey);

   console.log("NOTE: Keep in mind that Gemcoin does not internally verify that your entered keys are correct. Make sure that they are valid pairs. Gemcoin does NOT encrypt data, so use at your own risk.")
}

// remove keys --> catch all errors
function removeKeys() {
   // cancel form submit
   event.preventDefault();
   chrome.storage.local.remove(["privKey","pubKey"], console.log("Removed keys."));
}

// listen for user clicks on saveKeys or removeKeys
window.addEventListener('load', function(evt) {
   document.getElementById('keys').addEventListener('submit', saveKeys);
   document.getElementById('removeKeyList').addEventListener('submit', removeKeys);
});

/*
function logStorage() {
    if(chrome.storage) {
        chrome.storage.local.get(function(data){
            console.log("chrome.storage.local:");
            if(chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError);
            } else {
                console.log(data);
            }
            chrome.storage.sync.get(function(data){
                console.log("chrome.storage.sync:");
                if(chrome.runtime.lastError) {
                    console.error(chrome.runtime.lastError);
                } else {
                    console.log(data);
                }
            });
        });
    } else {
        console.warn("chrome.storage is not accessible, check permissions");
    }
} */

// popup.js
// Author: Vlad Usatii @ gemcoin

// Editing title and description through DOM
let title = document.getElementById("page-title");
let description = document.getElementById("page-description");

title.style.fontWeight = "500";
title.style.fontSize = "x-large";
title.style.fontFamily = "Andale Mono, sans-serif";

description.style.fontWeight = "200";
description.style.fontSize = "small";
description.style.fontFamily = "Andale Mono, sans-serif";

// alert function
function alertUserToSetKeys() {
   // if not then set it
   let warning = document.createElement('div');
   warning.setAttribute(‘id’,‘warning’);

   div.innerHTML = '<p> You must first add your key to Gemcoin\'s extension. To do this, right click on the app and click \'options\'.</p>';
}

// starts app after checking if user has a private key and a public key
function startApp() {
   console.log("You have set keys.")
}

function checkKeys() {
   // Check if user has entered keys in 'options'
   chrome.storage.sync.get('privKey', function(data) {
      if (typeof data.links === 'undefined') {
         // if already set it then check for pubKey
         chrome.storage.sync.get('pubKey', function(data) {
            if (typeof data.links === 'undefined') {
               startApp();
            } else {
               // if not set then set it
               alertUserToSetKeys();
            }
         });
      } else {
          alertUserToSetKeys();
      }
   });
}

// check for keys onPageLoad
document.addEventListener("DOMContentLoaded", function() { checkKeys(); }, false);

// Init button with user's preferred color
let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", ({ color }) => {
   changeColor.style.backgroundColor = color;
});

// when button clicked, inject setPageBackgroundColor into page
changeColor.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPageBackgroundColor,
  });
});

// bgColor content script
function setPageBackgroundColor() {
  chrome.storage.sync.get("color", ({ color }) => {
    document.body.style.backgroundColor = color;
  });
}

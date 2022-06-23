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
   let warning = document.getElementById("warning");
   warning.style.display = "block";
}

// Init button with user's preferred color
let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", ({ color }) => {
   changeColor.style.backgroundColor = color;
});

/*  // when button clicked, inject setPageBackgroundColor into page
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
} */

let privKey = document.getElementById("privateKeyHere");
let pubKey = document.getElementById("publicKeyHere");

// check if private key exists
if (chrome.storage) {

   chrome.storage.local.get(function(data) {
      if (chrome.runtime.lastError) {
         console.error(chrome.runtime.lastError);
      } else {
         if (('privKey' in data) && ('pubKey' in data)) {
            privKey.innerHTML = data['privKey'];
            pubKey.innerHTML = data['pubKey'];

            let mainArea = document.getElementById("mainArea");
            mainArea.style.display = "block";

         } else { alertUserToSetKeys(); console.log("Make keys."); }
      }
   });

} else { console.warn("chrome.storage is not available -- change permissions."); }

// listen for submit of reload page
const reloadBtn = document.getElementById("reload");

reloadBtn.addEventListener("click", async () => {
   let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
   chrome.scripting.executeScript({target: { tabId: tab.id }, function: chrome.runtime.reload() });
});

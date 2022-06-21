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

   chrome.storage.sync.set({'privKey': privKey}, function() {
      console.log("Private key is set to " + privKey);
   });

   chrome.storage.sync.set({'pubKey': pubKey}, function() {
      console.log("Public key is set to " + pubKey);
   });

   console.log("NOTE: Keep in mind that Gemcoin does not internally verify that your entered keys are correct. Make sure that they are valid pairs. Gemcoin does NOT encrypt data, so use at your own risk.")
}

window.addEventListener('load', function(evt) {
   document.getElementById('keys').addEventListener('submit', saveKeys);
});

/*

// Changing color (lol)

let page = document.getElementById('buttonDiv');
let selectedClassName = 'current';
const presetButtonColors = ["#3aa757", "#e8453c", "#f9bb2d", "#4688f1"];

// Reacts to a button click
function handleButtonClick(event) {
   // Remove styling
   let current = event.target.parentElement.querySelector(`.${selectedClassName}`);
   if (current && current !== event.target) { current.classList.remove(selectedClassName); }

   // Mark as selected
   let color = event.target.dataset.color;
   event.target.classList.add(selectedClassName);
   chrome.storage.sync.set({ color });
}

// Add a button to the page for each supplied color
function constructOptions(buttonColors) {
  chrome.storage.sync.get("color", (data) => {
    let currentColor = data.color;
    // For each color we were provided…
    for (let buttonColor of buttonColors) {
      // …create a button with that color…
      let button = document.createElement("button");
      button.dataset.color = buttonColor;
      button.style.backgroundColor = buttonColor;

      // …mark the currently selected color…
      if (buttonColor === currentColor) {
        button.classList.add(selectedClassName);
      }

      // …and register a listener for when that button is clicked
      button.addEventListener("click", handleButtonClick);
      page.appendChild(button);
    }
  });
}

// Init
constructOptions(presetButtonColors);

*/

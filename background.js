// background.js
// Author: Vlad Usatii @ gemcoin

let color = '#CAD9E0';

chrome.runtime.onInstalled.addListener(() => {
   chrome.storage.sync.set({ color });
   console.log('Background color saved to %s', color);
});

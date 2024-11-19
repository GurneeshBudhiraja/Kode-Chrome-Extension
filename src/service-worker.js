import {
  getLocalStorage,
  setLocalStorage,
  hintTemplate,
} from './utils/utils.js';

// getting the focus mode in the local storage
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // message from the password.js to notify background.js to know the user has entered the right password to access the history tab.
  console.log(request);
  if (request.type === 'getFocusMode') {
    getLocalStorage({ param: 'isFocusMode' }).then((focusMode) => {
      sendResponse(focusMode);
    });
  } else if (request.type === 'getHints') {
    // will get the hints from the local storage
  }
  return true;
});

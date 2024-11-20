import {
  getLocalStorage,
  setLocalStorage,
  hintTemplate,
  getCurrentTab,
} from './utils/utils.js';

const DAY_IN_MS = 86400000;

// getting the focus mode in the local storage
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // TODO: remove in production
  console.log(request);
  // message from the password.js to notify background.js to know the user has entered the right password to access the history tab.
  if (request.type === 'getFocusMode') {
    getLocalStorage({ param: 'isFocusMode' }).then((focusMode) => {
      sendResponse(focusMode);
    });
  } else if (request.type === 'getHints') {
    // will get the hints from the local storage
    const { quesName } = request;
    console.log(`quesName is ${quesName}`);
    getLocalStorage({ param: quesName }).then((hintResponse) => {
      if (
        !Object.keys(hintResponse).length ||
        hintResponse[quesName].lastUpdated - Date.now() >= DAY_IN_MS
      ) {
        const hintTemplateResponse = hintTemplate(quesName, Date.now());
        setLocalStorage(hintTemplateResponse);
        sendResponse(hintTemplateResponse);
      } else {
        sendResponse(hintResponse);
      }
    });
  } else if (request.type === 'getCurrentTab') {
    getCurrentTab().then((tab) => sendResponse(tab));
  }
  return true;
});

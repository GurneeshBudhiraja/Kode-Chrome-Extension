import {
  getLocalStorage,
  setLocalStorage,
  getCurrentTab,
  HintTemplate,
} from './utils/utils.js';

// Allows users to open the side panel by clicking on the action toolbar icon
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request);

  if (request.type === 'getFocusMode') {
    // Gets the focus mode from the local storage
    getLocalStorage({ param: 'isFocusMode' }).then((focusMode) => {
      sendResponse(focusMode);
    });
  } else if (request.type === 'getCurrentURL') {
    // Gets the current tab info of the user
    getCurrentTab().then((tab) => sendResponse(tab));
  } else if (request.type === 'resetHints') {
    // reset hints from the local storage

    const { questionName } = request;
    const newQuestionName = `totalHints${questionName}`;

    // Removes the hints object from the local storage
    chrome.storage.sync.remove(questionName);

    // Removes the hints count from the local storage
    chrome.storage.sync.remove(newQuestionName);
    sendResponse({ success: true });
  } else if (request.type === 'getPreferredLanguage') {
    // Gets the preferred coding language from the local storage

    getLocalStorage({ param: 'language' }).then((respone) => {
      if (!Object.keys(respone).length) {
        sendResponse({ language: false });
      }
      sendResponse(respone);
    });
  }
  return true;
});

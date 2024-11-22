import {
  getLocalStorage,
  setLocalStorage,
  hintTemplate,
  getCurrentTab,
} from './utils/utils.js';

// getting the focus mode in the local storage
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // TODO: remove in production
  console.log(request);
  // message from the password.js to notify background.js to know the user has entered the right password to access the history tab.
  if (request.type === 'getFocusMode') {
    // get the focus mode from the local storage
    getLocalStorage({ param: 'isFocusMode' }).then((focusMode) => {
      sendResponse(focusMode);
    });
  } else if (request.type === 'getHints') {
    // get hints from the local storage
    // will get the hints from the local storage
    const { quesName } = request;
    getLocalStorage({ param: quesName }).then((hintResponse) => {
      if (!Object.keys(hintResponse).length) {
        const hintTemplateResponse = hintTemplate(quesName);
        sendResponse(hintTemplateResponse);
      } else {
        sendResponse(hintResponse);
      }
    });
  } else if (request.type === 'updateHint') {
    // update hints in the local storage
    console.log('service worker update hint');
    console.log(request);
    const hintTemplateResponse = hintTemplate(request.quesName, request.hints);
    console.log(hintTemplateResponse);
    setLocalStorage(hintTemplateResponse);
    sendResponse('');
  } else if (request.type === 'getCurrentURL') {
    // Gets the current tab info of the user
    getCurrentTab().then((tab) => sendResponse(tab));
  } else if (request.type === 'getTotalHints') {
    // get total hints number from the local storage

    const { questionName } = request;

    // creating a new key using the question name
    const newQuestionName = `totalHints${questionName}`;

    getLocalStorage({ param: newQuestionName }).then((totalHints) => {
      // Checking for an empty object
      if (!Object.keys(totalHints).length) {
        sendResponse({ totalHints: null });
      } else {
        sendResponse(totalHints);
      }
    });
  } else if (request.type === 'resetHints') {
    // reset hints from the local storage

    const { questionName } = request;
    const newQuestionName = `totalHints${questionName}`;

    // Removing the stored hints from the local storage
    chrome.storage.sync.remove(questionName);

    // Removing the total hints from the local storage
    chrome.storage.sync.remove(newQuestionName);
    sendResponse({ success: true });
  }
  return true;
});

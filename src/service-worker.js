import {
  getLocalStorage,
  setLocalStorage,
  getCurrentTab,
  HintTemplate,
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
    // Get hints from the local storage
    const { questionName } = request;

    getLocalStorage({ param: questionName }).then((hintResponse) => {
      if (!Object.keys(hintResponse).length) {
        // Returns the new hint template
        const hintTemplateResponse = new HintTemplate(questionName);
        sendResponse(hintTemplateResponse);
      } else {
        sendResponse(hintResponse);
      }
    });
  } else if (request.type === 'updateHint') {
    // update hints in the local storage
    const hintTemplateResponse = new HintTemplate(
      request.questionName,
      request.hints
    );
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

import {
  getLocalStorage,
  setLocalStorage,
  getCurrentTab,
  HintTemplate,
} from './utils/utils.js';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request);

  if (request.type === 'getFocusMode') {
    // Gets the focus mode from the local storage
    getLocalStorage({ param: 'isFocusMode' }).then((focusMode) => {
      sendResponse(focusMode);
    });
  } else if (request.type === 'getHints') {
    // Get hints from the local storage
    const { questionName } = request;

    getLocalStorage({ param: questionName }).then((hintResponse) => {
      // Checks for the empty object
      if (!Object.keys(hintResponse).length) {
        // Returns the new hint template
        const hintTemplateResponse = new HintTemplate(questionName);
        sendResponse(hintTemplateResponse);
      } else {
        // Returns the existing hints fetched from the local storage
        sendResponse(hintResponse);
      }
    });
  } else if (request.type === 'updateHint') {
    // Update hints object in the local storage

    // Generates a new HintTemplate based on the existing hints
    const hintTemplateResponse = new HintTemplate(
      request.questionName,
      request.hints
    );

    // Updates the local storage with the new HintTemplate
    setLocalStorage(hintTemplateResponse);

    sendResponse('');
  } else if (request.type === 'getCurrentURL') {
    // Gets the current tab info of the user
    getCurrentTab().then((tab) => sendResponse(tab));
  } else if (request.type === 'getTotalHints') {
    // Gets hints count from the local storage

    const { questionName } = request;

    // Creates a new key using the question name(questionName)
    const newQuestionName = `totalHints${questionName}`;

    getLocalStorage({ param: newQuestionName }).then((totalHints) => {
      // Checks for an empty object
      if (!Object.keys(totalHints).length) {
        // Returns the total hints as null
        sendResponse({ totalHints: null });
      } else {
        // Returns the hints count from the local storage
        sendResponse(totalHints);
      }
    });
  } else if (request.type === 'resetHints') {
    // reset hints from the local storage

    const { questionName } = request;
    const newQuestionName = `totalHints${questionName}`;

    // Removes the hints object from the local storage
    chrome.storage.sync.remove(questionName);

    // Removes the hints count from the local storage
    chrome.storage.sync.remove(newQuestionName);
    sendResponse({ success: true });
  }
  return true;
});

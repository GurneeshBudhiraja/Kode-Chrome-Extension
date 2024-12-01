import {
  getLocalStorage,
  setLocalStorage,
  getCurrentTab,
  HintTemplate,
} from './utils/utils.js';

let monitorUser = null;
let tabDetails = null;
let monitorUserTimeoutID = null;

// side panel
(() => {
  // Sets the index.html for the sidePanel
  chrome.sidePanel.setOptions({ path: '../index.html' });
  // Allows the sidePanel to open on the click of the extension's icon
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
})();

// starts monitoring the urls as soon as the extension loads if the focus mode is true
(async () => {
  const { isFocusMode } = await getLocalStorage({ param: 'isFocusMode' });
  if (isFocusMode) {
    monitorUser = true;
  }
})();

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
  } else if (request.type === 'getCurrentURL') {
    // Gets the current tab info of the user
    getCurrentTab().then((tab) => sendResponse(tab));
  } else if (request.type === 'getPreferredLanguage') {
    // Gets the preferred coding language from the local storage

    getLocalStorage({ param: 'language' }).then((respone) => {
      if (!Object.keys(respone).length) {
        sendResponse({ language: false });
      }
      sendResponse(respone);
    });
  } else if (request.type === 'getNotes') {
    getLocalStorage({ param: 'notes' })
      .then((notesResponse) => {
        if (!Object.keys(notesResponse).length) {
          sendResponse({ notes: [] });
        } else {
          sendResponse(notesResponse);
        }
      })
      .catch(() => {
        console.log('Failed to get notes from the local storage');
      });
  } else if (request.type === 'monitorUser') {
    if (!monitorUser) {
      monitorUser = true;
    }
  } else if (request.type === 'unmonitorUser') {
    if (monitorUser) {
      monitorUser = false;
    }
  } else if (request.type === 'updateFocusMode') {
    if (request.value === false) {
      console.log('request.value is false'); // TODO: remove this in production
      monitorUser = false;
      clearTimeout(monitorUserTimeoutID);
    }
    setLocalStorage({ isFocusMode: request.value });
  }
  return true;
});

chrome.tabs.onUpdated.addListener((tabId) => {
  chrome.tabs.get(tabId, (tabInfo) => {
    tabDetails = tabInfo;
    if (monitorUser) {
      trackUser(tabDetails);
    }
  });
});

chrome.tabs.onActivated.addListener(({ tabId }) => {
  chrome.tabs.get(tabId, (tabInfo) => {
    tabDetails = tabInfo;
    if (monitorUser) {
      trackUser(tabDetails);
    }
  });
});

let trackUserTimeoutID = null;
let trackUserAiSession = null;

const trackUser = async (tabDetails) => {
  const { url } = tabDetails;
  if (!trackUserAiSession || trackUserAiSession?.tokensLeft < 50) {
    trackUserAiSession = await self.ai.languageModel.create({
      systemPrompt:
        'Your job is to identify by looking at the url of a website or the title and description of the youtube video to tell in JSON response whether this website or video is related to the following: leetcode problem, DSA, coding, programming or anything related to technology. The main goal of the user to focus on leetcode problems. So all the websites that does not contribute to leetcode problems should be considered as invalid. I will also have to show the user a message about reminding how this website is not related and the user should go back to the leetcode problem. The friendly message you would generate to inform the user how this is not relevant would be not longer than 1 sentence. Keep it short and you are free to include a small quote. The response would be in the following JSON format: "{"relevant":"false","userMessage":"some positive message reminding the user"}" or something like this too "{"relevant":"true","userMessage":""(no message is required as the relevant is true)}". If the relevant is false, inform the user with a one line message that this is not relevant with a small one line positive quote. Be playful with this like did you like your x minutes break how about hitting some more leetcode questions something like this. One thing to keep in mind is to keep the userMessage as empty string when the relevant is true',
    });
  }
  clearTimeout(trackUserTimeoutID);
  trackUserTimeoutID = setTimeout(async () => {
    console.log(url);
    console.log(tabDetails);
    if (url.includes('https://www.youtube.com/watch?v=')) {
      const { id } = tabDetails;
      const youtubeInfo = await chrome.tabs.sendMessage(id, {
        type: 'getYoutubeVideoInfo',
      });
      const { response: title } = youtubeInfo;
      const aiResponse = await trackUserAiSession.prompt(
        `Tell whether this youtube video aligns with the mentioned goals ${title} in the format that you are supposed to answer.`
      );
      console.log(aiResponse);
    } else {
      const aiResponse = await trackUserAiSession.prompt(`${url}`);
      console.log(aiResponse);
    }
  }, 1000);
};

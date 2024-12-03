import {
  addLanguageDropdown,
  createTranslator,
} from './utils/contentScript.utils';

console.log('Content.js');

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  console.log('Message is: ');
  console.log(message);
  if (message.type === 'getQuestionDescription') {
    const questionDescription = document.querySelector(
      '[data-track-load="description_content"]'
    )?.textContent;
    sendResponse({ questionDescription });
  } else if (message.type === 'getUserCode') {
    const nodeList = document.querySelectorAll('.view-line');

    const formattedText = Array.from(nodeList)
      .map((node) => node.textContent.trim())
      .filter((text) => text !== '')
      .join('\n');

    console.log(formattedText); // TODO: remove in production
    sendResponse({ response: formattedText });
  } else if (message.type === 'customizeGeminiPage') {
    console.log('working');
    setTimeout(() => {
      const element = document.querySelector("[data-placeholder='Ask Gemini']");
      if (element) {
        element.innerText = `The user is trying to do this leetcode question: ${message.questionName} and the this is the code the user has written as of now: 
        
        ${message.userCode}
        
        Find the potential mistakes in the code, point them out also provide with the solution. If the code written by the user is alright and if the better solution is available provide the user with the optimized or better solution`;

        setTimeout(() => {
          const [button] = document.querySelectorAll('.send-button');
          if (button) button.click();
        }, 1000);
      }
    }, 2000);
  } else if (message.type === 'getYoutubeVideoInfo') {
    const title = document
      .querySelector('#above-the-fold')
      .querySelector('#title').innerText;
    sendResponse({ response: title });
  }
});

// Variables for the select dropdown
let languageDropdown = null;
let supportedLanguages = ['hi', 'es', 'ja'];
let prevURL = undefined;
let EnglishQuestionDescription = undefined;

(() => {
  try {
    let currentURL = window.location.href;
    if (currentURL.startsWith('https://leetcode.com/problems/')) {
      languageDropdown = addLanguageDropdown();

      languageDropdown.addEventListener('change', async () => {
        currentURL = window.location.href;
        // If no leetcode problem url has been visited
        if (!prevURL) {
          prevURL = currentURL;
          EnglishQuestionDescription = undefined;
        } else if (
          // Checks the similarity of the leetcode question
          prevURL.split('https://leetcode.com/problems/')[1].split('/')[0] !==
          currentURL.split('https://leetcode.com/problems/')[1].split('/')[0]
        ) {
          EnglishQuestionDescription = undefined;
        }

        // Language selected by the user
        const selectedLanguage = languageDropdown.value;

        if (!supportedLanguages.includes(selectedLanguage)) {
          console.log('Unsupported language: ' + selectedLanguage);
          return;
        }

        const { translatorSession } = await createTranslator(selectedLanguage);

        // Gets the english version of the leetcode question
        if (EnglishQuestionDescription === undefined) {
          // Getting the current description on the leetcode question
          EnglishQuestionDescription = document.querySelector(
            '[data-track-load="description_content"]'
          )?.textContent;
        }

        const translatedText = await translatorSession?.translate(
          EnglishQuestionDescription
        );

        // Updating the leetcode question description
        document.querySelector(
          '[data-track-load="description_content"]'
        ).textContent = translatedText;
      });
    }
  } catch (error) {
    console.log('Error in language dropdown(contentScript.js): ', error);
  }
})();

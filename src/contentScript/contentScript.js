import {
  addLanguageDropdown,
  createTranslator,
} from './utils/contentScript.utils';

console.log('Content.js');

// Variables for the select dropdown
let isElementAdded = false;
let languageDropdown = undefined;
let supportedLanguages = ['hi', 'es', 'ja'];
let EnglishQuestionDescription = undefined;
let currentQuestion = undefined;
let prevQuestion = undefined;

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  // TODO: remvoe in prod
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
  } else if (message.type === 'resetSelectElement') {
    const { url } = message;
    // Extracts the leetcode question the user is on
    currentQuestion = url
      .split('https://leetcode.com/problems/')[1]
      ?.split('/')[0];
    if (!prevQuestion) {
      prevQuestion = currentQuestion;
    } else if (languageDropdown && prevQuestion !== currentQuestion) {
      document.querySelector('.content-language-selector').remove();
      EnglishQuestionDescription = undefined;
      prevQuestion = currentQuestion;
      isElementAdded = false;
    }
    if (!isElementAdded) {
      console.log('Adding dropdown');
      languageDropdown = addLanguageDropdown();
      isElementAdded = true;
      selectDropdown();
    }
  } else if (message.type === 'showAlert') {
    const { alert } = message;
    console.log('Showing alert');
    console.log(alert);
    showAlert(alert);
  }
});

const selectDropdown = () => {
  try {
    languageDropdown.addEventListener('change', async () => {
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
  } catch (error) {
    console.log('Error in language dropdown(contentScript.js): ', error);
  }
};

// adds the bootstrap cdns to the head of the document
const showAlert = (alert = '') => {
  // Adding tailwind css cdn
  const linkEle = document.createElement('link');
  linkEle.href =
    'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css';
  linkEle.rel = 'stylesheet';
  document.head.append(linkEle);

  // Create a popup element
  const popup = document.createElement('div');
  popup.classList.add(
    'fixed',
    'bottom-5',
    'right-5',
    'w-[38rem]',
    'p-4',
    'bg-white',
    'shadow-lg',
    'rounded-lg',
    'transition-all',
    'duration-300',
    'ease-in-out',
    'transform',
    'translate-y-20',
    'opacity-0'
  );

  // Add inner content
  popup.innerHTML = `
  <div class="flex justify-between items-center">
    <div class="text-gray-800 text-lg">
      ${alert}
    </div>
    <button id="closePopup" class="ml-4 text-gray-500 hover:text-gray-800">
      ✖
    </button>
  </div>
`;

  // Append the popup to the body
  document.body.appendChild(popup);

  // Function to show the popup with animation
  setTimeout(() => {
    popup.classList.remove('translate-y-20', 'opacity-0');
    popup.classList.add('translate-y-0', 'opacity-100');
  }, 100); // Delay to allow DOM rendering

  let closeTimeout = undefined;
  // Close button functionality
  const closeButton = document.getElementById('closePopup');
  closeButton.addEventListener('click', () => {
    clearTimeout(closeTimeout);
    popup.classList.add('translate-y-20', 'opacity-0'); // Add exit animation
    closeTimeout = setTimeout(() => {
      popup.remove(); // Remove popup after animation
    }, 300); // Match with animation duration
  });

  clearTimeout(closeTimeout);
  closeTimeout = setTimeout(() => {
    closeTimeout = setTimeout(() => {
      popup.classList.add('translate-y-20', 'opacity-0'); // Add exit animation
      popup.remove(); // Remove popup after animation
    }, 300); // Match with animation duration
  }, 5000);
};

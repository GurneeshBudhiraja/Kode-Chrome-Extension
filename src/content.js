import { getUserCode } from './utils/utils.js';
console.log('Content.js');

// content-script.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Message received from service worker:', message);

  // Handle the message
  if (message.type === 'getUserCode') {
    setTimeout(() => {
      const userCode = getUserCode();
      sendResponse({ userCode: userCode });
    }, 1000);
  }

  // Indicates you will send a response asynchronously (if needed).
  return true;
});

const ele = document.querySelector(
  '.flexlayout__tabset_tabbar_inner_tab_container_top'
);
console.log('ELEMENT IS : ');
console.log(ele);

const newElement = document.createElement('div');
newElement.textContent = 'Notes';
newElement.style.color = 'red';
newElement.style.fontSize = '20px';
newElement.style.zIndex = '100';
newElement.addEventListener('mousedown', () => {
  console.log('Notes Clicked');
});

ele.appendChild(newElement);
console.log(
  document.querySelector('.flexlayout__tabset_tabbar_inner_tab_container_top')
);

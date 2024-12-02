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

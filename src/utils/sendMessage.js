function sendMessage(messageObject) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(messageObject, (response) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(response);
      }
    });
  });
}

export default sendMessage;

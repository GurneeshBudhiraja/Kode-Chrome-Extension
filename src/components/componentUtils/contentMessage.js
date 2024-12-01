const sendContentMessage = (obj) => {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const activeTab = tabs[0]; // Get the active tab
      if (activeTab && activeTab.id) {
        // Send a message to the content script
        chrome.tabs.sendMessage(activeTab.id, obj, function (response) {
          resolve(response);
        });
      } else {
        console.log('No active tab found.');
        reject({ response: null });
      }
    });
  });
};

export default sendContentMessage;

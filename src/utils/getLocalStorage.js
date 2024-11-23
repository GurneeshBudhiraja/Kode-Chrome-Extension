function getLocalStorage({ param }) {
  return new Promise((resolve) => {
    chrome.storage.sync.get([param], (result) => {
      resolve(result);
    });
  });
}

export default getLocalStorage;

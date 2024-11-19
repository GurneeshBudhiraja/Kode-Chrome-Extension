function setLocalStorage(obj) {
  chrome.storage.sync.set(obj).then(() => {
    // TODO: remove in production
    console.log(obj);
    console.log(`${obj} added to local storage`);
  });
  return;
}

export default setLocalStorage;

function setLocalStorage(obj) {
  chrome.storage.sync.set(obj).then(() => {
    // TODO: remove in production
    console.log("set local storage : ")
    console.log(obj);
    
  });
  return;
}

export default setLocalStorage;

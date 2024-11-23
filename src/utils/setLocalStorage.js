function setLocalStorage(obj) {
  chrome.storage.sync.set(obj).then(() => {
    console.log('Set local storage : ');
    console.log(obj);
  });
  return;
}

export default setLocalStorage;

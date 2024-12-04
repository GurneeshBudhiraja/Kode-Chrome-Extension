function setLocalStorage(obj) {
  console.log('setLocalStorage');
  console.log(obj);
  chrome.storage.sync
    .set(obj)
    .then(() => {
      console.log('Set local storage : ');
      console.log(obj);
    })
    .catch(() => console.log('Failed to set local storage'));
  return;
}

export default setLocalStorage;

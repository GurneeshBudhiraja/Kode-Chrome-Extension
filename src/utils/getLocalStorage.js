export default function getLocalStorage({ param }) {
  // TODO: remove this in production
  console.log(param);
  return new Promise((resolve) => {
    chrome.storage.sync.get([param], (result) => {
      resolve(result);
    });
  });
}

import Switch from '@mui/material/Switch';
import { useState, useEffect } from 'react';
import { setLocalStorage } from '../utils/utils.js';

function SwitchButton() {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // fetch the status of the focus mode from the local storage
    fetchFocusMode();
  }, []);

  async function fetchFocusMode() {
    chrome.runtime.sendMessage({ type: 'getFocusMode' }, (response) => {
      if (chrome.runtime.lastError) {
        console.error('Error sending message:', chrome.runtime.lastError); // TODO: Remove in production
        setChecked(false);
        return;
      }
      console.log(response); // TODO: Remove in production
      setChecked(response?.isFocusMode ?? false);
    });
  }

  return (
    <Switch
      checked={checked}
      onChange={() => {
        setLocalStorage({ isFocusMode: !checked });
        setChecked(!checked);
      }}
      sx={{
        '& .MuiSwitch-track': {
          backgroundColor: 'gray',
        },
      }}
    />
  );
}

export default SwitchButton;

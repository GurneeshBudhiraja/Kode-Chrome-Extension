import { useState, useEffect } from 'react';
import { setLocalStorage, sendMessage } from '../utils/utils.js';
import Switch from '@mui/material/Switch';

function SwitchButton() {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // fetch the status of the focus mode from the local storage
    fetchFocusMode();
  }, []);

  // Message to service-worker for the status of the focus mode
  const fetchFocusMode = async () => {
    sendMessage({ type: 'getFocusMode' })
      .then((focusModeResponse) => {
        setChecked(focusModeResponse?.isFocusMode ?? false);
      })
      .catch((error) => console.log('Failed to fetch focus mode:', error));
  };

  return (
    <Switch
      checked={checked}
      onChange={() => {
        setLocalStorage({ isFocusMode: !checked });
        setChecked(!checked);
      }}
      // Change the background color of the switch to gray
      sx={{
        '& .MuiSwitch-track': {
          backgroundColor: 'gray',
        },
      }}
    />
  );
}

export default SwitchButton;

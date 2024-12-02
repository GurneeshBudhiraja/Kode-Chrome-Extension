import { useState, useEffect } from 'react';
import { sendMessage } from '../utils/utils.js';
import Switch from '@mui/material/Switch';

function SwitchButton() {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // Fetch the status of the focus mode from the local storage
    fetchFocusMode();
    if (checked) {
      sendMessage({ type: 'monitorUser' });
    } else {
      sendMessage({ type: 'unmonitorUser' });
    }
  }, [checked, setChecked]);

  // Message to service-worker for the status of the focus mode
  const fetchFocusMode = async () => {
    try {
      const focusModeResponse = await sendMessage({ type: 'getFocusMode' });
      setChecked(focusModeResponse?.isFocusMode ?? false);
    } catch (error) {
      console.log('Failed to fetch focus mode:', error);
    }
  };

  const switchChanged = async () => {
    try {
      // Sends message to the service-worker to update the value of the focus mode in the local storage
      setChecked(!checked);
      await sendMessage({
        type: 'updateFocusMode',
        value: !checked,
      });
    } catch (error) {
      console.log('Failed to update the focus mode: ', error);
    }
  };

  return (
    // Switch component with gray background color
    <>
      <Switch
        checked={checked}
        onChange={switchChanged}
        // Gray background color of the switch
        sx={{
          '& .MuiSwitch-track': {
            backgroundColor: 'gray',
          },
        }}
      />
    </>
  );
}

export default SwitchButton;

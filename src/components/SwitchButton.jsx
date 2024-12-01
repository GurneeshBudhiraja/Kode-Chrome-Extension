import { useState, useEffect } from 'react';
import { sendMessage } from '../utils/utils.js';
import Switch from '@mui/material/Switch';

function SwitchButton() {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // fetch the status of the focus mode from the local storage
    fetchFocusMode();
    if (checked) {
      console.log('monitoring user');
      sendMessage({ type: 'monitorUser' });
    } else {
      console.log('unmonitoring user');
      sendMessage({ type: 'unmonitorUser' });
    }
  }, [checked]);

  // Message to service-worker for the status of the focus mode
  const fetchFocusMode = async () => {
    try {
      const focusModeResponse = await sendMessage({ type: 'getFocusMode' });
      setChecked(focusModeResponse?.isFocusMode ?? false);
    } catch (error) {
      console.log('Failed to fetch focus mode:', error);
    }
  };

  return (
    <Switch
      checked={checked}
      onChange={async () => {
        try {
          setChecked(!checked);
          await sendMessage({
            type: 'updateFocusMode',
            value: !checked,
          });
        } catch (error) {
          console.log('Failed to update the focus mode: ', error);
        }
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

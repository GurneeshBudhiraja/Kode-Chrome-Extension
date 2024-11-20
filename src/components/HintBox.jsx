import LightbulbIcon from '@mui/icons-material/Lightbulb';
import LockIcon from '@mui/icons-material/Lock';
import { ToolTip } from './components.js';
import { useState, useEffect } from 'react';

const HintBox = ({ currentTab: quesName }) => {
  // store the hint state
  const [hints, setHints] = useState([]);
  const hintClick = (hint) => {
    // Update the hint state with the AI response
    console.log(hint.hintNumber);
    if (!hint.isLocked) {
      return;
    }
    setHints((prevHints) =>
      prevHints.map((hnt) =>
        hnt.hintNumber === hint.hintNumber ? { ...hnt, isLocked: false } : hnt
      )
    );
    chrome.runtime.sendMessage(
      { type: 'updateHint', hints, quesName },
      (response) => {
        if (chrome.runtime.lastError) {
          console.error('Error sending message:', chrome.runtime.lastError); // TODO: Remove in production
          return;
        }
        // TODO: remove in the production
        console.log('Hint has been updated');
      }
    );
  };

  useEffect(() => {
    // message to service-worker for the hints using the quesName
    chrome.runtime.sendMessage({ type: 'getHints', quesName }, (response) => {
      if (chrome.runtime.lastError) {
        console.error('Error sending message:', chrome.runtime.lastError); // TODO: Remove in production
        return;
      }
      setHints(response[quesName].hints);
    });
  }, [quesName, setHints]);

  return (
    <div className="flex gap-3 flex-col w-full">
      {hints?.map((hint) => (
        <div
          onClick={() => hintClick(hint)}
          key={hint.hintNumber}
          className={`${
            !hint.isLocked
              ? 'bg-solution cursor-not-allowed'
              : 'bg-hint-locked hover:opacity-80 active:opacity-70 cursor-pointer '
          } transition-all duration-200 ease-in-out  rounded-xl p-4 shadow-lg flex justify-between items-center`}
        >
          <div className="flex w-fit gap-1 items-center justify-center ">
            {hint.isLocked ? (
              <>
                <h2 className="text-white font-medium font-roboto text-sm tracking-wider">
                  Hint {hint.hintNumber} - {hint.description}
                </h2>
                <ToolTip title={hint.tooltip} placement="top" />{' '}
              </>
            ) : (
              <>
                <h2 className="text-white font-medium font-roboto text-sm tracking-wider select-none">
                  {hint.aiResponse}
                </h2>
              </>
            )}
          </div>
          {hint.isLocked ? (
            <LockIcon />
          ) : (
            <LightbulbIcon className="text-yellow-300 w-6 h-6" />
          )}
        </div>
      ))}
    </div>
  );
};

export default HintBox;

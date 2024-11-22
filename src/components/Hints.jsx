import LightbulbIcon from '@mui/icons-material/Lightbulb';
import LockIcon from '@mui/icons-material/Lock';
import { ToolTip } from './components.js';
import { setLocalStorage, hintTemplate } from '../utils/utils.js';
import { useState, useEffect } from 'react';

const Hints = ({ quesName, setOpenHints, openHints }) => {
  // store the hint state
  const [hints, setHints] = useState([]);

  const hintClick = async (hint) => {
    // Update the hint state with the AI response
    if (!hint.isLocked) {
      return;
    }
    // object destructuring
    const { description, tooltip } = hint;

    const updatedHints = hints.map((hintElement) =>
      hintElement.hintNumber === hint.hintNumber
        ? { ...hintElement, isLocked: false }
        : hintElement
    );

    // TODO: remove in production
    console.log('hintbox.jsx hints updated');
    console.log(updatedHints);
    chrome.runtime.sendMessage(
      { type: 'updateHint', hints: updatedHints, quesName },
      (response) => {
        if (chrome.runtime.lastError) {
          console.error('Error sending message:', chrome.runtime.lastError); // TODO: Remove in production
          return;
        }
        // TODO: remove in the production
        console.log('Hint has been updated');
      }
    );

    const usedHints = updatedHints.filter((hnt) => !hnt.isLocked).length;

    // creating a new question name from existing quesName
    const newQuesName = `totalHints${quesName}`;
    setLocalStorage({ [newQuesName]: usedHints });
    setOpenHints(usedHints);
    setHints(updatedHints);
  };

  useEffect(() => {
    // message to service-worker for the hints using the quesName
    chrome.runtime.sendMessage({ type: 'getHints', quesName }, (response) => {
      if (chrome.runtime.lastError) {
        console.error('Error sending message:', chrome.runtime.lastError); // TODO: Remove in production
        return;
      }
      console.log('response from hintbox is : ');
      console.log(response);
      setHints(response[quesName]?.hints);
    });
  }, [quesName, openHints]);

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
          } transition-all duration-200 ease-in-out  rounded-xl p-3 shadow-lg flex justify-between items-center`}
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

export default Hints;

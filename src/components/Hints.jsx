import { useState, useEffect } from 'react';
import { setLocalStorage, sendMessage } from '../utils/utils.js';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import LockIcon from '@mui/icons-material/Lock';
import { ToolTip } from './components.js';

const Hints = ({ questionName, setHintsCount, hintsCount }) => {
  const [hints, setHints] = useState([]);

  const hintClick = async (hint) => {
    if (!hint.isLocked) {
      return;
    }

    // Unlocks the hint by updating its isLocked property
    const updatedHints = hints.map((hintElement) =>
      hintElement.hintNumber === hint.hintNumber
        ? { ...hintElement, isLocked: false }
        : hintElement
    );

    // Sends message to service-worker to update the hints in the local storage
    sendMessage({ type: 'updateHint', hints: updatedHints, questionName })
      .then(() => {
        console.log('Hint has been updated');
      })
      .catch((error) => console.log('Error updating hint:', error));

    // Counts the number of unlocked hints
    const usedHints = updatedHints.filter((hnt) => !hnt.isLocked).length;

    // Creates a new question name(newQuestionName) from existing quesName for easy retrieval from local storage
    const newQuestionName = `totalHints${questionName}`;

    // Updates the local storage with the updated hints data
    setLocalStorage({ [newQuestionName]: usedHints });

    // Updates the state
    setHintsCount(usedHints);
    setHints(updatedHints);
  };

  useEffect(() => {
    // message to service-worker for the hints using the quesName
    sendMessage({ type: 'getHints', questionName })
      .then((hintsObjectResponse) => {
        setHints(hintsObjectResponse[questionName]?.hints);
      })
      .catch((error) => {
        console.log('Failed to get hints:', error);
      });
  }, [questionName, hintsCount]);

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

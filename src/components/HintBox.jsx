import LightbulbIcon from '@mui/icons-material/Lightbulb';
import LockIcon from '@mui/icons-material/Lock';
import { ToolTip } from './components.js';
import { useState, useEffect } from 'react';

const HintBox = () => {
  // store the hint state
  const [hints, setHints] = useState([
    {
      hintNumber: 1,
      isLocked: true,
      description: 'Crack the Surface',
      tooltip: 'A gentle nudge to help you get started.',
    },
    {
      hintNumber: 2,
      isLocked: true,
      description: 'Find the Pattern',
      tooltip: 'A suggestion to focus on key concepts or techniques.',
    },
    {
      hintNumber: 3,
      isLocked: true,
      description: 'Trace the Path',
      tooltip: 'A detailed walkthrough of the thought process or a dry run.',
    },
    {
      hintNumber: 4,
      isLocked: true,
      description: 'Unveil the Solution',
      tooltip:
        "The complete solution for when you're ready to compare your approach.",
    },
  ]);

  return (
    <div className="flex gap-3 flex-col w-full">
      {hints?.map((hint) => (
        <div
          key={hint.hintNumber} // Use `hintNumber` instead of `hint.number`
          className={`${
            !hint.isLocked
              ? 'hover:scale-hint-scale bg-hint-unlocked'
              : 'bg-hint-locked hover:opacity-80 active:opacity-70'
          } transition-all duration-200 ease-in-out cursor-pointer rounded-xl p-4 shadow-lg flex justify-between items-center`}
        >
          <div className="flex w-fit gap-1 items-center justify-center">
            <h2 className="text-white font-medium font-roboto text-sm tracking-wider">
              Hint {hint.hintNumber} - {hint.description}
            </h2>
            <ToolTip title={hint.tooltip} placement="top" />
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

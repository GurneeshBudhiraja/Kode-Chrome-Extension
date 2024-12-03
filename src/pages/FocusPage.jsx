import { useRef } from 'react';
import { ToolTip, SwitchButton } from '../components/components.js';
import { getLocalStorage, setLocalStorage } from '../utils/utils.js';

function FocusPage() {
  const objectiveRef = useRef();
  getLocalStorage({ param: 'objective' })
    .then((objectiveResponse) => {
      if (Object.keys(objectiveResponse).length && objectiveRef.current) {
        objectiveRef.current.value = objectiveResponse['objective'];
      }
    })
    .catch((error) => console.log('Failed to fetch the objective: ', error));
  return (
    <div className="flex flex-col justify-between ">
      <div className="flex items-center justify-between">
        <div className='flex items-center gap-1 my-4'>
          <span className="text-focusmode-size text-white">Focus mode</span>
          <ToolTip title="Reminds you to return to LeetCode only if you're off-task for 10 minutes." />
        </div>
        <SwitchButton />
      </div>
      <div className="flex flex-col justify-between items-center mb-4">
        <div className="flex items-center w-full h-9 bg-black/20 rounded-lg border border-gray-700 overflow-hidden">
          <input
            type="text"
            placeholder="Enter your objective"
            className="flex-1 bg-transparent text-gray-200 placeholder-gray-400 text-[17px] px-4 h-full focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            ref={objectiveRef}
          />
          <button
            className="px-4 h-full text-sm font-semibold text-gray-200 bg-blue-700 hover:bg-blue-600 transition-colors rounded-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
            onClick={async () => {
              if (objectiveRef.current) {
                const objective = objectiveRef.current.value.trim();
                await setLocalStorage({ objective });
              }
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default FocusPage;

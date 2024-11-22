import './App.css';
import {
  ToolTip,
  SwitchButton,
  Hints,
  HintsUsed,
} from './components/components.js';
import { sendMessage } from './utils/utils.js';
import { useEffect, useState } from 'react';

function App() {
  const [aiAvailable, setAiAvailable] = useState(true); // whether the browser supports the ai features
  const [hintsCount, setHintsCount] = useState(0); // calculates the total number of hints used
  const [questionName, setQuestionName] = useState(''); // current question the user is on

  // Reset the hints and hintsCount from the local storage
  const resetHints = () => {
    sendMessage({
      type: 'resetHints',
      questionName,
    })
      .then((resetHintsResponse) => {
        if (resetHintsResponse.success) {
          setHintsCount(0);
        }
      })
      .catch((error) => console.log('Failed to reset hints:', error));
  };

  useEffect(() => {
    // Checking if the browser supports the ai features
    if (!self.ai || !self.ai.languageModel) {
      setAiAvailable(false);
      return;
    }

    // Gets the current tab info and validates the valid leetcode question URL
    sendMessage({ type: 'getCurrentURL' })
      .then((URLResponse) => {
        if (URLResponse?.url?.startsWith('https://leetcode.com/problems/')) {
          console.log(URLResponse);
          setQuestionName(
            URLResponse.url
              ?.split('https://leetcode.com/problems/')[1]
              ?.split('/')[0] ?? ''
          );
        }
      })
      .catch((error) => console.log('Failed to fetch URL:', error));

    // Gets the count of total used hints
    if (questionName) {
      sendMessage({
        type: 'getTotalHints',
        questionName,
      })
        .then((totalHintsResponse) => {
          if (totalHintsResponse.totalHints !== null) {
            setHintsCount(totalHintsResponse[`totalHints${questionName}`]);
          }
        })
        .catch((error) => console.log('Failed to get totalHints:', error));
    }
  }, [questionName]);

  return (
    <div className="w-extension-width h-extension-height max-h-extension-height max-w-extension-width background bg-extension-background-gradient py-4 px-6 overflow-scroll ">
      <div className="font-poppins font-bold text-heading-size inline-block bg-clip-text text-transparent bg-gradient-to-r from-heading-gradient-start from-0% via-heading-gradient-start via-30% to-heading-gradient-end to-100% tracking-wider">
        Kōdo
      </div>

      <div className="font-inter font-light text-tagline-size text-tagline-color">
        Cracking Algorithms, Together.
      </div>
      {aiAvailable ? (
        questionName ? (
          <div className="mt-3 space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <span className="text-focusmode-size text-white">
                  Focus mode
                </span>
                <ToolTip title="Reminds you to return to LeetCode only if you're off-task for 10 minutes." />
              </div>
              <SwitchButton />
            </div>
            {aiAvailable && questionName && (
              <HintsUsed hintsCount={hintsCount} />
            )}
            <Hints
              questionName={questionName}
              setHintsCount={setHintsCount}
              hintsCount={hintsCount}
            />
            <button
              className={`w-full bg-gray-800  text-white px-4 py-2 rounded-md text-base font-medium ${
                hintsCount === 0
                  ? 'cursor-not-allowed'
                  : 'cursor-pointer hover:bg-gray-700 active:bg-gray-600'
              }`}
              onClick={resetHints}
            >
              Reset Hints
            </button>
          </div>
        ) : (
          <div className="text-[#F5F5F5] bg-[#1A1B23] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-medium p-3 text-center border rounded-lg select-none w-5/6">
            Please open a LeetCode question to use AlgoMate.
          </div>
        )
      ) : (
        <div className="text-[#F5F5F5] bg-[#1A1B23] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-medium p-3 text-center border rounded-lg select-none w-5/6">
          {' '}
          This extension is not supported on your current browser.
        </div>
      )}
    </div>
  );
}

export default App;

import './App.css';
import {
  ToolTip,
  SwitchButton,
  HintBox,
  HintsUsed,
} from './components/components.js';
import { useEffect, useState } from 'react';

function App() {
  const [aiAvailable, setAiAvailable] = useState(true);
  const [openHints, setOpenHints] = useState(0); // calculates the total number of hints used
  const [currentTab, setCurrentTab] = useState('');

  // reset the hints from the local storage
  const resetHints = () => {
    // send message to the service-worker
    chrome.runtime.sendMessage(
      { type: 'resetHints', quesName: currentTab },
      (response) => {
        if (chrome.runtime.lastError) {
          console.error('Error sending message:', chrome.runtime.lastError); // TODO: Remove in production
        } else if (response.success) {
          setOpenHints(0);
        }
      }
    );
  };
  useEffect(() => {
    if (!self.ai || !self.ai.languageModel) {
      setAiAvailable(false);
      return;
    }

    // message to service-worker for the current tab url and updating the state
    chrome.runtime.sendMessage({ type: 'getCurrentTab' }, (response) => {
      if (chrome.runtime.lastError) {
        console.error('Error sending message:', chrome.runtime.lastError); // TODO: Remove in production
        return;
      }
      console.log(response?.url);
      if (
        response &&
        response?.url?.startsWith('https://leetcode.com/problems/')
      ) {
        // TODO: remove in production
        console.log(
          response.url
            ?.split('https://leetcode.com/problems/')[1]
            ?.split('/')[0] ?? ''
        );
        setCurrentTab(
          response.url
            ?.split('https://leetcode.com/problems/')[1]
            ?.split('/')[0] ?? ''
        );
      }
    });

    // message to service-worker for getting the no of hints used
    currentTab &&
      chrome.runtime.sendMessage(
        { type: 'getTotalHints', quesName: currentTab },
        (response) => {
          if (chrome.runtime.lastError) {
            console.error('Error sending message:', chrome.runtime.lastError); // TODO: Remove in production
            return;
          }
          // update the openHints state
          if (response.totalHints !== null) {
            setOpenHints(response[`totalHints${currentTab}`]);
          }
        }
      );
  }, [currentTab, openHints]);

  return (
    <div className="w-extension-width h-extension-height max-h-extension-height max-w-extension-width background bg-extension-background-gradient py-4 px-6 overflow-scroll ">
      <div className="font-poppins font-bold text-heading-size inline-block bg-clip-text text-transparent bg-gradient-to-r from-heading-gradient-start from-0% via-heading-gradient-start via-30% to-heading-gradient-end to-100% tracking-wider">
        AlgoMate
      </div>

      <div className="font-inter font-light text-tagline-size text-tagline-color">
        Cracking Algorithms, Together.
      </div>
      {aiAvailable ? (
        currentTab ? (
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
            {aiAvailable && currentTab && (
              <HintsUsed
                aiAvailable={aiAvailable}
                currentTab={currentTab}
                openHints={openHints}
              />
            )}
            <HintBox
              currentTab={currentTab}
              setOpenHints={setOpenHints}
              openHints={openHints}
            />
            <button
              className={`w-full bg-gray-800  text-white px-4 py-2 rounded-md text-base font-medium ${
                openHints === 0
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

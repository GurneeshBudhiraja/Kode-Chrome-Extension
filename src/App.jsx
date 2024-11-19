import './App.css';
import {
  ToolTip,
  SwitchButton,
  HintBox,
  Footer,
} from './components/components.js';
import { useEffect, useState } from 'react';

function App() {
  const [aiAvailable, setAiAvailable] = useState(true);

  const [currentTab, setCurrentTab] = useState('');

  useEffect(() => {
    if (!self.ai || !self.ai.languageModel) {
      setAiAvailable(false);
      return;
    }

    // message to service-worker for the current tab url
    chrome.runtime.sendMessage({ type: 'getCurrentTab' }, (response) => {
      if (chrome.runtime.lastError) {
        console.error('Error sending message:', chrome.runtime.lastError); // TODO: Remove in production
        return;
      }
      console.log(response?.url);
      if (
        response &&
        response?.url?.startsWith('https://leetcode.com/problems/') &&
        response?.url?.endsWith('/description/')
      ) {
        setCurrentTab(response.url);
      }
    });
  }, []);

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
          <div className="mt-4 space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <span className="text-focusmode-size text-white">
                  Focus mode
                </span>
                <ToolTip title="Focus mode" />
              </div>
              <SwitchButton />
            </div>
            <HintBox />
          </div>
        ) : (
            <div className="text-[#F5F5F5] bg-[#1A1B23] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-medium p-3 text-center border rounded-lg select-none w-5/6">
              Please open a LeetCode question to use AlgoMate.
            </div>
        )
      ) : (
        <div className="text-white text-center mt-4">Not available</div>
      )}

      <Footer aiAvailable={aiAvailable} currentTab={currentTab} />
    </div>
  );
}

export default App;

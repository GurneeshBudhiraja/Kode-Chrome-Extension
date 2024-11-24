import {
  ToolTip,
  SwitchButton,
  CodingLanguage,
  Chat,
} from './components/components.js';
import { sendMessage } from './utils/utils.js';
import { useEffect, useState } from 'react';

function App() {
  const [aiAvailable, setAiAvailable] = useState(true); // Checks whether the browser supports the ai features
  const [selectedLanguage, setSelectedLanguage] = useState(''); // Track the selected language
  const [questionName, setQuestionName] = useState(''); // Current leetcode question the user is on

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

    // Message to service-worker for preferred coding language of the user
    if (questionName) {
      sendMessage({ type: 'getPreferredLanguage' })
        .then((languageResponse) => {
          console.log('LANGUAGE RESPONSE IS ');
          console.log(languageResponse);
          languageResponse.language
            ? setSelectedLanguage(languageResponse.language)
            : setSelectedLanguage('');
        })
        .catch((error) =>
          console.log('Failed to fetch coding language:', error)
        );
    }
  }, [questionName]);

  return (
    <div className="w-screen h-screen background bg-extension-background-gradient py-4 px-6 overflow-scroll">
      <div className="font-poppins font-bold text-heading-size bg-clip-text text-transparent bg-gradient-to-r from-heading-gradient-start from-0% via-heading-gradient-start via-30% to-heading-gradient-end to-100% tracking-wider inline-block">
        Kōdo
        <span className="ml-1 font-inter font-normal text-sm text-gray-600 tracking-normal">
          [Ctrl + K/⌘K]
        </span>
      </div>
      <div className="font-inter font-light text-tagline-size text-tagline-color">
        Cracking Algorithms, Together.
      </div>
      {aiAvailable ? (
        questionName ? (
          <div className="mt-3 space-y-4 flex flex-col mb-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <span className="text-focusmode-size text-white">
                  Focus mode
                </span>
                <ToolTip title="Reminds you to return to LeetCode only if you're off-task for 10 minutes." />
              </div>
              <SwitchButton />
            </div>
            <CodingLanguage
              selectedLanguage={selectedLanguage}
              setSelectedLanguage={setSelectedLanguage}
            />
            <div className="h-[420px]">
              <Chat />
            </div>
          </div>
        ) : (
          <div className="text-[#F5F5F5] bg-[#1A1B23] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-medium p-3 text-center border rounded-lg select-none w-5/6">
            Please open a LeetCode question to use Kōdo.
          </div>
        )
      ) : (
        <div className="text-[#F5F5F5] bg-[#1A1B23] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-medium p-3 text-center border rounded-lg select-none w-5/6">
          This extension is not supported on your current browser.
        </div>
      )}
    </div>
  );
}

export default App;

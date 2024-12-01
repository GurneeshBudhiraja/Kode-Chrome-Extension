import { useState, useEffect } from 'react';
import { sendMessage, createSession } from '../utils/utils.js';
import dsaPrompt from '../systemPrompts/dsaPrompt.js';
import {
  ToolTip,
  SwitchButton,
  CodingLanguage,
  Chat,
} from '../components/components.js';

function DsaPage({
  setAiAvailable,
  questionName,
  setQuestionName,
  aiAvailable,
}) {
  const [selectedLanguage, setSelectedLanguage] = useState(''); // Track the selected language
  const [aiLoading, setAILoading] = useState(false); // Keeps the track of the loading state
  const [messages, setMessages] = useState([]); // Chat messages state
  const [input, setInput] = useState(''); // Chat textarea state

  // gets the user code from content.js
  const getUserCode = () => {
    return new Promise((resolve, reject) => {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const activeTab = tabs[0]; // Get the active tab
        if (activeTab && activeTab.id) {
          // Send a message to the content script
          chrome.tabs.sendMessage(
            activeTab.id,
            { type: 'getUserCode' },
            function (response) {
              if (chrome.runtime.lastError) {
                // Handle errors, if any
                console.error('Error:', chrome.runtime.lastError.message);
                reject(chrome.runtime.lastError.message);
              } else if (response && response.response) {
                resolve(response.response); // Return the response
              } else {
                reject('No response received from content script.');
              }
            }
          );
        } else {
          reject('No active tab found.');
        }
      });
    });
  };

  const messageAI = async (message) => {
    const userCode = await getUserCode();
    console.log('userCode is ');
    console.log(userCode); // user's code
    console.log('user message'); // function responsible to ask ai
    console.log(message);
  };

  useEffect(() => {
    // Sets the aiLoading state
    setAILoading(true);

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

    // Updates the aiLoading state
    setAILoading(false);
  }, [questionName, setQuestionName, setAiAvailable]);

  return (
    <div>
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
              <Chat
                aiLoading={aiLoading}
                messageAI={messageAI}
                messages={messages}
                setMessages={setMessages}
                input={input}
                setInput={setInput}
              />
            </div>
          </div>
        ) : (
          <div className="text-[#F5F5F5] bg-[#1A1B23] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-medium p-3 text-center border rounded-lg select-none w-5/6">
            To use the Kode DSA, please open a LeetCode problem page.
          </div>
        )
      ) : (
        <div className="text-[#F5F5F5] bg-[#1A1B23] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-medium p-3 text-center border rounded-lg select-none w-5/6">
          The extension is not supported on your current browser.
        </div>
      )}
    </div>
  );
}

export default DsaPage;

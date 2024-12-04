import { useState, useEffect, act } from 'react';
import {
  sendMessage,
  createSession,
  sendContentMessage,
} from '../utils/utils.js';
import { dsaAgentPrompt } from '../systemPrompts/dsaPrompts/dsaPrompts.js';
import {
  CodingLanguage,
  ChatDisplay,
  InputFieldNew,
} from '../components/components.js';

function DsaPage({
  setAiAvailable,
  questionName,
  setQuestionName,
  aiAvailable,
}) {
  const [selectedLanguage, setSelectedLanguage] = useState(''); // Track the selected language
  const [loading, setLoading] = useState(false); // Keeps the track of the loading state
  const [input, setInput] = useState(''); // Chat textarea state
  const [messages, setMessages] = useState([]); // Chat messages state
  const [dsaAgentSession, setDsaAgentSession] = useState(null);

  // gets the user code from content.js
  const getUserCode = async () => {
    try {
      const { response } = await sendContentMessage({
        type: 'getUserCode',
      });
      return response ?? '';
    } catch (error) {
      console.log('Failed to fetch the user code:', error);
    }
  };

  // Send message to the promptAPI
  const messageAI = async (message) => {
    try {
      // Checks if the AI model has enough tokens for output
      if (dsaAgentSession?.tokensLeft < 50) {
        await activateAI();
      }
      setLoading(true);
      // Append the user message
      setMessages((prev) => [...prev, { sender: 'user', text: message }]);

      // Gets the current user code
      const userCode = await getUserCode();
      console.log('User Code:');
      console.log(userCode);

      // asking ai
      const resp = await dsaAgentSession.prompt(
        `This much code has been written: "${userCode}" . And here is my request: ${message}. Keep your answers short and concise. If my message strongly insist on getting the solution, do not provide with the full code just return the sentence 'full solution'`
      );
      console.log(resp);
      // Append the AI response
      if (resp === 'full solution' || resp.startsWith('full solution')) {
        console.log('I am here');
        setMessages((prev) => [
          ...prev,
          { sender: 'ai', text: resp, gemini: true },
        ]);
      } else {
        console.log('I am here 2');
        setMessages((prev) => [
          ...prev,
          { sender: 'ai', text: resp, gemini: false },
        ]);
      }
    } catch (error) {
      console.log('Failed to message AI:', error);
    } finally {
      setInput('');
      setLoading(false);
    }
  };

  const activateAI = async () => {
    try {
      const dsaPrompt = dsaAgentPrompt(questionName, selectedLanguage);

      const dsaSession = await createSession({ systemPrompt: dsaPrompt });

      if (!Object.keys(dsaSession).length) {
        console.log('Empty prompt session object');
        return;
      }

      const { session: dSession } = dsaSession;
      setDsaAgentSession(dSession);
    } catch (error) {
      console.log('Failed to activate the prompt AI in DsaPage.jsx:', error);
      return;
    }
  };

  useEffect(() => {
    // Sets the aiLoading state
    setLoading(true);

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
          setSelectedLanguage(languageResponse.language ?? '');
        })
        .catch((error) =>
          console.log('Failed to fetch coding language:', error)
        );
    }

    activateAI();

    // Updates the loading state
    setLoading(false);
  }, [questionName, selectedLanguage, setAiAvailable, setQuestionName]);

  return (
    <div>
      {aiAvailable ? (
        <div className="mt-3 gap-3 flex flex-col ">
          {questionName ? (
            <div className="h-[420px]">
              <CodingLanguage
                selectedLanguage={selectedLanguage}
                setSelectedLanguage={setSelectedLanguage}
              />
              <div className="my-4 space-y-2">
                <ChatDisplay messages={messages} type="dsa" />
                <InputFieldNew
                  input={input}
                  setInput={setInput}
                  messageAI={messageAI}
                  inputLoading={loading}
                />
              </div>
            </div>
          ) : (
            <div className="text-[#F5F5F5] bg-[#1A1B23] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-medium p-3 text-center border rounded-lg select-none w-5/6">
              To use the Kode DSA, xplease open a LeetCode problem page.
            </div>
          )}
        </div>
      ) : (
        <div className="text-[#F5F5F5] bg-[#1A1B23] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-medium p-3 text-center border rounded-lg select-none w-5/6">
          The Kode DSA is not supported on your current browser.
        </div>
      )}
    </div>
  );
}

export default DsaPage;

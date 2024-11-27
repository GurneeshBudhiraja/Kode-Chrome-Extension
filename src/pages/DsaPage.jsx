import { useState, useEffect } from 'react';
import { sendMessage, createSession } from '../utils/utils.js';
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
  const [aiSession, setAiSession] = useState(null); // Keeps the track of the ai session
  const [selectedLanguage, setSelectedLanguage] = useState(''); // Track the selected language
  const [aiLoading, setAILoading] = useState(false); // Keeps the track of the loading state
  const [messages, setMessages] = useState([]); // Chat messages state
  const [input, setInput] = useState(''); // Chat textarea state

  const messageAI = async () => {
    // Welcome message to the user
    // const aiAnswer = await aiSession.prompt(prompt);
    // setMessages((prevMessages) => [
    //   ...prevMessages,
    //   { text: aiAnswer, sender: 'ai' },
    // ]);
    return
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

    if (questionName && !aiSession) {
      createSession({
        systemPrompt: `Your name is Kode. You are a leetcode expert whose aim is to help the users in solving the leetcode problems. You will not directly give the answer to the problem but would help the user think in the right direction. If the user asks anything apart from the leetcode problem deny the request politely. The user is currently looking at the leetcode problem ${questionName} and the user's selected preferred language is ${selectedLanguage}. If the user asks multiple times to give the full answer you will return a JSON format like this {url:"gemini.google.com"}. However, your main aim would always be to help the user understand and make the core concept stronger by giving small hints to the user. With each new asked hint you will reveal more info about the leetcode problem. Make sure to keep the hints short, simple and informative. Only give long answers when providing the user with dry run or the solution itself.`,
      })
        .then((aiSessionResponse) => {
          const { session } = aiSessionResponse;
          console.log(session);
          // TODO: For debugging
          session
            .prompt('Who is ms dhoni ')
            .then((response) => console.log(response));
          setAiSession(session);
        })
        .catch((error) => console.log('Failed to create session:', error));
    }

    // Updates the aiLoading state
    setAILoading(false);

    messageAI('Write a welcome message to the user.');
  }, [questionName, aiSession]);

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

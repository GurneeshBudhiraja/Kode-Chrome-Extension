import { useState, useEffect, useRef } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { sendContentMessage } from './componentUtils/componentUtils.js';

import { sendMessage } from '../utils/utils.js';

const Chat = ({
  aiLoading,
  messages,
  setMessages,
  input,
  setInput,
  messageAI, // TODO: use this after completing the functionality
}) => {
  const lastMessageRef = useRef(null); // Reference to the last message

  useEffect(() => {
    // Scrolls to the last message
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({
        behavior: 'smooth',
      });
    }
  }, [messages]);

  const handleSend = () => {
    // Sends the message
    if (input.trim()) {
      if (input === 'full solution') {
        setMessages([
          ...messages,
          { text: 'https://gemini.google.com/app', sender: 'ai' },
        ]);
      } else {
        setMessages([...messages, { text: input, sender: 'user' }]);
      }
      setInput('');
    }
  };

  const handleKeyDown = (e) => {
    // Listens for the Enter key when shift key is not pressed
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col my-4 rounded-lg border border-gray-700 bg-gray-900/50 w-full h-full ">
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {aiLoading ? (
          <div className="h-full flex justify-center items-center">
            <CircularProgress />
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[70%] rounded-lg px-4 py-2 break-words whitespace-normal  ${
                  message.sender === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-200'
                }`}
              >
                {message.text === 'https://gemini.google.com/app' ? (
                  <div
                    className="p-2 cursor-pointer"
                    onClick={async () => {
                      let questionName = '';
                      const URLResponse = await sendMessage({
                        type: 'getCurrentURL',
                      });
                      if (
                        URLResponse?.url?.startsWith(
                          'https://leetcode.com/problems/'
                        )
                      ) {
                        questionName =
                          URLResponse.url
                            ?.split('https://leetcode.com/problems/')[1]
                            ?.split('/')[0] ?? '';
                      }

                      const { response: userCode } = await sendContentMessage({
                        type: 'getUserCode',
                      });

                      chrome.tabs.create({
                        url: 'https://gemini.google.com/app',
                      });
                      setTimeout(async () => {
                        await sendContentMessage({
                          type: 'customizeGeminiPage',
                          questionName,
                          userCode,
                        });
                      }, 1000);
                    }}
                  >
                    Full solution
                  </div>
                ) : (
                  message.text
                )}
              </div>
            </div>
          ))
        )}
        {/* Reference to the end of the chat screen */}
        <div ref={lastMessageRef} />
      </div>
      <div className="border-t border-gray-700 p-4">
        <div className="flex items-center space-x-2 h-full ">
          <textarea
            autoFocus
            value={input}
            disabled={aiLoading}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="flex-1 bg-gray-800 text-gray-200 rounded-lg p-3 min-h-[44px] resize-none border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed"
            rows={1}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="h-full px-4 py-2 bg-blue-600 text-white rounded-lg disabled:hover:bg-blue-600 hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;

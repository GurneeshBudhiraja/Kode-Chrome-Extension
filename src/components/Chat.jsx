import { useState, useEffect, useRef } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

import { sendMessage, sendContentMessage } from '../utils/utils.js';

const Chat = ({ loading, messages, setMessages, input, setInput }) => {
  const lastMessageRef = useRef(null); // Reference to the last message

  useEffect(() => {
    // Scrolls to the last message
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({
        behavior: 'smooth',
      });
    }
  }, [messages]);

  return (
    <div className="flex flex-col rounded-lg border border-gray-700 bg-gray-900/50 w-full h-[21rem] ">
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {loading ? (
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
                  <div className="p-2 cursor-pointer">Full solution</div>
                ) : (
                  message.text
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Chat;

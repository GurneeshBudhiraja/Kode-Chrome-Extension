import { useEffect, useRef } from 'react';
import { RecommendationCard, GeminiCard } from '../components/components.js';

function ChatDisplay({
  messages,
  className = '',
  type = '',
  questionName = '',
}) {
  const lastMessageRef = useRef(null);
  useEffect(() => {
    lastMessageRef?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  }, [messages]);
  return (
    <div
      className={`flex flex-col rounded-lg border border-gray-700 bg-gray-900/50 w-full h-[21rem] my-4`}
    >
      <div className={`flex-1 p-4 overflow-y-auto space-y-4 ${className}`}>
        {messages &&
          messages.map((message, index) => (
            <div key={index}>
              {message.sender === 'user' ? (
                <div className="flex justify-end">
                  <div className="max-w-[70%] rounded-lg p-2 font-medium font-inter text-sm break-words whitespace-normal bg-blue-600 text-white">
                    {message.text}
                  </div>
                </div>
              ) : (
                <div className="">
                  {type === 'recommendation' ? (
                    message.text
                      ?.slice(0, 4)
                      ?.map((msg, index) => (
                        <RecommendationCard key={index} recommendation={msg} />
                      ))
                  ) : type === 'dsa' ? (
                    <div
                      key={index}
                      className={` w-full max-w-sm my-2 ${
                        !message.gemini &&
                        'bg-white rounded-lg border border-gray-300 shadow-lg p-4  text-sm font-medium font-inter text-black'
                      }`}
                    >
                      {message.gemini ? (
                        <GeminiCard
                          questionName={questionName}
                        />
                      ) : (
                        message.text
                      )}
                    </div>
                  ) : (
                    <div className="bg-white rounded-lg border border-gray-300 shadow-lg p-4 w-full max-w-sm mx-auto my-2 text-sm font-medium font-inter text-black">
                      {message.text}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        <div ref={lastMessageRef}></div>
      </div>
    </div>
  );
}

export default ChatDisplay;

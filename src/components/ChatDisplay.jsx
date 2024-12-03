import { RecommendationCard } from '../components/components.js';
function ChatDisplay({ messages }) {
  return (
    <div className="flex flex-col rounded-lg border border-gray-700 bg-gray-900/50 w-full h-[21rem] my-4">
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages &&
          messages.map((message, index) => (
            <>
              {message.sender === 'user' ? (
                <div key={index} className={`flex justify-end`}>
                  <div
                    className={`max-w-[70%] rounded-lg p-2 font-medium font-inter text-sm break-words whitespace-normal bg-blue-600 text-white`}
                  >
                    {message.text}
                  </div>
                </div>
              ) : (
                <>
                  {message.text?.slice(0, 4)?.map((msg, index) => (
                    <RecommendationCard key={index} recommendation={msg} />
                  ))}
                </>
              )}
            </>
          ))}
      </div>
    </div>
  );
}

export default ChatDisplay;

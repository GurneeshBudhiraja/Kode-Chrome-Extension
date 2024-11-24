import { useState, useEffect, useRef } from 'react';

const Chat = ({ aiLoading }) => {
  const [messages, setMessages] = useState([]);
  const lastMessageRef = useRef(null);
  const [input, setInput] = useState('');

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({
        behavior: 'smooth',
      });
    }
  }, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'user' }]);
      setInput('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col mt-4 rounded-lg border border-gray-700 bg-gray-900/50 w-full h-full ">
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {aiLoading ? (
          <div className="text-white">Loading....</div>
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
                {message.text}
              </div>
            </div>
          ))
        )}
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
            className="flex-1 bg-gray-800 text-gray-200 rounded-lg p-3 min-h-[44px] resize-none border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
            rows={1}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="h-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;

import { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';

function InputField() {
  const [loading, setLoading] = useState(false); // Tracks the loading state
  const [input, setInput] = useState(''); // Chat textarea state

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      console.log(e.target.value);
      setInput('');
    }
  };

  return (
    <div className="flex items-center bg-black/30 w-full rounded-lg border border-gray-700 px-4 py-2 relative text-[17px]">
      <textarea
        autoFocus
        value={input}
        disabled={loading}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message..."
        className="flex-1 bg-transparent text-gray-200 placeholder-gray-400 text-sm focus:outline-none resize-none disabled:cursor-not-allowed"
        rows={1}
      />
      <button
        className="ml-2 text-blue-500 hover:text-blue-400 transition-colors disabled:text-gray-500 disabled:cursor-not-allowed"
        disabled={!input.trim()}
      >
        <SendIcon />
      </button>
    </div>
  );
}

export default InputField;

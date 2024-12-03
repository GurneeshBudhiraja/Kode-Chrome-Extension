import { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';

function InputField() {
  const [loading, setLoading] = useState(false); // Keeps the track of the loading state
  const [input, setInput] = useState(''); // Chat textarea state

  const handleKeyDown = (e) => {
    // Listens for the Enter key when shift key is not pressed
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      console.log(e.target.value);
    }
  };
  return (
    <div className="flex items-center h-full w-fit relative">
      <textarea
        autoFocus
        value={input}
        disabled={loading}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message...."
        className="flex-1 bg-black/20 text-gray-200 rounded-lg p-3 min-h-[48px] text-[17px] resize-none border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed "
        rows={1}
      />
      <button
        className="absolute right-5 cursor-pointer disabled:cursor-not-allowed"
        disabled={!input.trim()}
      >
        <SendIcon
          className={`${!input.trim() ? 'text-gray-500' : 'text-white'}`}
        />
      </button>
    </div>
  );
}

export default InputField;

import { useRef, useState } from 'react';
import SendIcon from '@mui/icons-material/Send';

function InputField({ inputLoading, selectedTool, questionName, onClick }) {
  const [input, setInput] = useState(''); // Chat textarea state
  const buttonRef = useRef(undefined);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      console.log('Message is: ');
      console.log(e.target.value);
      setInput('');
      buttonRef.current.click();
    }
  };

  return (
    <div className="flex items-center bg-black/30 w-full rounded-lg border border-gray-700 px-4 py-2 relative text-[17px]">
      <textarea
        autoFocus
        value={input}
        disabled={inputLoading}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message..."
        className="flex-1 bg-transparent text-gray-200 placeholder-gray-400 text-sm focus:outline-none resize-none disabled:cursor-not-allowed"
        rows={1}
      />
      <button
        className="ml-2 text-blue-500 hover:text-blue-400 transition-colors disabled:text-gray-500 disabled:cursor-not-allowed"
        disabled={!input.trim()}
        ref={buttonRef}
        onClick={onClick ?? (() => console.log('Not provided onclick'))}
      >
        <SendIcon />
      </button>
    </div>
  );
}

export default InputField;

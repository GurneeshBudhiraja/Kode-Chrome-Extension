import SendIcon from '@mui/icons-material/Send';

function InputFieldNew({ input, setInput, messageAI, inputLoading }) {
  const handleKeyDown = async (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      await messageAI(input);
    }
  };
  return (
    <div>
      {' '}
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
          disabled={!input.trim() || inputLoading}
          onClick={async () => await messageAI(input)}
        >
          <SendIcon />
        </button>
      </div>
    </div>
  );
}

export default InputFieldNew;

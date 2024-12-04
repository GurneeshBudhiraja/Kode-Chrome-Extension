import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import {
  sendMessage,
  sendContentMessage,
  getCurrentTab,
} from '../utils/utils.js';

function QuestionCard({ questionName }) {
  const geminiClick = async () => {
    try {
      console.log('Gemini clicked');
      let questionName = '';
      const URLResponse = await getCurrentTab();
      if (URLResponse?.url?.startsWith('https://leetcode.com/problems/')) {
        questionName =
          URLResponse.url
            ?.split('https://leetcode.com/problems/')[1]
            ?.split('/')[0] ?? '';
      }

      const { response: userCode } = await sendContentMessage({
        type: 'getUserCode',
      });

      console.log(userCode);
      console.log(questionName);

      await chrome.tabs.create({
        url: 'https://gemini.google.com/app',
      });
      setTimeout(async () => {
        await sendContentMessage({
          type: 'customizeGeminiPage',
          questionName,
          userCode,
        });
      }, 1000);
    } catch (error) {
      console.log('Failed to open gemini tab', error);
    }
  };
  return (
    <div
      onClick={geminiClick}
      className="flex items-center bg-gray-800 hover:bg-gray-700 rounded-xl px-3 py-4 shadow-lg transition ease-in-out duration-300 cursor-pointer max-w-sm gap-4"
    >
      <div className="p-2 rounded-full bg-black ">
        <AutoFixHighIcon className="text-blue-400" />
      </div>
      <div className="flex flex-col">
        <h3 className="text-sm font-medium font-inter text-white">
          {questionName}
        </h3>
        <p className="text-xs text-gray-400 mt-1">gemini.google.com</p>
      </div>
    </div>
  );
}

export default QuestionCard;

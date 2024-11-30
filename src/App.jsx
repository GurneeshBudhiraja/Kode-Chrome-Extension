import { DsaPage, NotesPage } from './pages/pages.js';
import { OptionBar, Note } from './components/components.js';
import { useState, useEffect } from 'react';
import { sendMessage } from './utils/utils.js';

function App() {
  const [aiAvailable, setAiAvailable] = useState(true); // Checks whether the browser supports the ai features
  const [questionName, setQuestionName] = useState(''); // Current leetcode question the user is on
  const [currentPage, setCurrentPage] = useState('dsa');

  useEffect(() => {
    // Checking if the browser supports the ai features
    if (!self.ai || !self.ai.languageModel) {
      setAiAvailable(false);
    }

    // Gets the current tab info and validates the valid LeetCode question URL
    sendMessage({ type: 'getCurrentURL' })
      .then((URLResponse) => {
        if (URLResponse?.url?.startsWith('https://leetcode.com/problems/')) {
          console.log(URLResponse);
          setQuestionName(
            URLResponse.url
              ?.split('https://leetcode.com/problems/')[1]
              ?.split('/')[0] ?? ''
          );
        }
      })
      .catch((error) => console.log('Failed to fetch URL:', error));
  }, [questionName, aiAvailable, currentPage]);

  return (
    <div className="w-screen h-screen bg-extension-background-gradient py-4 px-6 overflow-scroll">
      <div className="font-poppins font-bold text-heading-size bg-clip-text text-transparent bg-gradient-to-r from-heading-gradient-start from-0% via-heading-gradient-start via-40% to-heading-gradient-end to-100% tracking-wider inline-block">
        Kode
        <span className="ml-1 font-inter font-normal text-sm text-gray-600 tracking-normal">
          [Ctrl+Shift+K / ⌘+Shift+K]
        </span>
      </div>
      <div className="font-inter font-light text-tagline-size text-tagline-color">
        Amplifying Potential
      </div>
      <OptionBar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {currentPage === 'dsa' && (
        <DsaPage
          aiAvailable={aiAvailable}
          setAiAvailable={setAiAvailable}
          questionName={questionName}
          setQuestionName={setQuestionName}
        />
      )}
      {currentPage === 'notes' && <NotesPage questionName={questionName} />}
    </div>
  );
}

export default App;

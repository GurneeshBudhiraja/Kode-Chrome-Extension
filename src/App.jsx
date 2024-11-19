import './App.css';
import {
  ToolTip,
  SwitchButton,
  HintBox,
  Footer,
} from './components/components.js';
import { useEffect, useState } from 'react';

function App() {
  const [aiAvailable, setAiAvailable] = useState(true);
  const [hints, setHints] = useState([
    {
      hintNumber: 1,
      isLocked: true,
      description: 'Crack the Surface',
      tooltip: 'A gentle nudge to help you get started.',
    },
    {
      hintNumber: 2,
      isLocked: true,
      description: 'Find the Pattern',
      tooltip: 'A suggestion to focus on key concepts or techniques.',
    },
    {
      hintNumber: 3,
      isLocked: true,
      description: 'Trace the Path',
      tooltip: 'A detailed walkthrough of the thought process or a dry run.',
    },
    {
      hintNumber: 4,
      isLocked: true,
      description: 'Unveil the Solution',
      tooltip:
        "The complete solution for when you're ready to compare your approach.",
    },
  ]);

  useEffect(() => {
    if (!self.ai || !self.ai.languageModel) {
      setAiAvailable(false);
      return;
    }

    // updating the hints state
    hints.map((hint) => {
      if (!hint.isLocked) {
        setHints((prev) => prev++);
      }
    });
  }, [hints]);

  return (
    <div className="w-extension-width h-extension-height max-h-extension-height max-w-extension-width background bg-extension-background-gradient py-4 px-6 overflow-scroll ">
      <div className="font-poppins font-bold text-heading-size inline-block bg-clip-text text-transparent bg-gradient-to-r from-heading-gradient-start from-0% via-heading-gradient-start via-30% to-heading-gradient-end to-100% tracking-wider">
        AlgoMate
      </div>

      <div className="font-inter font-light text-tagline-size text-tagline-color">
        Cracking Algorithms, Together.
      </div>
      {aiAvailable ? (
        <div>
          <div className="flex justify-between items-center mt-3">
            <div className="flex items-center justify-center ">
              <div className="text-focusmode-size text-white ">Focus mode</div>
              <ToolTip title={'Focus mode'} />
            </div>
            <SwitchButton />
          </div>

          <div className=" mt-4 space-y-4">
            <HintBox />
          </div>
        </div>
      ) : (
        <div className="text-white">Not available</div>
      )}
      <Footer aiAvailable={aiAvailable} />
    </div>
  );
}

export default App;
